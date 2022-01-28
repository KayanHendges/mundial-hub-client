import Head from 'next/head'
import { parseCookies } from 'nookies'
import styles from './styles.module.scss'
import Header from '../../../components/Produto/Cadastrar/Header/index'
import { NewProductContext, NewProductProvider } from '../../../contexts/NewProductContext'
import { useContext, useEffect, useState } from 'react'
import TabSelector from '../../../components/Produto/Cadastrar/TabSelector'
import Tabs from '../../../components/Produto/Cadastrar/Tabs'


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
            </div>
        </NewProductProvider>
    )

}

export const getServerSideProps = async (ctx) => {

    const { ['mundialhub.token']: token } = parseCookies(ctx)
    console.log('token', token)

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
        }
    }
}