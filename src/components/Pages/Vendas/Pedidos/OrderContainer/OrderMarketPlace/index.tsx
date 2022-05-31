import { format, parseISO } from 'date-fns'
import { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { OrdersContext } from '../../../../../../contexts/OrdersContext'
import { apiV2 } from '../../../../../../services/api/apiAxiosConfig'
import { Customer, CustomerAddress, FindCustomerParams, FindCustomerResponse } from '../../../../../../services/api/types/Customers/Customer'
import { FindOrderMarketPlaceOrdersParams, FindOrderMarketPlaceOrdersResponse, ListOrdersfinancesParams, ListOrdersfinancesResponse, ListOrdersProductsSoldParams, ListOrdersProductsSoldResponse, Order } from '../../../../../../services/api/types/Orders/Orders'
import floatToPrice from '../../../../../../services/floatToPrice'
import handleStyles from './handleStyles'
import styles from './styles.module.scss'

type Props = {
    orderId: number | null
}

export default function OrderMarketPlace(props: Props){

    const { expandOrderId } = useContext(OrdersContext)
    const [ open, setOpen ] = useState<boolean>(true)
    const { containerStyles } = handleStyles({ open })

    const { data, isFetching } = useQuery<FindOrderMarketPlaceOrdersResponse>(`marketplace_order_id_${props.orderId}`,
    async() => {
        if(!props.orderId){
            return null
        }

        const body: FindOrderMarketPlaceOrdersParams = {
            orderId: props.orderId
        }
        const response = await apiV2.post('/orders/marketplace/find', body)

        return response.data

    }, {
        refetchOnWindowFocus: true,
        enabled: true
    })

    const marketPlaceOrder = data?.orderMarketPlace

    useEffect(() => {
        if(!expandOrderId){
            setOpen(false)
        }

        if(expandOrderId){
            setTimeout(() => {
                setOpen(true)
            }, 300)
        }

    }, [expandOrderId])

    console.log(marketPlaceOrder)

    if(!marketPlaceOrder){
        return (<></>)
    }

    return (
        <div
        className={styles.wrapper}
        >
            <span
            className={styles.header}
            onClick={() => { setOpen(!open) }}
            >
                pedido no MarketPlace
            </span>
            <div
            className={styles.container}
            style={containerStyles}
            >
                <span>
                    <a href={`${marketPlaceOrder?.link? marketPlaceOrder?.link : ''}`} target='_blank'>
                        {marketPlaceOrder?.marketPlaceOrderId}
                    </a>
                </span>
                <span>
                    {marketPlaceOrder?.name}
                </span>
            </div>
        </div>
    )
}