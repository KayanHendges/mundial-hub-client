import { GetStaticProps } from 'next';
import { api } from '../services/api';

import styles from './home.module.scss';

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

type HomeProps = {
  products: Products[]
}

export default function Home(props: HomeProps) {

  
  return (
    <div className={styles.homepage}>
      <h1>{props.products[0].name}</h1>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('products', {
    params: {}
  })

  const products = data.map(product => {
    return {
      ean: product.ean,
      name: product.name,
      description: product.description,
      descriptionSmall: product.description_small,
      price: product.price,
      costPrice: product.cost_price,
      promotionPrice: product.promotion_price,
      startPromotion: product.start_promotion,
      endPromotion: product.end_promotion,
      brand: product.brand,
      model: product.model,
      weight: product.weight,
      lenght: product.lenght,
      widht: product.widht,
      height: product.height,
      stock: product.stock,
      categoryId: product.category_id,
      availability: product.availability,
      availabilityDays: product.availability_days,
      reference: product.reference,
      relatedCategories: product.related_categories,
      releaseDate: product.release_date,
      pictureSource1: product.picture_source_1,
      pictureSource2: product.picture_source_2,
      pictureSource3: product.picture_source_3,
      pictureSource4: product.picture_source_4,
      pictureSource5: product.picture_source_5,
      pictureSource6: product.picture_source_6,
      virtualProduct: product.virtual_product
    };
  })

  return {
    props: {
      products,
    },
    revalidate: 5,
  }
}
