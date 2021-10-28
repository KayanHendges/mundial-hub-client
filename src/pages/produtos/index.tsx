import { GetStaticProps } from 'next';
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';

import HeaderProductList from '../../components/Produto/ProductList/HeaderProductList';
import SearchForm from '../../components/Produto/ProductList/SearchForm';
import ResultList from '../../components/Produto/ProductList/ResultList';
import Footer from '../../components/Produto/ProductList/Footer';
import Head from 'next/head';
import { parseCookies } from 'nookies';

export default function produtos(props){

    const [ search, setSearch ] = useState({
        searchInput: "",
        onChangeSearch: 0,
        perPage: 20,
        page: 1,
        showKits: 0,
    })

    const [ pages, setPages ] = useState({
        perPage: 20,
        pages: 1,
        page: 1,
        resultLength: 0
    })

    function setValue(chave, valor) {
        setSearch({
          ...search,
          [chave]: valor,
        })
      }

    function handleChange(e){
        setValue(
            e.target.getAttribute('name'),
            e.target.value
        )
    }

    function sendSearch(){
        setPages({
            ...pages,
            perPage: pages.perPage,
            page: 1
        })
        setSearch({
            ...search,
            onChangeSearch: (search.onChangeSearch+1),
            page: 1,
            perPage: pages.perPage,
            showKits: booleanToNumber(search.showKits)
        })
    }

    function booleanToNumber(boolean){
        if(boolean){
            return 1
        } else {
            return 0
        }
    }
    
    return (
        <div
        className={styles.wrapper}
        >
            <div
            className={styles.container}
            >
                <Head>
                    <title>Produtos</title>
                </Head>
                <HeaderProductList 
                hrefButton="/produtos/novo-produto"
                textButton="incluir produto"
                />
                <SearchForm
                setValue={setValue}
                search={search}
                setSearch={setSearch}
                onChange={handleChange}
                sendSearch={sendSearch}
                pages={pages}
                setPages={setPages}
                />
                <ResultList
                pages={pages}
                setPages={setPages}
                search={search}
                />
            </div>
            <Footer 
            search={search}
            setSearch={setSearch}
            pages={pages}
            setPages={setPages}
            />
        </div>
    )
}

export const getStaticProps: GetStaticProps = async (ctx) => {

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
        props: {}
    }
}