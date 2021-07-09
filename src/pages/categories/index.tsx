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
    const { data } = await api.get('categories2', {
      params: {
      }
    })

    function childrenMap (category) {
      if (category.children === null) {
        return {
          categoryId: category.id,
          parentId: category.parent_id,
          name: category.name,
          order: Number(category.order),
          hasProduct: Number(category.has_product),
          children: null
        }
      }
      else {
        return {
          categoryId: category.id,
          parentId: category.parent_id,
          name: category.name,
          order: Number(category.order),
          hasProduct: Number(category.has_product),
          children: category.children.map(children => {
            return childrenMap(children)
          })
        }
      }      
    }

    const categories = data.map(category => {
      return (
        childrenMap(category)
      )
    })
  
    return {
      props: {
        data,
        categories
      },
      revalidate: 5,
    }
  }
  