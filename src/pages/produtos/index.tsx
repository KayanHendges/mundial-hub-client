import { GetStaticProps } from 'next';
import Link from 'next/link';
import styles from './styles.module.scss'
import { api } from '../../services/api';
import { useState } from 'react';

import HeaderProductList from '../../components/Produto/ProductList/HeaderProductList';
import SearchForm from '../../components/Produto/ProductList/SearchForm';
import ResultList from '../../components/Produto/ProductList/ResultList';

export default function produtos(props){

    const [ search, setSearch ] = useState({
        searchInput: ""
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

    return (
        <div
        className={styles.wrapper}
        >
            <HeaderProductList 
            hrefButton="/produtos/novo-produto"
            textButton="incluir produto"
            />
            <SearchForm
            search={search}
            onChange={handleChange}
            />
            <ResultList
            resultados={props.produtos}
            />
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    const { data } = await api.get('produtos')

    const produtos = data.map(produto => {
        return {
            hubId: produto.hub_id,
            reference: produto.reference,
            name: produto.product_name,
            imageUrl: produto.picture_source_1,
            stock: produto.stock,
            price: produto.price.toFixed(2).replace(".", ","),
            promotionalPrice: produto.promotional_price.toFixed(2).replace(".", ","),
            startPromotion: produto.start_promotion,
            endPromotion: produto.end_promotion,
        }
    })

    return {
        props: {
            produtos: produtos
        }
    }
}