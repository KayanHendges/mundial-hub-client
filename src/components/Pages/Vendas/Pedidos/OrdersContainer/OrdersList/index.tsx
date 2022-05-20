import { useQuery } from 'react-query';
import { apiV2 } from '../../../../../../services/api/apiAxiosConfig';
import { ListOrdersParams, ListOrdersResponse } from '../../../../../../services/api/types/Orders/Orders';
import OrderContainer from './OrderContainer';
import styles from './styles.module.scss';

type Props = {

}
export default function OrdersList(props: Props){

    const { data, isFetched, isError } = useQuery<ListOrdersResponse>('orders', async () => {
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

    return (
        <div
        className={styles.wrapper}
        >
            <div
            className={styles.ordersList}
            >
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