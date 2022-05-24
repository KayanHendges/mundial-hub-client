import { format, parseISO } from 'date-fns'
import { Order } from '../../../../../../services/api/types/Orders/Orders'
import styles from './styles.module.scss'

type Props = {
    order: Order
}

export default function OrderHeader(props: Props){

    const order = props?.order

    if(!order){
        return <></>
    }

    return (
        <div
        className={styles.wrapper}
        >
            <span>{ order?.trayOrderId }</span>
            <span>{ format(parseISO(order?.created), 'dd/MM/yyyy hh:mm:ss') }</span>
            <span>{ order?.status }</span>
        </div>
    )
}