import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { apiV2 } from '../../../../../../services/api/apiAxiosConfig';
import { ListOrdersParams, ListOrdersResponse } from '../../../../../../services/api/types/Orders/Orders';
import RectangularPlaceholder from '../../../../../Placeholders/Rectangular';
import OrderContainer from './OrderContainer';
import styles from './styles.module.scss';

type Props = {

}
export default function OrdersList(props: Props){

    const [ firstFetch, setFirstFetch ] = useState<boolean>(false)

    const { data, isFetching, isError,  } = useQuery<ListOrdersResponse>('orders', async () => {
        const body: ListOrdersParams = {
            orders: {},
            paging: {
                page: 1,
                limit: 20
            },
            sort: {
                trayOrderId: 'desc'
            }
        }
        const response = await apiV2.post('/orders/list', body)
        
        return response.data
    })

    useEffect(() => { // set true to firstFetch after got orders
        const orders = data?.orders

        if(!firstFetch && orders){
            setFirstFetch(true)
        }
    }, [data])

    const placeholdersList = []

    for (let index = 0; index < 20; index++) {
        placeholdersList.push(index)
    }

    return (
        <div
        className={styles.wrapper}
        >
            <div
            className={styles.ordersList}
            >
                {/* display placeholders in fist fetch until display orders */}
                {placeholdersList.map(placeholder => {
                    if(isFetching && !firstFetch){
                        return (
                        <RectangularPlaceholder 
                        height='3.2rem'
                        />
                        )
                    }
                })}
                {/* orders list  */}
                {data?.orders?.map((order, index) => {
                    return (
                        <OrderContainer
                        key={index} 
                        order={order}
                        />
                    )
                })}
            </div>
        </div>
    )
}