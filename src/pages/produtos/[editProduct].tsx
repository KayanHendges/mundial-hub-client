import { GetServerSideProps } from 'next';
import Head from 'next/head';
import router, { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import { useEffect } from 'react';
import Header from '../../components/Produto/Edit/Header';
import OffersPopUp from '../../components/Produto/Edit/OffersPopUp';
import Tabs from '../../components/Produto/Edit/Tabs';
import TabSelector from '../../components/Produto/Edit/TabSelector';
import { ProductProvider } from '../../contexts/ProductContext';
import styles from './editProduct.module.scss'

type Props = {
    reference: string
    tab: number
}

export default function editProduct(props: Props){
    
    useEffect(() => {
        router.push(`/produtos/${props.reference}`)
    }, [])

    return (
        <ProductProvider>
            <div
            className={styles.wrapper}
            >
                <Head>
                    <title>Editar | {props.reference}</title>
                </Head>
                <Header
                textButton='cadastrar produto'
                title="Edite as informações do produto"
                href="/produtos"
                maxWidth='100rem'
                />
                <TabSelector tab={props.tab}/>
                <Tabs />
                <OffersPopUp />
            </div>
        </ProductProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

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

    const id = ctx.params.editProduct
    
    const indexTabs = ['0', '1', '2', '3', '4']
    const queryTab = typeof(ctx.query.tab) == 'string'? ctx.query.tab : '0'
    const tab = indexTabs.includes(queryTab)? parseInt(queryTab) : 0
     
    return {
        props: {
            reference: id,
            tab
        }
    }
}