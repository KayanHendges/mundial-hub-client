import { CSSProperties, useContext, useEffect, useState } from 'react';
import { OrdersContext } from '../../../../../contexts/OrdersContext';
import { useFetch } from '../../../../../services/api/useFetch';
import OrderCostumerContainer from './OrderCostumerContainer';
import styles from './styles.module.scss';
import { Order } from '../../../../../services/api/types/Orders/Orders'
import handleStyles from './styles';
import OrderHeader from './OrderHeader';
import OrderProductsSold from './OrderProductsSold';
import OrderFinances from './OrderFinances';
import OrderPayments from './OrderPayments';
import OrderNotes from './OrderNotes';
import OrderInvoices from './OrderInvoices';
import OrderMarketPlace from './OrderMarketPlace';

type Props = {

}

export default function OrderContainer(props: Props){

    const { expandOrderId } = useContext( OrdersContext )
    const { wrapperStyles } = handleStyles()
    const [ fetchOrder, setFetchOrder ] = useState<boolean>(false)

    const { data, isFetching, error } = useFetch<{order: Order}>('post', '/orders/find', fetchOrder, { id: expandOrderId })

    const order = data?.order

    useEffect(() => { // close or open the order and trigger the data fetch

        setFetchOrder(false)
        if(!expandOrderId){

            return
        }
        
        setTimeout(() => { setFetchOrder(true) }, 1)

    }, [ expandOrderId ])

    useEffect(() => {

        if(!order){
            return
        }


    }, [order])

    return (
        <div
        className={styles.wrapper}
        style={wrapperStyles}
        >
            <OrderHeader 
            order={order}
            />
            <div
            className={styles.container}
            >
                <OrderCostumerContainer 
                customerId={data?.order?.customerId}
                order={order}
                />
                <OrderMarketPlace 
                orderId={expandOrderId}
                />
                <OrderProductsSold 
                orderId={expandOrderId}
                />
                <OrderPayments
                orderId={expandOrderId}
                order={order}
                />
                <OrderFinances
                orderId={expandOrderId}
                />
                <OrderInvoices
                orderId={expandOrderId}
                />
                <OrderNotes
                orderId={expandOrderId}
                />
            </div>
        </div>
    )
}