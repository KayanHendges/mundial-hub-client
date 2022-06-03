import { parseCookies } from 'nookies'
import styles from './styles.module.scss'
import {api} from '../../../services/api'

import Header from '../../../components/Fornecedores/Produtos/Header'
import { useEffect, useState } from 'react'
import Container from '../../../components/Fornecedores/Produtos/Container'
import router from 'next/router'
import { format, parseISO, differenceInSeconds} from 'date-fns'
import Head from 'next/head'
import { GetServerSideProps } from 'next'

type Products = {
    providerReference: number,
    reference: string,
    productName: string,
    stock: number;
    cost: number,
    additionalCost: string,
    totalCost: number;
}

type Provider = {
    provider_id: number;
    provider_name: string;
}

type Props = {
    providersList: Provider[];
    providerId: number;
    search: string;
}

export default function Produtos(props: Props){

    const [ providerState, setProviderState ] = useState<number>(props.providerId)
    const [ param, setParam ] = useState({
        collum: '',
        order: ''
    })
    const [ search, setSearch ] = useState<string>(props.search)
    const [ products, setProducts ] = useState<Products[]>([])
    const [ countProducts, setCountProducts ] = useState<number>(0)
    const [ lastUpdate, setLastUpdate ] = useState<string>('0000-00-00 00:00:00')
    const [ loading, setLoading ] = useState<boolean>(false)

    useEffect(() => {
        console.log(search)
        router.push(`/fornecedores/produtos?provider_id=${providerState}${search.length > 0 ? '&search=' : ''}${search.length > 0 ? search : ''}`)
    }, [providerState, search])

    function lastUpdateCalc(stringDate: string): string{
        if(stringDate == '0000-00-00 00:00:00'){
            return ''
        }
        
        const datetime = new Date()
        const lastUpdate = parseISO(stringDate)

        const seconds = differenceInSeconds(datetime, lastUpdate)

        if(seconds > (60*60*24*30*12) - 1){ // anos
            const year = Math.trunc(seconds/60/60/24/30/12)
            return `${year} ${year > 1 ? 'anos' : 'ano'}`
        }

        if(seconds > (60*60*24*30) - 1){ // meses
            const month = Math.trunc(seconds/60/60/24/30)
            return `${month} ${month > 1 ? 'meses' : 'meses'}`
        }
        
        if(seconds > (60*60*24*7) - 1){ // semanas
            const week = Math.trunc(seconds/60/60/24/7)
            return `${week} ${week > 1 ? 'semanas' : 'semana'}`
        }

        if(seconds > (60*60*24) - 1){ // dias
            const day = Math.trunc(seconds/60/60/24)
            return `${day} ${day > 1 ? 'dias' : 'dia'}`
        }
        
        if(seconds > (60*60) - 1){ // minutos
            const hour = Math.trunc(seconds/60/60)
            return `${hour} ${hour > 1 ? 'horas' : 'hora'}`
        }

        if(seconds > 60 - 1){ // segundos
            const minute = Math.trunc(seconds/60)
            return `${minute} ${minute > 1 ? 'minutos' : 'minuto'}`
        }

        return `${seconds} ${seconds > 1 ? 'segundos' : 'segundo'}`

    }

    return (
        <div
        className={styles.wrapper}
        >
            <Head>
                <title>Fornecedores | Produtos</title>
            </Head>
            <Header 
            maxWidth="100%"
            href="/"
            strong="Fornecedores"
            title="Todos os produtos por fornecedor"
            providersList={props.providersList}
            providerState={{providerState, setProviderState}}
            search={{ search, setSearch }}
            param={{ param, setParam }}
            products={{ products, setProducts }}
            countProducts={{ countProducts, setCountProducts }}
            lastUpdate={{ lastUpdate, setLastUpdate }}
            loading={{ loading, setLoading }}
            />
            <Container 
            providerId={providerState}
            products={{ products, setProducts }}
            countProducts={{ countProducts, setCountProducts }}
            param={{ param, setParam }}
            loading={{ loading, setLoading }}
            />
            <div
            className={styles.countContainer}
            style={{ 
                display: `${(countProducts > 0  || lastUpdate != '0000-00-00 00:00:00') || loading ? 'flex' : 'none' }`,
            }}
            >
                <span
                style={{ display: `${countProducts > 0 && !loading ? 'flex' : 'none' }`}}
                >
                    {`${countProducts} resultados`}
                </span>
                <span
                style={{ display: `${countProducts > 0  && lastUpdate != '0000-00-00 00:00:00' && !loading ? 'flex' : 'none' }`}}
                >
                    |
                </span>
                <span
                style={{ display: `${lastUpdate == '0000-00-00 00:00:00' || loading ? 'none' : 'flex'}` }}
                >
                    {`ultima atualização há ${lastUpdateCalc(lastUpdate)}`}
                </span>
                <div 
                className={styles.loader}
                style={{ display: `${loading ? 'flex' : 'none'}`}}
                >
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const providersList = await api.get('/providers/list')
    .then(response => {
        if(response.data.code == 200){
            return response.data.providers_list
        } else {
            return []
        }
    })
    .catch(erro => {
        console.log(erro.response.data)
        return []
    })

    const providerId = ctx.query.provider_id
    const search = ctx.query.search

    return {
        props: {
            providersList: providersList,
            providerId: providerId != undefined ? providerId : 2,
            search: search != undefined ? search : ''
        }
    }
}