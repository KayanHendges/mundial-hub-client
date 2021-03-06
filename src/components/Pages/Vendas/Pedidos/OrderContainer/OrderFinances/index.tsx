import { format, parseISO } from 'date-fns'
import { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { OrdersContext } from '../../../../../../contexts/OrdersContext'
import { apiV2 } from '../../../../../../services/api/apiAxiosConfig'
import { Customer, CustomerAddress, FindCustomerParams, FindCustomerResponse } from '../../../../../../services/api/types/Customers/Customer'
import { ListOrdersfinancesParams, ListOrdersfinancesResponse, ListOrdersProductsSoldParams, ListOrdersProductsSoldResponse, Order } from '../../../../../../services/api/types/Orders/Orders'
import floatToPrice from '../../../../../../services/floatToPrice'
import handleStyles from './handleStyles'
import styles from './styles.module.scss'

type Props = {
    orderId: number | null
}

export default function OrderFinances(props: Props){

    const { expandOrderId } = useContext(OrdersContext)
    const [ open, setOpen ] = useState<boolean>(true)
    const { containerStyles } = handleStyles({ open })

    const { data, isFetching } = useQuery<ListOrdersfinancesResponse>(`finances_order_id_${props.orderId}`,
    async() => {
        if(!props.orderId){
            return null
        }

        const body: ListOrdersfinancesParams = {
            finances: { orderId: props.orderId },
            sort: { date: 'asc' }
        }
        const response = await apiV2.post('/orders/finances/list', body)

        return response.data

    }, {
        refetchOnWindowFocus: true,
        enabled: true
    })

    const finances = data?.ordersFinances? data?.ordersFinances : []

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

        finances.map(finance => {
            if(finance.type == 'credit'){
                saldo += finance.value
            }

            if(finance.type == 'debit'){
                saldo -= finance.value
            }
        })

        return `R$${floatToPrice(saldo)}`
    }

    return (
        <div
        className={styles.wrapper}
        >
            <span
            className={styles.header}
            onClick={() => { setOpen(!open) }}
            >
                finan??as
            </span>
            <div
            className={styles.container}
            style={containerStyles}
            >
                <div
                className={styles.financesList}
                >
                    {finances?.map((finance, index) => {
                        return (
                            <div
                            key={index}
                            className={styles.financeContainer}
                            >
                                <span>{ format(parseISO(finance?.date), 'dd/MM/yyyy') }</span>
                                <span>
                                    { finance?.type } -
                                    { finance?.applied? ' pago' : ' falta receber' }
                                </span>
                                <span style={{ textAlign: 'end' }} >
                                    { `R$${floatToPrice(finance?.value)}` }
                                </span>
                            </div>
                        )
                    })}
                </div>
                {data?.ordersFinances.length > 0? 
                <span
                className={styles.balance}
                >
                    saldo: {getBalance()}
                </span>
                : <></>}
                {finances.length == 0 && !isFetching?
                <span className={styles.noResults}>nenhuma finan??a para esse pedido</span>
                : <></> }
            </div>
        </div>
    )
}