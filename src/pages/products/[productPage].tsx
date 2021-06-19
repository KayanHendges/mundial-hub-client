import { url } from 'inspector'
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
    const [ costPrice, setCostPrice ] = useState(product.costPrice)
    const [ price, setPrice ] = useState(product.price)
    const [ promotionPrice, setPromotionPrice] = useState(product.promotionPrice)
    const [ startPromotion, setStartPromotion ] = useState(product.startPromotion)
    const [ endPromotion, setEndPromotion ] = useState(product.endPromotion)
    const [ imageSource, setImageSource ] = useState([
        product.pictureSource1,
        product.pictureSource2,
        product.pictureSource3,
        product.pictureSource4,
        product.pictureSource5,
        product.pictureSource6,
    ])

    function setImageSourceValue(position: number, value: string) {
      let updatedImageSource = []
      imageSource.map((imageUrl, index) => {
        if (index === position) {
          if (index > 0)
          updatedImageSource.push(value)
        }
        else {
          updatedImageSource.push((imageUrl))
        }
      })      
      setImageSource(updatedImageSource)
    }



    function handleChangeProduct(e: FormEvent) {
      e.preventDefault();

      console.log(e)
      console.log(name)
      console.log(startPromotion)

      api.patch(`/products/${product.reference}`, {
        name,
        description,
        cost_price: Number(costPrice),
        price: Number(price),
        promotion_price: Number(promotionPrice),
        start_promotion: String(startPromotion),
        end_promotion: String(endPromotion),
        picture_source_1: String(imageSource[0]),
        picture_source_2: String(imageSource[1]),
        picture_source_3: String(imageSource[2]),
        picture_source_4: String(imageSource[3]),
        picture_source_5: String(imageSource[4]),
        picture_source_6: String(imageSource[5]),
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
                <div className={styles.imageContainer}>
                  <h3>Imagem do Produto</h3>
                  <div className={styles.imageGallery}>
                      {imageSource.map((imageUrl, index) => {
                        if (imageUrl.length > 0) {
                          return (
                            <div className={styles.imageInputArea} key={index}>
                              <div className={styles.imageArea}>
                                <img src={imageUrl} alt="Erro" />
                              </div>
                              <div className={styles.defaultInputContainer}>
                                <input
                                value={imageSource[index]}
                                onChange={(e) => setImageSourceValue(index, e.target.value)}
                                />
                              </div>
                            </div>
                          )
                        }

                        if (imageUrl.length === 0) {
                          return (
                            <div className={styles.addImageSource} key={index}>
                              <div className={styles.imageArea}>
                                <button type="button" className={styles.addImageButton}>+</button>
                              </div>
                              <div className={styles.defaultInputContainer}>
                                <input
                                value={imageSource[index]}
                                onChange={(e) => setImageSourceValue(index, e.target.value)}
                                />
                              </div>
                            </div>
                          )
                        }                        
                      })}
                  </div>
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
                      value={Number(costPrice)}
                      onChange={(e) => { setCostPrice(Number(e.target.value)) }}
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
                  <div className={styles.priceRow}>
                    <div className={styles.defaultInputContainer}>
                      <label>Preço de Venda</label>
                      <input 
                      type="text"
                      onKeyPress={(e) => { onlynumber(e) }}
                      value={Number(price)}
                      onChange={(e) => { setPrice(Number(e.target.value)) }}
                      />
                    </div>
                    <div className={styles.defaultInputContainer}>
                      <label>Valor da Promoção</label>
                      <input 
                      type="text"
                      onKeyPress={(e) => { onlynumber(e) }}
                      value={Number(promotionPrice)}
                      onChange={(e) => { setPromotionPrice(Number(e.target.value)) }}
                      />
                    </div>
                    <div className={styles.defaultInputContainer}>
                      <label>Início</label>
                      <input 
                      type="date" 
                      value={startPromotion}
                      onChange={(e) => { setStartPromotion(e.target.value) }}
                      />
                    </div>
                    <div className={styles.defaultInputContainer}>
                      <label>Fim</label>
                      <input 
                      type="date" 
                      value={endPromotion}
                      onChange={(e) => { setEndPromotion(e.target.value) }}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.stockContainer}>
                  <h2>Estoque</h2>
                  <div className={styles.stockRow}>
                    <div className={styles.defaultInputContainer}>
                      <label>Estoque atual</label>
                      <input
                      type="text"
                      onKeyPress={(e) => { onlynumber(e) }}
                      value={Number(costPrice)}
                      onChange={(e) => { setCostPrice(Number(e.target.value)) }}
                      />
                    </div>
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
    
    const { data } = await api.get(`products/${productPage}`)
  
    const product = {
        ean: data.ean,
        name: data.name,
        description: data.description,
        descriptionSmall: data.description_small,
        price: data.price,
        costPrice: data.cost_price,
        promotionPrice: data.promotion_price,
        startPromotion: data.start_promotion,
        endPromotion: data.end_promotion,
        brand: data.brand,
        model: data.model,
        weight: data.weight,
        lenght: data.lenght,
        widht: data.widht,
        height: data.height,
        stock: data.stock,
        categoryId: data.category_id,
        availability: data.availability,
        availabilityDays: data.availability_days,
        reference: data.reference,
        relatedCategories: data.related_categories,
        releaseDate: data.release_date,
        pictureSource1: data.picture_source_1,
        pictureSource2: data.picture_source_2,
        pictureSource3: data.picture_source_3,
        pictureSource4: data.picture_source_4,
        pictureSource5: data.picture_source_5,
        pictureSource6: data.picture_source_6,
        virtualProduct: data.virtual_product
      }
  
    return {
      props: {
        product,
      },
      revalidate: 5,
    }
  }
  