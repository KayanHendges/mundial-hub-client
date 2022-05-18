import { useEffect, useState } from 'react';
import { ListTrayOrdersParams, ListTrayOrdersResponse } from '../../../../../../services/api/types/Tray/Orders/Orders';
import { useFetch } from '../../../../../../services/api/useFetch'
import floatToPrice from '../../../../../../services/floatToPrice';
import DefaultSelectBox from '../../../../../Inputs/DefaultSelectBox';
import RectangularPlaceholder from '../../../../../Placeholders/Rectangular';
import ImportButton from '../ImportButton';
import dateFormat from './dataFormat';
import Footer from './Footer';
import ImportOrderLoader from './ImportOrderLoader';
import importQueue from './importQueue';
import selectAll from './selectAll';
import styles from './styles.module.scss'

type Props = {
    findStores: boolean;
    fetchOrders: boolean,
    setFetchOrder(fetchOrders: boolean): void;
    ordersParams: ListTrayOrdersParams
    setOrdersParams(ordersParams: ListTrayOrdersParams): void;
}

export type ImportItem = {
    trayId: number,
    importing: boolean,
    success: boolean | null
}

export default function ImportOrdersList(props: Props){

    const { storeCode, includeImported, limit, page } = props.ordersParams
    const path = `/tray/orders?store_code=${storeCode}&include_imported=${includeImported}&page=${page}&limit=${limit}`

    const { data, isFetching, error } = useFetch<ListTrayOrdersResponse>('get', path, props.fetchOrders)
    const orders = isFetching? [] : data?.orders
    const totalOrders = isFetching? 0 : data?.total

    const [ importList, setImportList ] = useState<ImportItem[]>([])
    const { queue, currentId, addToQueue } = importQueue()

    const { selecting, setSelecting } = selectAll(props.ordersParams, { set: setImportList }, totalOrders)


    useEffect(() => {
        if(!isFetching){
            props.setFetchOrder(false)
        }
    }, [isFetching])

    useEffect(() => {
        if(error){
            console.log(error)
        }
    }, [error])

    useEffect(() => {

        setImportList([])
        
    }, [props.ordersParams])

    useEffect(() => { // clean the importList when every request was completed
        if(importList.length == 0){ return }

        var hasNotCompleted = false
        importList.map( item => {
            if(item.success == null){
                hasNotCompleted = true
            }
        })

        if(!hasNotCompleted){
            setImportList([])
        }
    }, [importList])

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

    function selectedOrdesLabel(amount: number): string{

        if(selecting){
            return 'selecionando todos'
        }

        if(props.fetchOrders || props.findStores){
            return ''
        }

        if(amount == totalOrders){
            return 'todos'
        }

        return 'selecionar todos'

    }

    function loadingFooter(): boolean{
        if(props.findStores){return true}
        if(props.fetchOrders){return true}
        return false
    }

    const alreadyDisplayed = []
    orders?.map( order => {
        alreadyDisplayed.push(parseInt(order.id))
    })

    return (
        <div
        className={styles.wrapper}
        >
            <div
            className={styles.header}
            style={{
                visibility: `${isFetching || props.findStores? 'hidden' : 'visible'}`
            }}
            >
                <DefaultSelectBox 
                display={`${isFetching? 'none' : 'flex'}`}
                selected={importList.length == totalOrders? true : false}
                click={() => {
                    if(importList.length == totalOrders){
                        setImportList([])
                        return
                    } 

                    if(!selecting){
                        setSelecting(true)
                        return
                    }
                }}
                width={'1.1rem'}
                lock={false}
                />
                <span
                className={styles.selectAll}
                >
                    {selectedOrdesLabel(importList.length)}
                </span>
                <span
                >
                    {`${importList.length > 0? importList.length : ''}${importList.length > 0? ' selecionados' : ''}`}
                </span>
                <ImportButton 
                importList={importList}
                label='importar produtos'
                css={{ width: '10rem' }}
                action={e => {
                    const pushList = []
                    const orderImportList = importList?.sort((a, b) => {
                        if(a.trayId > b.trayId){ return 1 }
                        if(a.trayId < b.trayId){ return -1 }
                        return 0
                    })
                    orderImportList.map(order => {
                        pushList.push(order.trayId)
                    })
                    addToQueue(pushList)
                }}
                />
            </div>
            <div
            className={styles.list}
            >
                <div
                className={styles.listContainer}
                >
                    {placeholderList(20).map( placeholder => {
                        if(isFetching || props.findStores){
                            return (
                                <RectangularPlaceholder
                                key={placeholder}
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
                                <span title={order?.status}>
                                    {order?.status.substring(0, 22)}
                                </span>
                                <span>
                                    {`R$${floatToPrice(parseFloat(order?.total))}`}
                                </span>
                                <ImportOrderLoader 
                                importList={importList}
                                setImportList={setImportList}
                                id={importOrder.trayId}
                                storeCode={props.ordersParams.storeCode}
                                queue={queue}
                                addToQueue={addToQueue}
                                currentId={currentId}
                                html={true}
                                />
                            </div>
                        )
                    })}
                </div>
            </div>
            <Footer 
            orders={data}
            ordersParams={props.ordersParams}
            setOrdersParams={props.setOrdersParams}
            loading={loadingFooter()}
            />
            {importList?.map( (item, index) => {

                if(!alreadyDisplayed.includes(item.trayId)){
                    return (
                        <ImportOrderLoader 
                        key={index}
                        html={false}
                        id={item.trayId}
                        addToQueue={addToQueue}
                        currentId={currentId}
                        importList={importList}
                        queue={queue}
                        setImportList={setImportList}
                        storeCode={props.ordersParams.storeCode}
                        />
                    )
                }
            })}
        </div>
    )
}