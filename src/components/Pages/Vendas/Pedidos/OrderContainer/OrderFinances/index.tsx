import { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { OrdersContext } from '../../../../../../contexts/OrdersContext'
import { apiV2 } from '../../../../../../services/api/apiAxiosConfig'
import { Customer, CustomerAddress, FindCustomerParams, FindCustomerResponse } from '../../../../../../services/api/types/Customers/Customer'
import { ListOrdersProductsSoldParams, ListOrdersProductsSoldResponse, Order } from '../../../../../../services/api/types/Orders/Orders'
import handleStyles from './handleStyles'
import styles from './styles.module.scss'

type Props = {
    orderId: number | null
}

export default function OrderFinances(props: Props){

    const [ open, setOpen ] = useState<boolean>(true)
    const { containerStyles } = handleStyles({ open })

    const { data, isFetching } = useQuery<ListOrdersProductsSoldResponse>(`products_sold_order_id_${props.orderId}`,
    async() => {
        if(!props.orderId){
            return null
        }

        const body: ListOrdersProductsSoldParams = { productsSold: { orderId: props.orderId } }
        const response = await apiV2.post('/orders/products-sold/list', body)

        return response.data

    }, {
        refetchOnWindowFocus: true,
        enabled: true
    })

    const products = data?.ordersProductsSold

    return (
        <div
        className={styles.wrapper}
        >
            <span
            className={styles.header}
            onClick={() => { setOpen(!open) }}
            >
                produtos
            </span>
            <div
            className={styles.container}
            style={containerStyles}
            >
                <div
                className={styles.financesList}
                >
                    
                </div>
            </div>
        </div>
    )
}