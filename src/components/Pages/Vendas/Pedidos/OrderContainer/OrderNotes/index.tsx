import { format, parseISO } from 'date-fns'
import { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { OrdersContext } from '../../../../../../contexts/OrdersContext'
import { apiV2 } from '../../../../../../services/api/apiAxiosConfig'
import { ListOrdersNotesParams, ListOrdersNotesResponse } from '../../../../../../services/api/types/Orders/Orders'
import floatToPrice from '../../../../../../services/floatToPrice'
import handleStyles from './handleStyles'
import styles from './styles.module.scss'

type Props = {
    orderId: number | null
}

export default function OrderNotes(props: Props){

    const { expandOrderId } = useContext(OrdersContext)
    const [ open, setOpen ] = useState<boolean>(true)
    const { containerStyles } = handleStyles({ open })

    const { data, isFetching } = useQuery<ListOrdersNotesResponse>(`notes_order_id_${props.orderId}`,
    async() => {
        if(!props.orderId){
            return null
        }

        const body: ListOrdersNotesParams = {
            notes: { orderId: props.orderId },
            sort: { created: 'asc' }
        }
        const response = await apiV2.post('/orders/notes/list', body)

        return response.data

    }, {
        refetchOnWindowFocus: true,
        enabled: true
    })

    const notes = data?.ordersNotes? data?.ordersNotes : []

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

    return (
        <div
        className={styles.wrapper}
        >
            <span
            className={styles.header}
            onClick={() => { setOpen(!open) }}
            >
                observações
            </span>
            <div
            className={styles.container}
            style={containerStyles}
            >
                <div
                className={styles.notesList}
                >
                    {notes?.map((note, index) => {
                        return (
                            <div
                            key={index}
                            className={styles.noteContainer}
                            >
                                <p>{`${format(parseISO(note?.created), 'dd/MM/yyyy')} - ${note?.by}: ${note?.description}`}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            {notes.length == 0 && !isFetching?
            <span className={styles.noResults}>nenhuma observação para esse pedido</span>
            : <></> }
        </div>
    )
}