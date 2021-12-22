import { parseCookies } from 'nookies'
import styles from './styles.module.scss'
import {api} from '../../../services/api'

import Header from '../../../components/Fornecedores/Produtos/Header'
import { useEffect, useState } from 'react'
import Container from '../../../components/Fornecedores/Produtos/Container'
import router from 'next/router'

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
}

export default function Produtos(props: Props){

    const [ providerState, setProviderState ] = useState<number>(props.providerId)
    const [ search, setSearch ] = useState<string>('')
    const [ products, setProducts ] = useState<Products[]>([])
    const [ countProducts, setCountProducts ] = useState<number>(0)
    const [ loading, setLoading ] = useState<boolean>(false)

    return (
        <div
        className={styles.wrapper}
        >
            <Header 
            maxWidth="100%"
            href="/"
            strong="Fornecedores"
            title="Sincronizar produtos"
            providersList={props.providersList}
            providerState={{providerState, setProviderState}}
            search={{ search, setSearch }}
            products={{ products, setProducts }}
            countProducts={{ countProducts, setCountProducts }}
            loading={{ loading, setLoading }}
            />
            <Container 
            providerId={providerState}
            products={{ products, setProducts }}
            countProducts={{ countProducts, setCountProducts }}
            loading={{ loading, setLoading }}
            />
        </div>
    )
}

export const getServerSideProps = async (ctx) => {

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

    const { ['mundialhub.token']: token } = parseCookies(ctx)

    const providerId = ctx.query.provider_id

    if(!token){
        return {
            redirect: {
            destination: `/login`,
            permanent: false
            }
        }
    }

    return {
        props: {
            providersList: providersList,
            providerId: providerId != undefined ? providerId : 2
        }
    }
}