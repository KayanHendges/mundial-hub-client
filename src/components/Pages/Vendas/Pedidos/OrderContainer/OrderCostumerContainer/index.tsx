import { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { OrdersContext } from '../../../../../../contexts/OrdersContext'
import { apiV2 } from '../../../../../../services/api/apiAxiosConfig'
import { FindCustomerParams, FindCustomerResponse } from '../../../../../../services/api/types/Customers/Customer'
import DefaultTextInput from '../../../../../Inputs/DefaultTextInput'
import styles from './styles.module.scss'

type Props = {
    customerId: number | null
}

export default function OrderCostumerContainer(props: Props){

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
    },
    {
        refetchOnWindowFocus: true,
        enabled: true
    }
    )

    useEffect(() => {
        setRefresh(false)

        if(props.customerId == null){
            return
        }

        setTimeout(() => { setRefresh(true), 1})

    }, [props.customerId])

    useEffect(() => {
        console.log(data)
    }, [data])

    const customer = data?.customer

    return (
        <div
        className={styles.wrapper}
        style={{ display: `${props.customerId != null? 'flex' : 'none' }` }}
        >
            {/* <DefaultTextInput 
            value={customer?.name}
            readOnly={true}
            /> */}
            <span>{customer?.name}</span>
        </div>
    )
}