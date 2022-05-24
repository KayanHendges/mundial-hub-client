import { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { OrdersContext } from '../../../../../../contexts/OrdersContext'
import { apiV2 } from '../../../../../../services/api/apiAxiosConfig'
import { Customer, FindCustomerParams, FindCustomerResponse } from '../../../../../../services/api/types/Customers/Customer'
import DefaultTextInput from '../../../../../Inputs/DefaultTextInput'
import handleStyles from './handleStyles'
import styles from './styles.module.scss'

type Props = {
    customerId: number | null
}

export default function OrderCostumerContainer(props: Props){

    const [ open, setOpen ] = useState<boolean>(true)
    const { containerStyles } = handleStyles({ open })

    const { expandOrderId } = useContext(OrdersContext)
    const [ refresh, setRefresh ] = useState<boolean>(false)
    const [ customer, setCustomer ] = useState<Customer | null>(null)

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

    useEffect(() => {
        const customerData = data?.customer

        if(!customerData){
            return
        }

        setCustomer(customerData)

    }, [data])

    useEffect(() => {
        setRefresh(false)

        if(props.customerId == null){
            return
        }

        setTimeout(() => { setRefresh(true), 1})

    }, [props.customerId])

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
                <DefaultTextInput 
                label='nome'
                value={customer?.name}
                onChange={e => { setCustomer({...customer, name: e.target.value}) }}
                loading={customerFetching}
                />
                <DefaultTextInput 
                label='CPF'
                value={customer?.cpf}
                onChange={e => { setCustomer({...customer, name: e.target.value}) }}
                loading={customerFetching}
                />
                <DefaultTextInput 
                display={`${customer?.cnpj? 'flex' : 'none'}`}
                label='CNPJ'
                value={customer?.cpf}
                onChange={e => { setCustomer({...customer, name: e.target.value}) }}
                loading={customerFetching}
                />
            </div>
        </div>
    )
}