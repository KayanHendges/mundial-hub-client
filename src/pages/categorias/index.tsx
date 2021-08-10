import { GetStaticProps } from 'next';
import styles from './styles.module.scss'

import Link from 'next/link';
import { api } from '../../services/api2';

import Header from '../../components/Categorias/Header';
import CategoryList from '../../components/Categorias/CategoryList';

export default function categorias(props){
    return (
        <div
        className={styles.wrapper}
        >
            <Header 
            hrefBackButton="/"
            hrefButton="/categorias/nova-categoria"
            textButton="incluir categoria"
            />
            <CategoryList
            categories={props.categories}
            />
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    const { data } = await api.get('/categorias/arvore')

    return {
        props: {
            categories: data,
        },
    }
}