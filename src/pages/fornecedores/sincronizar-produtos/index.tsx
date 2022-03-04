import { parseCookies } from 'nookies'
import styles from './styles.module.scss'
import {api} from '../../../services/api'
import Head from 'next/head'

import Header from '../../../components/Fornecedores/SincronizarProdutos/Header'
import Container from '../../../components/Fornecedores/SincronizarProdutos/Container'
import { useState } from 'react'
import { GetServerSideProps } from 'next'

type Provider = {
    provider_id: number;
    provider_name: string;
}

type Props = {
    providersList: Provider[];
}

export default function SincronizarProdutos(props: Props){

    const [ providerState, setProviderState ] = useState<number>(0)

    return (
        <div
        className={styles.wrapper}
        >
            <Head>
                <title>Fornecedores | Sincronizar produtos</title>
            </Head>
            <Header 
            maxWidth="100%"
            href="/"
            strong="Fornecedores"
            title="Sincronizar produtos"
            providersList={props.providersList}
            providerState={{providerState, setProviderState}}
            />
            <Container 
            providerId={providerState}
            />
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

    const { ['mundialhub.token']: token } = parseCookies(ctx)

    if(!token){
        const { url } = ctx.req
        return {
            redirect: {
            destination: `/login?redirect=${url}`,
            permanent: false
            }
        }
    }

    return {
        props: {
            providersList: providersList
        }
    }
}