import { GetServerSideProps } from 'next';
import Head from 'next/head';
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

  return {
    props: {}
  }
}