import { format, parseISO } from 'date-fns'
import { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { OrdersContext } from '../../../../../../contexts/OrdersContext'
import { apiV2 } from '../../../../../../services/api/apiAxiosConfig'
import { Customer, CustomerAddress, FindCustomerParams, FindCustomerResponse } from '../../../../../../services/api/types/Customers/Customer'
import { ListOrdersPaymentsParams, ListOrdersPaymentsResponse, ListOrdersProductsSoldParams, ListOrdersProductsSoldResponse, Order } from '../../../../../../services/api/types/Orders/Orders'
import floatToPrice from '../../../../../../services/floatToPrice'
import handleStyles from './handleStyles'
import styles from './styles.module.scss'

type Props = {
    orderId: number | null
    order: Order
}

export default function OrderPayments(props: Props){

    const { expandOrderId } = useContext(OrdersContext)
    const [ open, setOpen ] = useState<boolean>(true)
    const { containerStyles } = handleStyles({ open })

    const { data, isFetching } = useQuery<ListOrdersPaymentsResponse>(`payments_order_id_${props.orderId}`,
    async() => {
        if(!props.orderId){
            return null
        }

        const body: ListOrdersPaymentsParams = { ordersPayments: { orderId: props.orderId } }
        const response = await apiV2.post('/orders/payments/list', body)

        return response.data

    }, {
        refetchOnWindowFocus: true,
        enabled: true
    })

    const payments = data?.ordersPayments? data.ordersPayments : []

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

    function getBalance(): string{
        var saldo = 0

        payments?.map(payment => {
            saldo += payment.value
        })

        return `R$${floatToPrice(saldo)}`
    }

    function getRemaining(): string{
        
        const total = props?.order?.total

        if(!total){
            return ''
        }

        var paid = 0

        payments?.map(payment => {
            paid += payment.value
        })

        if(paid < total){
            const remaing = total - paid
            return `falta R$${floatToPrice(remaing)}`
        }

        return ''
    }

    return (
        <div
        className={styles.wrapper}
        >
            <span
            className={styles.header}
            onClick={() => { setOpen(!open) }}
            >
                pagamentos do cliente
            </span>
            <div
            className={styles.container}
            style={containerStyles}
            >
                <div
                className={styles.paymentsList}
                >
                    {payments?.map((payment, index) => {
                        return (
                            <div
                            key={index}
                            className={styles.paymentContainer}
                            >
                                <span>{ format(parseISO(payment?.date), 'dd/MM/yyyy') }</span>
                                <span>{ payment?.method }</span>
                                <span style={{ textAlign: 'end' }} >
                                    { `R$${floatToPrice(payment?.value)}` }
                                </span>
                            </div>
                        )
                    })}                    
                </div>
                {payments?.length > 0? 
                <span
                className={styles.balance}
                >
                    pago: {getBalance()} {getRemaining()}
                </span>
                : <></>}
                {payments.length == 0 && !isFetching?
                <span className={styles.noResults}>nenhum pagamento para esse pedido</span>
                : <></> }
            </div>
        </div>
    )
}