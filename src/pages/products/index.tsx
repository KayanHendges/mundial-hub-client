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
  
// props: ProductProps
export default function products (props: ProductProps){
      return (
        <div className={styles.ProductsContainer} >
          <Head>
            <title>Produtos</title>
          </Head>
          <div className={styles.ProductsContent}>
            <div className={styles.Title}>
              <h1>Produtos</h1>
              <button type="button" className={styles.RegisterProducts}>
                Cadastrar Produtos
              </button>
            </div>
            <div className={styles.FormsContainer}>
              <div className={styles.RowInput}>
                <div className={styles.FormItemId} >
                  <label>Refer.</label>
                  <input type="text" id="referId" name="referId" maxLength={4} />
                </div>
                <div className={styles.FormItemName} >
                  <label>Descrição</label>
                  <input type="text" id="nameProduct" name="nameProduct" maxLength={90} />
                </div>
              </div>
              <div className={styles.RowButton} >
                <button type="submit" className={styles.ClearFilter} >
                  Limpar Filtro
                </button>
                <button type="submit" className={styles.Filter} >
                  Filtrar
                </button>
              </div>
            </div>
            <div className={styles.ProductListContainer}>
              <div className={styles.ProductListHeader} >
                <div className={styles.CheckBoxHeader}>
                  <input type="checkbox" />
                </div>
                <div className={styles.IdHeader}>
                  <span>
                    Código
                  </span>
                </div>
                <div className={styles.ProductHeader}>
                  <span>
                    Produto
                  </span>
                </div>
                <div className={styles.PriceHeader}>
                  <span>
                    Preço
                  </span>
                </div>
                <div className={styles.StockHeader}>
                  <span>
                    Estoque
                  </span>
                </div>
                <div className={styles.ButtonHeader}>
                </div>
              </div>
              <div className={styles.ProductList}>
                {props.products.map((product) => {
                  return (
                    <div key={product.reference} className={styles.ProductContainer}>
                      <div className={styles.CheckBox}>
                        <input type="checkbox" />
                      </div>
                      <div className={styles.Id}>
                        <span>{product.reference}</span>
                      </div>
                      <div className={styles.Product}>
                        <img src={product.pictureSource1} alt="product-image" />
                        <span>{product.name}</span>
                      </div>
                      <div className={styles.Price}>
                        <span>R${product.price},00</span>
                      </div>
                      <div className={styles.Stock}>
                        <span>{product.stock}</span>
                      </div>
                      <div className={styles.Buttons}>
                        <Link href={`/products/${product.reference}`}>
                          <a>
                            <button type="button" >
                              Editar
                            </button>
                          </a>
                        </Link>
                        <button type="button" >
                          +
                        </button>
                      </div>
                    </div>
                  )
                })}

              </div>
            </div>
          </div>
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
  