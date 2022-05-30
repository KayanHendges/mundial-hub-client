import DefaultTextInput from '../../../../../Inputs/DefaultTextInput';
import styles from './styles.module.scss';
import { useContext, useState } from 'react';
import { OrdersContext } from '../../../../../../contexts/OrdersContext'
import { apiV2 } from '../../../../../../services/api/apiAxiosConfig';

type Props = {

}

export default function InputsContainer(props: Props){
    
    const { ordersParams, setOrdersParams } = useContext(OrdersContext)

    const [ search, setSearch  ] = useState<string>('')

    async function sendSearch(search: string){

        if(search.length == 0){
            setOrdersParams({
                ...ordersParams,
                orders: {
                    ...ordersParams.orders,
                    trayOrderId: undefined,
                    customerId: undefined
                }
            })
            return
        }

        var onlyNumber = true

        search.split("").map(crt => {
            const number = parseInt(crt)
            if(isNaN(number)){
                onlyNumber = false
            }
        })

        if(onlyNumber){
            
            // search by trayOrderId

            setOrdersParams({
                ...ordersParams,
                orders: {
                    ...ordersParams.orders,
                    customerId: undefined,
                    trayOrderId: parseInt(search)
                }
            })

        }

        if(!onlyNumber){

            // search by customer name

            const customerId = await apiV2.post('/customers/list', {
                customers: {
                    name: search
                },
                sort: {
                    id: 'desc'
                }
            })
            .then(response => {
                const list = response?.data?.customers

                if(list.length == 0){
                    return undefined
                }
                
                return list[0].id
            })
            .catch(err => { return undefined })

            setOrdersParams({
                ...ordersParams,
                orders: {
                    ...ordersParams.orders,
                    trayOrderId: undefined,
                    customerId
                }
            })
        }
    }

    return (
        <div
        className={styles.wrapper}
        >
            <DefaultTextInput
            value={search}
            onChange={e => {
                setSearch(e.target.value)
            }}
            leaveInput={() => sendSearch(search)}
            placeholder='pesquise pelo número do pedido ou nome do cliente'
            />
        </div>
    )
}