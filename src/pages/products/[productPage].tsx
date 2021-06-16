import { GetStaticPaths, GetStaticProps } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import { api } from '../../services/api'
import styles from './productPage.module.scss'

type Product = {
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
    relatedCategories: Array<number>;
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
    product: Product
}

export default function product({ product }: ProductProps) {
    const router = useRouter()

    const [ name, setName] = useState(product.name)
    const [ description, setDescription] = useState(product.description)
    const [ categoryId, setCategoryId] = useState(product.categoryId)
    const [ costPrice, setCostPrice ] = useState<Number>(product.costPrice)

    function handleChangeProduct(e: FormEvent) {
      e.preventDefault();

      console.log(e)
      console.log(name)

      api.patch(`/products/${product.reference}`, {
        name,
        description,
      }).then(() => {
        alert('Produto Salvo com sucesso')

        router.push('/products')
      }).catch(() => {
        alert('Erro no cadastro')
      })
    }

    function onlynumber(evt) {
      var theEvent = evt || window.event;
      var key = theEvent.keyCode || theEvent.which;
      key = String.fromCharCode( key );
      //var regex = /^[0-9.,]+$/;
      var regex = /^[0-9.]+$/;
      if( !regex.test(key) ) {
         theEvent.returnValue = false;
         if(theEvent.preventDefault) theEvent.preventDefault();
      }
   }

    return (
        <div className={styles.Wrapper}>
          <Head>
            <title>{product.name}</title>
          </Head>
            <form onSubmit={handleChangeProduct} className={styles.formContainer}>
              <div className={styles.productContainer}>
                <h1>Produto</h1>
                <div className={styles.defaultInputContainer} >
                  <label>Nome do Produto</label>
                  <input 
                  type="text" 
                  className={styles.defaultInput} 
                  value={name}
                  onChange={(e) => { setName(e.target.value) }}
                  />
                </div>
                <div className={styles.defaultInputContainer} >
                  <label>Descrição do Produto</label>
                  <textarea
                  rows={1}
                  className={styles.textArea} 
                  value={description}
                  onChange={(e) => { setDescription(e.target.value) }}
                  />
                </div>
                <div className={styles.categoryContainer}>
                  <span>Categoria Principal</span>
                  <input 
                  type="text"
                  className={styles.defaultInput}
                  value={categoryId}
                  onChange={(e) => { setName(e.target.value) }}
                  />
                  <span>Categorias Relacionadas</span>
                  <div className={styles.relatedCategoryList}>
                    <div className={styles.wrapperList} >
                      {product.relatedCategories.map((category, index) => {
                        return (
                          <div key={index} className={styles.relatedCategoryContainer}>
                            <span>{category}</span>
                            <button type="button" className={styles.removeButton}>Remover</button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <span>Buscar Categorias</span>
                  <div className={styles.searchCategoryList}> 
                    <div className={styles.wrapperList} >
                      {product.relatedCategories.map((category, index) => {
                        return (
                          <div key={index} className={styles.relatedCategoryContainer}>
                            <span>{category}</span>
                            <button type="button" className={styles.addButton}>Adicionar</button>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div className={styles.priceContainer}>
                      <div className={styles.costRow}>
                        
                        <div className={styles.defaultInputContainer}>
                          <label>Custo</label>
                          <input 
                          type="text"
                          onKeyPress={(e) => { onlynumber(e) }}
                          value={costPrice}
                          onChange={(e) => { setCostPrice(e.target.value) }}
                          />
                        </div>
                        <div className={styles.defaultInputContainer}>
                          <label>Lucro(%)</label>
                          <input 
                          type="text"
                          onKeyPress={(e) => { onlynumber(e) }}
                          />
                        </div>
                        <div className={styles.defaultInputContainer}>
                          <label>Fornecedores</label>
                          <input 
                          type="text"
                          />
                        </div>
                        <button type="button" className={styles.showProviders}>...</button>
                      </div>
                  </div>
                <button type="submit">
                  Salvar
                </button>
              </div>
            </form>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { productPage } = ctx.params;
    
    const { data } = await api.get('products', {
      params: {
          reference: `${productPage}`
      }
    })
  
    const product = {
        ean: data[0].ean,
        name: data[0].name,
        description: data[0].description,
        descriptionSmall: data[0].description_small,
        price: data[0].price,
        costPrice: data[0].cost_price,
        promotionPrice: data[0].promotion_price,
        startPromotion: data[0].start_promotion,
        endPromotion: data[0].end_promotion,
        brand: data[0].brand,
        model: data[0].model,
        weight: data[0].weight,
        lenght: data[0].lenght,
        widht: data[0].widht,
        height: data[0].height,
        stock: data[0].stock,
        categoryId: data[0].category_id,
        availability: data[0].availability,
        availabilityDays: data[0].availability_days,
        reference: data[0].reference,
        relatedCategories: data[0].related_categories,
        releaseDate: data[0].release_date,
        pictureSource1: data[0].picture_source_1,
        pictureSource2: data[0].picture_source_2,
        pictureSource3: data[0].picture_source_3,
        pictureSource4: data[0].picture_source_4,
        pictureSource5: data[0].picture_source_5,
        pictureSource6: data[0].picture_source_6,
        virtualProduct: data[0].virtual_product
      }
  
    return {
      props: {
        product,
      },
      revalidate: 5,
    }
  }
  