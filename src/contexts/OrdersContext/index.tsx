import { createContext, useEffect, useState } from "react";

type OrdersContextType = {
    openImportOrders: boolean;
    setOpenImportOrders(openImportOrders: boolean): void;
    hasOpenImportOrders: boolean;
    setHasOpenImportOrders(hasOpenImportOrders: boolean): void;
}

export const OrdersContext =  createContext({} as OrdersContextType)

export function OrdersProvider ({ children })  {

    const [ openImportOrders, setOpenImportOrders ] = useState<boolean>(false)
    const [ hasOpenImportOrders, setHasOpenImportOrders ] = useState<boolean>(false)

    return (
        <OrdersContext.Provider value={{
            openImportOrders,
            setOpenImportOrders,
            hasOpenImportOrders,
            setHasOpenImportOrders
        }}>
            {children}
        </OrdersContext.Provider>
    ) 
}