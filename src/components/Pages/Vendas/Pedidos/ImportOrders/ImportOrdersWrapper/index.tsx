import styles from './styles.module.scss'
import { useWrapperStyles } from './componentStyles'

import { useContext, useEffect, useState } from 'react'
import { OrdersContext } from '../../../../../../contexts/OrdersContext'
import { useFetch } from '../../../../../../services/api/useFetch'

import DefaultSelectorInput from '../../../../../Inputs/DefaultSelectorInput'
import ImportOrdersList from '../ImportOrdersList'

import { ListTrayOrdersParams } from '../../../../../../services/api/types/Tray/Orders/Orders'
import { ListStoresResponse, Store } from '../../../../../../services/api/types/Store/Stores'

type Props = {
    openStyles: boolean;
    setOpenStyles(openStyles: boolean): void;
}

export default function ImportOrdersWrapper(props: Props){

    const { 
        openImportOrders, setOpenImportOrders,
        hasOpenImportOrders, setHasOpenImportOrders
    } = useContext(OrdersContext)

    const { wrapperStyles, headerStyles } = useWrapperStyles(props.openStyles)

    const [ findStores, setFindStores ] = useState<boolean>(false)
    const [ selectedStore, setSelectedStore ] = useState<Store | null>(null)
    const { data: storeList, isFetching, error } = useFetch<ListStoresResponse>('post', '/stores/list', findStores, {
        stores: { active: true }
    })


    const [ fetchOrders, setFetchOrders ] = useState<boolean>(false)
    const [ ordersParams, setOrdersParams ] = useState<ListTrayOrdersParams>({
        storeCode: 0,
        includeImported: true,
        page: 1,
        limit: 50,
    })

    const stores = storeList?.stores? storeList.stores : []

    useEffect(() => {

        if(!findStores && !hasOpenImportOrders){
            setFindStores(true)
            setHasOpenImportOrders(true)
        }

    }, [openImportOrders])

    useEffect(() => {

        if(stores.length > 0){
            setSelectedStore(stores[0])
        }

    }, [stores])

    useEffect(() => {
        if(selectedStore){
            setOrdersParams({
                ...ordersParams,
                storeCode: selectedStore.trayId,
            })
        }
    }, [selectedStore])

    useEffect(() => {

        if(ordersParams.storeCode == 0){
            return
        }

        if(!fetchOrders){
            setFetchOrders(true)
        } else {
            setFetchOrders(false)
            setTimeout(() => {
                setFetchOrders(true)
            }, 0)
        }

    }, [ordersParams])

    function setStore(name: string){
        stores?.map(store => {
            if(name == store.name){
                setSelectedStore(store)
            }
        })
    }

    if(openImportOrders || hasOpenImportOrders){
        return (
            <div
            className={styles.wrapper}
            id='wrapper'
            style={wrapperStyles}
            >
                <div
                className={styles.header}
                style={headerStyles}
                >
                    <div
                    className={styles.titleContainer}
                    >
                        <span 
                        className="material-icons-round"
                        id={styles.resume}
                        onClick={() => props.setOpenStyles(false)}
                        >
                            chevron_left
                        </span>
                        <h2
                        className={styles.title}
                        >
                            importar pedidos
                        </h2>
                    </div>
                    <div
                    className={styles.inputRow}
                    >
                        <DefaultSelectorInput
                        value={selectedStore?.name}
                        optionList={stores? stores.map(store => { return store?.name }) : []}
                        onChange={storeName => {
                            setStore(storeName as string)
                        }}
                        label='lojas'
                        width='100%'
                        maxWidth='16rem'
                        loading={isFetching}
                        hideSelectedOption={true}
                        increaseZIndex={2}
                        />
                        <DefaultSelectorInput
                        value={ordersParams.includeImported? 'todos' : 'não importados'}
                        optionList={['todos', 'não importados']}
                        onChange={value => {
                            const boolean = value == 'todos'? true : false
                            setOrdersParams({...ordersParams, includeImported: boolean})
                        }}
                        label='importar'
                        width='100%'
                        maxWidth='12rem'
                        hideSelectedOption={true}
                        />
                    </div>
                </div>
                <ImportOrdersList 
                ordersParams={ordersParams}
                fetchOrders={fetchOrders}
                setFetchOrder={setFetchOrders}
                />
            </div>
        )
    } else {
        return <></>
    }
}