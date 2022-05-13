import { differenceInDays, format, getDay, parseISO } from 'date-fns';
import { useEffect, useState } from 'react';
import { ListTrayOrdersParams, ListTrayOrdersResponse } from '../../../../../../services/api/types/Tray/Orders/Orders';
import { useFetch } from '../../../../../../services/api/useFetch'
import floatToPrice from '../../../../../../services/floatToPrice';
import DefaultSelectBox from '../../../../../Inputs/DefaultSelectBox';
import RectangularPlaceholder from '../../../../../Placeholders/Rectangular';
import dateFormat from './dataFormat';
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

    useEffect(() => {

        setImportList([])
        
    }, [props.ordersParams])

    const placeholderList = (length: number) => {
        const array: number[] = []
        for (let index = 0; index < length; index++) {
            array.push(index)
        }
        return array
    }

    function isSelected(order: ImportItem){
        var selected = false
        importList.map(item => {
            if(item.trayId == order.trayId){
                selected = true
            }
        })
        return selected
    }

    function handleImportOrder(order: ImportItem){
        const list: ImportItem[] = []
        var isSelected = false
        importList.map((item, index) => {
            if(item.trayId == order.trayId){
                isSelected = true
            } else {
                list.push(item)
            }
        })
        if(!isSelected){
            list.push(order)
        }
        setImportList(list)
    }

    return (
        <div
        className={styles.wrapper}
        >
            <div
            className={styles.header}
            >
                <DefaultSelectBox 
                selected={false}
                click={() => {}}
                width={'1.1rem'}
                lock={false}
                />
                <span
                className={styles.selectAll}
                >
                    importar todos
                </span>
            </div>
            <div
            className={styles.list}
            >
                <div
                className={styles.listContainer}
                >
                    {placeholderList(20).map( placeholder => {
                        if(isFetching){
                            return (
                                <RectangularPlaceholder
                                key={placeholder}
                                display={isFetching? 'flex' : 'none'}
                                height={'3rem'}
                                width={'100%'}
                                />
                            )
                        }
                    } )}
                    {orders?.map((order, index) => {

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
                                visibility={order.imported? 'hidden' : 'visible'}
                                selected={isSelected(importOrder)}
                                width={'1.1rem'}
                                click={e => handleImportOrder(importOrder)}
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
        </div>
    )
}