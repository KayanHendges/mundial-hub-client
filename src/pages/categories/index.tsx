import { GetStaticProps } from 'next';
import Link from 'next/link'
import { api } from '../../services/api';
import Head from 'next/head';

import styles from './styles.module.scss';

type Products = {
    ean: string;
    name: string;
    description: string;
    descriptionSmall: string;
    price: Number;
    costPrice: Number;
    promotionPrice: Number;
    startPromotion: string;
    endPromotion: string;
    brand: string;
    model: string;
    weight: Number;
    lenght: Number;
    widht: Number;
    height: Number;
    stock: Number;
    categoryId: string;
    availability: Number;
    availabilityDays: Number;
    reference: string;
    relatedCategories: string;
    releaseDate: string;
    pictureSource1: string;
    pictureSource2: string;
    pictureSource3: string;
    pictureSource4: string;
    pictureSource5: string;
    pictureSource6: string;
    virtualProduct: Number;
  }

type ProductProps = {
    products: Products[]
}

export default function categories (props){
      const data = props.data
      const categories = props.categories
      // console.log(data)
      // console.log(categories)
      return (
        <div>
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
        return null
      }
      else {
        return {
          name: category.name,
          categoryId: category.id,
          parentId: category.parent_id,
          children: category.children.map(children => {
            return childrenMap(children)
          })
        }
      }      
    }

    const categories = data.map(category => {
      return (
        childrenMap(category)
        // categoryId: category.id,
        // children: category.children.map(children => {
        //   return {
        //     id: children.id,
        //     parentId: children.parent_id,
        //     children: children.children            
        //   }
        // })
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
  