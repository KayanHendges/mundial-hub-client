import { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { OrdersContext } from '../../../../../../contexts/OrdersContext'
import { apiV2 } from '../../../../../../services/api/apiAxiosConfig'
import { Customer, CustomerAddress, FindCustomerParams, FindCustomerResponse } from '../../../../../../services/api/types/Customers/Customer'
import { Order } from '../../../../../../services/api/types/Orders/Orders'
import handleStyles from './handleStyles'
import styles from './styles.module.scss'

type Props = {
    customerId: number | null
    order: Order
}

export default function OrderCostumerContainer(props: Props){

    const [ open, setOpen ] = useState<boolean>(true)
    const { containerStyles } = handleStyles({ open })

    const { expandOrderId } = useContext(OrdersContext)
    const [ refresh, setRefresh ] = useState<boolean>(false)

    const { data, isFetching: customerFetching } = useQuery<FindCustomerResponse>(`orders_customer_id_${props.customerId}`,
    async() => {
        if(!expandOrderId){
            return null
        }

        const body: FindCustomerParams = { id: props.customerId}
        const response = await apiV2.post('/customers/find', body)

        return response.data

    }, {
        refetchOnWindowFocus: true,
        enabled: true
    })

    const [ addresses, setAddresses ] = useState<CustomerAddress[]>([])

    const customer = data?.customer

    useEffect(() => {
        setRefresh(false)

        if(props.customerId == null){
            return
        }

        setTimeout(() => { setRefresh(true), 1})

    }, [props.customerId])

    useEffect(() => {
        const order = props?.order

        if(!order){
            return
        }
        
        const addressesList: CustomerAddress[] = []

        customer?.addresses?.map(address => {
            if(address.id == order.billingAddressId){
                addressesList.push(address)
            }

            if(address.id == order.shippingAddressId){
                addressesList.push(address)
            }
        })

        setAddresses(addressesList)

    }, [customer])

    return (
        <div
        className={styles.wrapper}
        style={{ display: `${props.customerId != null? 'flex' : 'none' }` }}
        >
            <span
            className={styles.header}
            onClick={() => { setOpen(!open) }}
            >
                cliente
            </span>
            <div
            className={styles.container}
            style={containerStyles}
            >
                <div
                className={styles.customerInfo}
                >
                    <div
                    className={styles.nameContainer}
                    >
                        <h4>
                            {customer?.name}
                        </h4>
                        <div
                        className={styles.documents}
                        >
                            <span>cpf: {customer?.cpf}</span>
                            {customer?.cnpj? '- cnpj' : ''}
                            {customer?.cnpj? customer.cnpj : ''}
                        </div>
                    </div>
                    <div
                    className={styles.contactContainer}
                    >
                        <span>{ customer?.email }</span>
                        <span>{ customer?.cellphone }</span>
                        <span>{ customer?.phone }</span>
                    </div>
                </div>
                {/* billingAddress if exists */}
                {addresses?.map(address => {
                    return (
                        <div
                        className={styles.addressContainer}
                        >
                            <span>{ address.type }</span>
                            <span>{ address?.name }</span>
                            <span>{ address?.address }</span>
                            <span>{ address?.number }</span>
                            <span>{ address?.complement }</span>
                            <span>{ address?.neighborhood }</span>
                            <span>{ address?.city }/{ address?.state }</span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}