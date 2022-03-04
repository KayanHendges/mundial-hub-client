import Head from 'next/head'
import { parseCookies } from 'nookies'
import styles from './styles.module.scss'
import Header from '../../../components/Produto/Cadastrar/Header/index'
import { NewProductContext, NewProductProvider } from '../../../contexts/NewProductContext'
import { useContext, useEffect, useState } from 'react'
import TabSelector from '../../../components/Produto/Cadastrar/TabSelector'
import Tabs from '../../../components/Produto/Cadastrar/Tabs'
import { GetServerSideProps } from 'next'
import { AuthContext } from '../../../contexts/AuthContext'
import OffersPopUp from '../../../components/Produto/Cadastrar/OffersPopUp'


export default function Cadastrar(props){

    return (
        <NewProductProvider>
            <div
            className={styles.wrapper}
            >
                <Head>
                    <title>Cadastro</title>
                </Head>
                <Header
                textButton='cadastrar produto'
                strong='Cadastrar novo produto'
                title="Edite as informações do produto"
                href="/produtos"
                maxWidth='100rem'
                />
                <TabSelector />
                <Tabs />
                <OffersPopUp />
            </div>
        </NewProductProvider>
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
     
    return {
        props: {
        }
    }
}