import { differenceInDays, format, getDay, parseISO } from 'date-fns';
import { useState } from 'react';
import { ListTrayOrdersParams, ListTrayOrdersResponse } from '../../../../../../services/api/types/Tray/Orders/Orders';
import { useFetch } from '../../../../../../services/api/useFetch'
import floatToPrice from '../../../../../../services/floatToPrice';
import DefaultSelectBox from '../../../../../Inputs/DefaultSelectBox';
import RectangularPlaceholder from '../../../../../Placeholders/Rectangular';
import styles from './styles.module.scss'

type Props = {
    fetchOrders: boolean,
    setFetchOrder(fetchOrders: boolean): void;
    ordersParams: ListTrayOrdersParams
}

type ImportItem = {
    trayId: number,
    importing: boolean,
    success: boolean | null
}

export default function ImportOrdersList(props: Props){

    const { storeCode, includeImported, limit, page } = props.ordersParams
    const path = `/tray/orders?store_code=${storeCode}&include_imported=${includeImported}&page=${page}&limit=${limit}`

    const { data, isFetching, error } = useFetch<ListTrayOrdersResponse>('get', path, props.fetchOrders)
    const orders = isFetching? [] : data?.orders

    const [ importList, setImportList ] = useState<ImportItem[]>([])

    const placeholderList = (length: number) => {
        const array: number[] = []
        for (let index = 0; index < length; index++) {
            array.push(index)
        }
        return array
    }

    return (
        <div
        className={styles.wrapper}
        >
            <div
            className={styles.list}
            >
                {placeholderList(20).map( placeholder => {
                    return (
                        <RectangularPlaceholder
                        key={placeholder}
                        display={isFetching? 'flex' : 'none'}
                        height={'3rem'}
                        width={'100%'}
                        />
                    )
                } )}
                {orders?.map((order, index) => {

                    function dateFormat(date: string): string{
                        if(!date){
                            return ''
                        }

                        const today = new Date()
                        const orderDate = parseISO(order.date)
                        const differenceDate = differenceInDays(orderDate, today)

                        if(differenceDate == 0){
                            return 'hoje'
                        }

                        if(differenceDate == -1){
                            return 'ontem'
                        }

                        if(differenceDate > -7){
                            return `${Math.abs(differenceDate)} dias atrás`
                        }

                        const returnDate = date.split('-').reverse().join('/')

                        return returnDate
                    }

                    const importOrder = {
                        trayId: parseInt(order.id),
                        importing: null,
                        success: null
                    }

                    return (
                        <div
                        className={styles.orderContainer}
                        key={index}
                        >
                            <DefaultSelectBox 
                            selected={false}
                            width={'1.3rem'}
                            click={e => {
                            }}
                            />
                            <span
                            >
                                {order?.id}
                            </span>
                            <span>
                                {dateFormat(order.date)}
                            </span>
                            <span>
                                {order?.status}
                            </span>
                            <span>
                                {`R$${floatToPrice(parseFloat(order?.total))}`}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}