import { createContext, useEffect, useState } from "react";
import { ListOrdersParams, ListOrdersResponse } from "../../services/api/types/Orders/Orders";
import { useFetch } from "../../services/api/useFetch";

type OrdersContextType = {
    openImportOrders: boolean;
    setOpenImportOrders(openImportOrders: boolean): void;
    hasOpenImportOrders: boolean;
    setHasOpenImportOrders(hasOpenImportOrders: boolean): void;
    expandOrderId: number | null;
    setExpandOrderId(expandOrderId: number | null): void;
    ordersParams: ListOrdersParams;
    setOrdersParams(ordersParms: ListOrdersParams): void;
}

export const OrdersContext =  createContext({} as OrdersContextType)

export function OrdersProvider ({ children })  {

    const [ openImportOrders, setOpenImportOrders ] = useState<boolean>(false)
    const [ hasOpenImportOrders, setHasOpenImportOrders ] = useState<boolean>(false)
    const [ expandOrderId, setExpandOrderId ] = useState<number | null>(null)
    const [ ordersParams, setOrdersParams ] = useState<ListOrdersParams>({
        orders: {},
        paging: {
            page: 1,
            limit: 20
        },
        sort: {
            created: 'desc'
        }
    })

    return (
        <OrdersContext.Provider value={{
            openImportOrders,
            setOpenImportOrders,
            hasOpenImportOrders,
            setHasOpenImportOrders,
            expandOrderId,
            setExpandOrderId,
            ordersParams,
            setOrdersParams
        }}>
            {children}
        </OrdersContext.Provider>
    ) 
}