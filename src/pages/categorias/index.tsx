import { GetServerSideProps, GetStaticProps } from 'next';
import styles from './styles.module.scss'

import Header from '../../components/Categorias/Header';
import CategoryList from '../../components/Categorias/CategoryList';
import Head from 'next/head';

export default function categorias(props){
    return (
        <div
        className={styles.wrapper}
        >
            <Head>
                <title>Categorias</title>
            </Head>
            <Header 
            hrefBackButton="/"
            hrefButton="/categorias/nova-categoria"
            textButton="incluir categoria"
            />
            <CategoryList
            />
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
    return {
      props: {}
    }
  }