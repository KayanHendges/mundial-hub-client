import Head from 'next/head'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'
import styles from './style.module.scss'
import { api } from '../../../services/api2'
import { GetStaticProps } from 'next'

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
    availability: String;
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

export default function product() {
    const router = useRouter()

    const [ name, setName] = useState("")
    const [ description, setDescription] = useState("")
    const [ categoryId, setCategoryId] = useState("")
    const [ costPrice, setCostPrice ] = useState("")
    const [ price, setPrice ] = useState("")
    const [ promotionPrice, setPromotionPrice] = useState("")
    const [ startPromotion, setStartPromotion ] = useState("")
    const [ endPromotion, setEndPromotion ] = useState("")
    const [ imageSource, setImageSource ] = useState([
        "",
        "",
        "",
        "",
        "",
        "",
    ])
    const [ stock, setStock ] = useState("")
    const [ weight, setWeight ] = useState("")
    const [ lenght, setLenght ] = useState("")
    const [ widht, setWidht ] = useState("")
    const [ height, setHeight ] = useState("")
    const [ reference, setReference ] = useState("")
    const [ ean, setEan ] = useState("")
    const [ brand, setBrand ] = useState("")
    const [ model, setModel ] = useState("")
    const [ availability, setAvailability ] = useState("")
    const [ availabilityDays, setAvailabilityDays ] = useState("")

    // function setImageSourceValue(position: number, value: string) {
    //   let updatedImageSource = []
    //   imageSource.map((imageUrl, index) => {
    //     if (index === position) {
    //       if (index > 0)
    //       updatedImageSource.push(value)
    //     }
    //     else {
    //       updatedImageSource.push((imageUrl))
    //     }
    //   })      
    //   setImageSource(updatedImageSource)
    // }

    let selectOptions = []
    for (let i = 0; i <= 120; i++){
      selectOptions.push(<option value={i}>{i} dias</option> )
    }

    function handleChangeProduct(e: FormEvent) {
      e.preventDefault();

      console.log(e)
      console.log(name)
      console.log(startPromotion)

      api.post('/produtos', {
          is_kit: 0,
          name,
          price: 10,
          stock: 1
      }).then(() => {
        alert('Produto Salvo com sucesso')

        router.push('/products')
      }).catch((error) => {
        alert(error)
      })

    //    api.post(`produtos/`, {
    //      is_kit: 0,
    //      name,
    //      description,
    //      cost_price: Number(costPrice),
    //      price: Number(price),
    //      promotion_price: Number(promotionPrice),
    //      start_promotion: String(startPromotion),
    //      end_promotion: String(endPromotion),
    //      picture_source_1: String(imageSource[0]),
    //      picture_source_2: String(imageSource[1]),
    //      picture_source_3: String(imageSource[2]),
    //      picture_source_4: String(imageSource[3]),
    //      picture_source_5: String(imageSource[4]),
    //      picture_source_6: String(imageSource[5]),
    //      stock,
    //      weight,
    //      height,
    //      widht,
    //      lenght,
    //      reference,
    //      brand,
    //      model,
    //      availability,
    //      availability_days: Number(availabilityDays),
    //      metatag: [{
    //        type: "",
    //        content: "",
    //        local: 0
    //      }],
    //      virtual_product: 0,
    //    }).then(() => {
    //      alert('Produto Salvo com sucesso')

    //      router.push('/products')
    //    }).catch((error) => {
    //      alert(error)
    //    })
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
            <title>Cadastrar Produto</title>
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
                <div className={styles.defaultRowInput}>
                  <div className={styles.defaultInputContainer}>
                    <label>Marca</label>
                    <input 
                    type="text"
                    value={brand}
                    onChange={(e) => { setBrand(e.target.value) }}
                    />
                  </div>
                  <div className={styles.defaultInputContainer}>
                    <label>Modelo</label>
                    <input 
                    type="text"
                    value={model}
                    onChange={(e) => { setModel(e.target.value) }}
                    />
                  </div>
                </div>
                <div className={styles.shortInputContainer}>
                  <div className={styles.defaultInputContainer}>
                    <label>Referencia</label>
                    <input 
                    type="text"
                    onKeyPress={(e) => { onlynumber(e) }}
                    value={reference}
                    onChange={(e) => { setReference(e.target.value) }}
                    />
                  </div>
                  <div className={styles.defaultInputContainer}>
                    <label>Ean</label>
                    <input 
                    type="text"
                    onKeyPress={(e) => { onlynumber(e) }}
                    value={ean}
                    onChange={(e) => { setEan(e.target.value) }}
                    />
                  </div>
                </div>
                <div className={styles.imageContainer}>
                  <h3>Imagem do Produto</h3>
                  {/* <div className={styles.imageGallery}>
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
                  </div> */}
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
                      {/* {product.relatedCategories.map((category, index) => {
                        return (
                          <div key={index} className={styles.relatedCategoryContainer}>
                            <span>{category}</span>
                            <button type="button" className={styles.removeButton}>Remover</button>
                          </div>
                        )
                      })} */}
                    </div>
                  </div>
                  <span>Buscar Categorias</span>
                  <div className={styles.searchCategoryList}> 
                    <div className={styles.wrapperList} >
                      {/* {product.relatedCategories.map((category, index) => {
                        return (
                          <div key={index} className={styles.relatedCategoryContainer}>
                            <span>{category}</span>
                            <button type="button" className={styles.addButton}>Adicionar</button>
                          </div>
                        )
                      })} */}
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
                    <button type="button">...</button>
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
                    <div className={styles.stockInputContainer}>
                      <label>Estoque atual</label>
                      <input
                      type="text"
                      onKeyPress={(e) => { onlynumber(e) }}
                      value={Number(stock)}
                      onChange={(e) => { setStock(Number(e.target.value)) }}
                      />
                    </div>
                    <div className={styles.providerStock}>
                      <img src="/logo-retangular-fundo-branco.png" alt="provider-icon" />
                      <span>10</span>
                    </div>
                  <button type="button">...</button>
                  </div>
                </div>                
                <div className={styles.sizeContainer}>
                  <h2>Peso e dimensões</h2>
                  <div className={styles.rowSize}>
                    <div className={styles.sizeInputContainer}>
                      <label>Peso</label>
                      <div>
                        <input 
                        type="text"
                        onKeyPress={(e) => { onlynumber(e) }}
                        value={Number(weight)}
                        onChange={(e) => { setWeight(Number(e.target.value)) }}
                        />
                        <span>gramas</span>
                      </div>
                    </div>
                    <div className={styles.sizeInputContainer}>
                      <label>Altura</label>
                      <div>
                        <input 
                        type="text"
                        onKeyPress={(e) => { onlynumber(e) }}
                        value={Number(height)}
                        onChange={(e) => { setHeight(Number(e.target.value)) }}
                        />
                        <span>cm</span>
                      </div>
                    </div>
                    <div className={styles.sizeInputContainer}>
                      <label>Largura</label>
                      <div>
                        <input 
                        type="text"
                        onKeyPress={(e) => { onlynumber(e) }}
                        value={Number(widht)}
                        onChange={(e) => { setWidht(Number(e.target.value)) }}
                        />
                        <span>cm</span>
                      </div>
                    </div>
                    <div className={styles.sizeInputContainer}>
                      <label>Comprimento</label>
                      <div>
                        <input 
                        type="text"
                        onKeyPress={(e) => { onlynumber(e) }}
                        value={Number(lenght)}
                        onChange={(e) => { setLenght(Number(e.target.value)) }}
                        />
                        <span>cm</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.otherContainer}>
                  <h2>Outras informações</h2>
                  <div className={styles.defaultRowInput}>
                    <div className={styles.defaultInputContainer}>
                      <label>Disponibilidade</label>
                      <input 
                      type="text"
                      value={String(availability)}
                      onChange={(e) => { setAvailability(e.target.value) }}
                      />
                    </div>
                    <div className={styles.defaultInputContainer}>
                      <label>Prazo de disponibilidade</label>
                      <select
                      value={Number(availabilityDays)}
                      onChange={(e) => { setAvailabilityDays(Number(e.target.value)) }}
                      >
                        {selectOptions.map((option) => option)}
                      </select>
                    </div>
                  </div>
                </div>
                <button type="submit" className={styles.submitButton}>
                  Salvar Alterações
                </button>
              </div>
            </form>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const {data} = await api.get('produtos/')

    console.log(data)

    return {
        props: {
            empty: ""
        }
    }
}
