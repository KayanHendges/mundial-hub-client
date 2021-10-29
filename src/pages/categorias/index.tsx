import { GetStaticProps } from 'next';
import styles from './styles.module.scss'

import Header from '../../components/Categorias/Header';
import CategoryList from '../../components/Categorias/CategoryList';
import Head from 'next/head';
import { parseCookies } from 'nookies';

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

export const getServerSideProps = async (ctx) => {
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