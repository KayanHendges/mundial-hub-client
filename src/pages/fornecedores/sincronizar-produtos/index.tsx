import { parseCookies } from 'nookies'
import styles from './styles.module.scss'
import {api} from '../../../services/api'

import Header from '../../../components/Fornecedores/SincronizarProdutos/Header'
import Container from '../../../components/Fornecedores/SincronizarProdutos/Container'

type Provider = {
    provider_id: number;
    provider_name: string;
}

type Props = {
    providersList: Provider[];
}

export default function SincronizarProdutos(props: Props){
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
            />
            <Container />
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

    if(!token){
        return {
            redirect: {
            destination: '/login',
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