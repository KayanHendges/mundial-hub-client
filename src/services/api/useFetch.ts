import axios, { AxiosRequestConfig } from "axios"
import { useEffect, useState } from "react"
import { apiV2 } from "./apiAxiosConfig"

type Method = null | 'get' | 'post' | 'put' | 'delete'  

export function useFetch<T = unknown>(method: Method, path: string, execute: boolean, body?: any){

    const [ data, setData ] = useState<T | null>(null)
    const [ isFetching, setIsFetching ] = useState<boolean>(false)
    const [ error, setError ] = useState<Error | null>(null)

    useEffect(() => {

        if(!execute){
            setIsFetching(false)
            return
        }

        setIsFetching(true)

        const config: AxiosRequestConfig = {
            method,
            url: path,
            data: body
        }

        apiV2(config)
        .then(response => {

            if(response.data){

                setData(response.data)
                
            } else {
                setError(new Error('no response data'))
            }
        })
        .catch(err => {
            setError(err)
        })
        .finally(() => {
            setIsFetching(false)
        })

    }, [execute])

    return { data, isFetching, error }
}