import { useEffect } from "react"
import { ListStoresParams, ListStoresResponse } from "./types/Store/Stores"
import { ListTrayOrdersParams, ListTrayOrdersResponse } from "./types/Tray/Orders/Orders"
import { useFetch } from "./useFetch"

type ApiFunctions = 
    | ''
    | 'ListStores'
    | 'ListTrayOrders'

type ApiParams<T> = 
    T extends 'ListStores' ? ListStoresParams:
    T extends 'ListTrayOrders' ? ListTrayOrdersParams :
    never

type dataResponse<T> = 
    T extends '' ? null:
    T extends 'ListStores' ? ListStoresResponse :
    T extends 'ListTrayOrders' ? ListTrayOrdersResponse :
    never

export function apiV2(apiFunction: ApiFunctions, params: ApiParams<ApiFunctions>): {
        data: dataResponse<ApiFunctions>,
        isFetching: boolean,
        error: Error | null
    }{

    if(apiFunction == 'ListStores'){
    
        const body = params as ListStoresParams
        const path = `/stores/list`

        const { data, isFetching, error } = useFetch<dataResponse<ApiFunctions>>('get', path, true, body)
        return { data, isFetching, error }
    }

    if(apiFunction == 'ListTrayOrders'){
        
        const { storeCode, page, limit } = params as ListTrayOrdersParams
        const path = `/tray/orders?store_code=${storeCode}&page=${page}&limit=${limit}`

        const { data, isFetching, error } = useFetch<dataResponse<ApiFunctions>>('get', path, true)
        return { data, isFetching, error }
    }

    if(apiFunction = ''){
        return { data: null, isFetching: false, error: null }
    }

}