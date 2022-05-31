import { format, parseISO } from 'date-fns'
import { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { OrdersContext } from '../../../../../../contexts/OrdersContext'
import { apiV2 } from '../../../../../../services/api/apiAxiosConfig'
import { Customer, CustomerAddress, FindCustomerParams, FindCustomerResponse } from '../../../../../../services/api/types/Customers/Customer'
import { ListOrderInvoicesParams, ListOrderInvoicesResponse, ListOrdersfinancesParams, ListOrdersfinancesResponse, ListOrdersProductsSoldParams, ListOrdersProductsSoldResponse, Order } from '../../../../../../services/api/types/Orders/Orders'
import floatToPrice from '../../../../../../services/floatToPrice'
import handleStyles from './handleStyles'
import styles from './styles.module.scss'

type Props = {
    orderId: number | null
}

export default function OrderInvoices(props: Props){

    const { expandOrderId } = useContext(OrdersContext)
    const [ open, setOpen ] = useState<boolean>(true)
    const { containerStyles } = handleStyles({ open })

    const { data, isFetching } = useQuery<ListOrderInvoicesResponse>(`invoices_order_id_${props.orderId}`,
    async() => {
        if(!props.orderId){
            return null
        }

        const body: ListOrderInvoicesParams = {
            ordersInvoices: { orderId: props.orderId },
            sort: { created: 'asc' }
        }
        const response = await apiV2.post('/orders/invoices/list', body)

        return response.data

    }, {
        refetchOnWindowFocus: true,
        enabled: true
    })

    const invoices = data?.ordersInvoices? data?.ordersInvoices : []

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

    function copyInvoiceKey(key: string){
        if(!key){
            return
        }

        navigator.clipboard.writeText(key)

        const keyLabel = document.querySelector('#keyLabel')

        if(!keyLabel){
            return
        }

        keyLabel.innerHTML = 'copiado'
    }

    return (
        <div
        className={styles.wrapper}
        >
            <span
            className={styles.header}
            onClick={() => { setOpen(!open) }}
            >
                notas fiscais
            </span>
            <div
            className={styles.container}
            style={containerStyles}
            >
                <div
                className={styles.invoicesList}
                >
                    {invoices?.map((invoice, index) => {
                        return (
                            <div
                            key={index}
                            className={styles.invoiceContainer}
                            >
                                <span style={{ textAlign: 'start' }} >
                                    { format(parseISO(invoice?.created), 'dd/MM/yyyy') }
                                </span>
                                <span>
                                    { invoice?.number }
                                </span>
                                <span>
                                    <a
                                    style={{ display: `${invoice?.link? 'flex' : 'none' }` }}
                                    target="_blank"
                                    href={invoice?.link}
                                    >
                                        { 'link' }
                                    </a>
                                </span>
                                <span
                                style={{ display: `${invoice?.link? 'flex' : 'none' }` }}
                                id='keyLabel'
                                onClick={() => copyInvoiceKey(invoice.key)}
                                >
                                    copiar chave
                                </span>
                            </div>
                        )
                    })}
                    {invoices.length == 0 && !isFetching?
                    <span className={styles.noResults}>nenhuma nota fiscal para esse pedido</span>
                    : <></> }
                </div>
            </div>
        </div>
    )
}