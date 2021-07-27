import { GetStaticProps } from 'next';
import Link from 'next/link'
import { api } from '../../services/api';
import Head from 'next/head';

import styles from './styles.module.scss';

type Categories = {
  categoryId: string;
  parentId: string;
  name: string;
  order: number;
  hasProduct: number;
  children: Array<object>;
  }

type CategoryProps = {
    categories: Categories[]
}

export default function categories (props: CategoryProps){
      
      return (
        <div>
          <Head>
            <title>Categorias</title>
          </Head>
          <h1></h1>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    return {
      props: {
        
      },
      revalidate: 5,
    }
  }
  