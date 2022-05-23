import { CSSProperties, useContext, useEffect, useState } from 'react';
import { OrdersContext } from '../../../../../contexts/OrdersContext';
import { useFetch } from '../../../../../services/api/useFetch';
import OrderCostumerContainer from './OrderCostumerContainer';
import styles from './styles.module.scss';
import { Order } from '../../../../../services/api/types/Orders/Orders'

type Props = {

}

export default function OrderContainer(props: Props){

    const { expandOrderId } = useContext( OrdersContext )
    const [ wrapperStyles, setWrapperStyles ] = useState<CSSProperties>({})
    const [ fetchOrder, setFetchOrder ] = useState<boolean>(false)

    const { data, isFetching, error } = useFetch<{order: Order}>('post', '/orders/find', fetchOrder, { id: expandOrderId })

    const order = data?.order

    useEffect(() => { // close or open the order and trigger the data fetch

        setFetchOrder(false)
        if(!expandOrderId){

            setWrapperStyles({ 
                flexGrow: 0,
                border: '0px solid var(--gray-3)',
            })
            return
        }

        setWrapperStyles({ 
            flexGrow: 12,
            border: '1px solid var(--white-text)',
        })
        
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
            <span>
                {expandOrderId}{order?.customerId}
            </span>
            <OrderCostumerContainer 
            customerId={data?.order?.customerId}
            />
        </div>
    )
}