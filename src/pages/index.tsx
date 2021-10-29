import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import { api } from '../services/api';
import styles from './home.module.scss';

export default function Home() {

  
  return (
    <div className={styles.homepage}>
      <Head>
        <title>Home</title>
      </Head>

      <h1>Home</h1>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
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