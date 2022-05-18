import { useEffect, useState } from "react"
import { ImportItem } from "."
import ImportOrders from ".."
import { ListTrayOrdersParams, ListTrayOrdersResponse } from "../../../../../../services/api/types/Tray/Orders/Orders"
import { useFetch } from "../../../../../../services/api/useFetch"

type ImportList = {
    set(items: ImportItem[]): void;
}

export default function selectAll(ordersParams: ListTrayOrdersParams, list: ImportList, total: number){
    
    const [ selecting, setSelecting ] = useState<boolean>(false)

    const { data, isFetching, error } = useFetch<ListTrayOrdersResponse>('get', getPath(ordersParams, 1, total), selecting)

    useEffect(() => {
        if(error){
            list.set([])
            setSelecting(false)
        }
    }, [error])

    useEffect(() => {

        if(data){
            const orders = data?.orders
            const newList: ImportItem[] = []
            console.log(data)
            orders.map( order => {
                const trayId = parseInt(order.id)

                if(isNaN(trayId)){
                    return
                }
                
                newList.push({
                    trayId,
                    importing: null,
                    success: null
                })
            setSelecting(false)
            })

            list.set(newList)
        }
    }, [data])

    return { selecting, setSelecting }
    
    function getPath(params: ListTrayOrdersParams, page: number, limit: number): string{
        const { storeCode, includeImported } = params

        const path = `/tray/orders?store_code=${storeCode}&include_imported=${includeImported}&page=${page}&limit=${limit}`

        return path
    }
}