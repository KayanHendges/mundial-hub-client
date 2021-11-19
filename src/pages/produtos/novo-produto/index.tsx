import { GetServerSideProps, GetStaticProps } from 'next';
import styles from './styles.module.scss'
import Header from '../../../components/Produto/Header';
import { useEffect, useState } from 'react';
import titleize from '../../../services/Titleize'
import onlyNumber from '../../../services/onlyNumber'
import { api } from '../../../services/api';
import router from 'next/router';
import { addHours, format } from 'date-fns';
import SelectorNewProduct from '../../../components/Produto/SelectorNewProduct';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import parseISO from 'date-fns/parseISO';


export default function editProduct(props){
    
    const startValues = {
        hubId: 0,
        ean: "",
        ncm: "",
        name: "",
        description: "",
        pricing: {
            mundial: {
                tray_id: 0,
                cost: "0",
                profit: "",
                price: "0",
                promotionalPrice: "",
                startPromotion: "",
                endPromotion: "",
                stock: ""
            },
            scpneus: {
                tray_id: 0,
                cost: "0",
                profit: "",
                price: "0",
                promotionalPrice: "",
                startPromotion: "",
                endPromotion: "",
                stock: ""
            }
        },
        brand: "",
        model: "",
        weight: "",
        length: "",
        width: "",
        height: "",
        mainCategoryId: 1,
        related_categories: [],
        availability: "",
        availabilityDays: 0,
        reference: "",
        images: [
            {imageUrl: ""},
            {imageUrl: ""},
            {imageUrl: ""},
            {imageUrl: ""},
            {imageUrl: ""},
            {imageUrl: ""}
        ],
        comments: "",
    }

    const startKit2 = {
        hubId: 0,
        trayId: 0,
        name: "",
        description: "",
        images: [
            {imageUrl: ""},
            {imageUrl: ""},
            {imageUrl: ""},
            {imageUrl: ""},
            {imageUrl: ""},
            {imageUrl: ""}
        ],
        rules: {
            discountType: "",
            discountValue: "",
            priceRule: "",
        }
    }

    const startKit4 = {
        hubId: 0,
        trayId: 0,
        name: "",
        description: "",
        images: [
            {imageUrl: ""},
            {imageUrl: ""},
            {imageUrl: ""},
            {imageUrl: ""},
            {imageUrl: ""},
            {imageUrl: ""}
        ],
        rules: {
            discountType: "",
            discountValue: "",
            priceRule: "",
        }
    }
        
    const [ values, setValues ] = useState(startValues)
    const [ kit2Values, setKit2Values ] = useState(startKit2)
    const [ kit4Values, setKit4Values ] = useState(startKit4)
    const [ categories, setCategories ] = useState([])
    const [ categoriesList, setCategoriesList ] = useState([])

    const [ textButton, setTextButton ] = useState('salvar produto')
    const [ submit, setSubmit ] = useState(false)

    useEffect(() => {
        api.get('/client.categoriesProductPage')
        .then(response => {
            if(response.data.code == 200){
                setCategoriesList(response.data.categoriesList)
                setCategories(response.data.categoriesTree)
            } else {
                console.log(response.data)
            }
        })
        .catch(error => {
            alert(error.response.data.message)
        })
    }, [])
    
    function setValue(chave, valor) {
        setValues({
          ...values,
          [chave]: valor,
        })
      }

    function handleDescription(boolean){ // ativa/desativa a descrição automatica
        if(boolean == true){ // desativa
            setValues({
                ...values,
                description: values.description 
            })
        } else {
            setValues({ // ativa
                ...values,
                description: titleize(values.name)
            })
        }
    }

    function handleCategories(id, parentsId, boolean){

        if(boolean && values.related_categories.indexOf(id) == -1){
            const relatedCategories = values.related_categories
            if(parentsId != null) {
                parentsId.map(number => {
                    if(relatedCategories.indexOf(number) == -1){
                        relatedCategories.push(number)
                    }
                })
            }
            relatedCategories.push(id)
            setValues({
                ...values,
                related_categories: relatedCategories
            })
        }
        if(!boolean && values.related_categories.indexOf(id) > -1){
            const relatedCategories = values.related_categories
            if(parentsId != null) {
                parentsId.map(number => {
                    if(relatedCategories.indexOf(number) > -1){
                        relatedCategories.splice(values.related_categories.indexOf(number), 1)
                    }
                })
            }
            relatedCategories.splice(values.related_categories.indexOf(id), 1)
            setValues({
                ...values,
                related_categories: relatedCategories
            })
        }
    }

    function handleChange(e){
        const key = e.target.getAttribute('name')
        const value = e.target.value

        setValue(
            key,
            value
        )

        const kitsKey = ["name", "description"]

        if(kitsKey.indexOf(key) > -1){
            if(key == "name"){
                const kit2Name = value.toUpperCase().replace("PNEU", "KIT 2 PNEUS")
                const kit4Name = value.toUpperCase().replace("PNEU", "KIT 4 PNEUS")
                setKit2Values({
                    ...kit2Values,
                    name: kit2Name,
                    description: titleize(kit2Name)
                })
                setKit4Values({
                    ...kit4Values,
                    name: kit4Name,
                    description: titleize(kit4Name)
                })
            }
            if(key == "description"){
                const kit2Name = value.toUpperCase().replace("PNEU", "KIT 2 PNEUS")
                const kit4Name = value.toUpperCase().replace("PNEU", "KIT 4 PNEUS")
                setKit2Values({
                    ...kit2Values,
                    description: titleize(kit2Name)
                })
                setKit4Values({
                    ...kit4Values,
                    description: titleize(kit4Name)
                })
            }
        }
    }

    function fillKits(){
        const kit2Name = values.name.toUpperCase().replace("PNEU", "KIT 2 PNEUS")
        const kit4Name = values.name.toUpperCase().replace("PNEU", "KIT 4 PNEUS")
        setKit2Values({
            ...kit2Values,
            name: kit2Name,
            description: titleize(kit2Name)
        })
        setKit4Values({
            ...kit4Values,
            name: kit4Name,
            description: titleize(kit4Name)
        })
    }

    function submitProduct(e) {
        e.preventDefault();

        setTextButton('salvando...')

        if(!submit){
            setSubmit(true)
            api.post(`/client.productPage.edit/${values.reference}`, {
                params: {
                    unitary: {
                        hubId: values.hubId,
                        ean: values.ean,
                        ncm: values.ncm,
                        name: values.name,
                        description: values.description,
                        pricing: {
                            mundial: {
                                tray_id: values.pricing.mundial.tray_id,
                                cost: values.pricing.mundial.cost,
                                profit: values.pricing.mundial.profit,
                                price: values.pricing.mundial.price,
                                promotionalPrice: values.pricing.mundial.promotionalPrice,
                                startPromotion: values.pricing.mundial.startPromotion,
                                endPromotion: values.pricing.mundial.endPromotion,
                                stock: values.pricing.mundial.stock
                            },
                            scpneus: {
                                tray_id: values.pricing.scpneus.tray_id,
                                cost: values.pricing.scpneus.cost,
                                profit: values.pricing.scpneus.profit,
                                price: values.pricing.scpneus.price,
                                promotionalPrice: values.pricing.scpneus.promotionalPrice,
                                startPromotion: values.pricing.scpneus.startPromotion,
                                endPromotion: values.pricing.scpneus.endPromotion,
                                stock: values.pricing.scpneus.stock
                            }
                        },
                        brand: values.brand,
                        model: values.model,
                        weight: values.weight,
                        length: values.length,
                        width: values.width,
                        height: values.height,
                        mainCategoryId: values.mainCategoryId,
                        related_categories: values.related_categories,
                        availability: values.availability,
                        availabilityDays: values.availabilityDays,
                        reference: values.reference,
                        images: [
                            {imageUrl: values.images[0].imageUrl},
                            {imageUrl: values.images[1].imageUrl},
                            {imageUrl: values.images[2].imageUrl},
                            {imageUrl: values.images[3].imageUrl},
                            {imageUrl: values.images[4].imageUrl},
                            {imageUrl: values.images[5].imageUrl}
                        ],
                        comments: values.comments,
                    },
                    kit2: {
                        hubId: kit2Values.hubId,
                        trayId: kit2Values.trayId,
                        name: kit2Values.name,
                        description: kit2Values.description,
                        images: [
                            {imageUrl: kit2Values.images[0].imageUrl},
                            {imageUrl: kit2Values.images[1].imageUrl},
                            {imageUrl: kit2Values.images[2].imageUrl},
                            {imageUrl: kit2Values.images[3].imageUrl},
                            {imageUrl: kit2Values.images[4].imageUrl},
                            {imageUrl: kit2Values.images[5].imageUrl}
                        ],
                        rules: {
                            discountType: kit2Values.rules.discountType,
                            discountValue: kit2Values.rules.discountValue,
                            priceRule: kit2Values.rules.priceRule,
                        }
                    },
                    kit4: {
                        hubId: kit4Values.hubId,
                        trayId: kit4Values.trayId,
                        name: kit4Values.name,
                        description: kit4Values.description,
                        images: [
                            {imageUrl: kit4Values.images[0].imageUrl},
                            {imageUrl: kit4Values.images[1].imageUrl},
                            {imageUrl: kit4Values.images[2].imageUrl},
                            {imageUrl: kit4Values.images[3].imageUrl},
                            {imageUrl: kit4Values.images[4].imageUrl},
                            {imageUrl: kit4Values.images[5].imageUrl}
                        ],
                        rules: {
                            discountType: kit4Values.rules.discountType,
                            discountValue: kit4Values.rules.discountValue,
                            priceRule: kit4Values.rules.priceRule,
                        }
                    }             
                }
                
            }).then(response => {
                console.log(response)
                if(response.data.code == 200){
                    setTextButton('salvo com sucesso')
                    router.push('/produtos')
                }
            }).catch(error => {
                setSubmit(false)
              alert(error.response.data.message)
              console.log(error)
            })
        } else {
            alert('os kits ainda não foram carregados, aguarde uns segundos')
            setTextButton('salvar produto')
        }

    }

    return (
        <form onSubmit={submitProduct} className={styles.wrapper}>
            <Head>
                <title>Editar | {values.reference}</title>
            </Head>
            <Header 
            textButton={textButton}
            strong={headerTitle}
            title="Edite as informações do produto"
            href="/produtos"
            maxWidth='100rem'
            />
            <SelectorNewProduct
            values={values}
            setValues={setValues}
            categories={categories}
            categoriesList={categoriesList}
            onChange={handleChange}
            onlyNumber={onlyNumber}
            handleDescription={handleDescription}
            setValue={setValue}
            handleCategories={handleCategories}
            kitValues={{kit2Values: kit2Values, kit4Values: kit4Values}}
            setKit2Values={setKit2Values}
            setKit4Values={setKit4Values}
            requestKits={requestKits}
            createKit={createKit}
            setCreateKit={setCreateKit}
            fillKits={fillKits}
            />
        </form>
    )
}

export const getServerSideProps = async (ctx) => {

    const { ['mundialhub.token']: token } = parseCookies(ctx)
    console.log('token', token)

    if(!token){
        return {
            redirect: {
            destination: '/login',
            permanent: false
            }
        }
    }
     
    return {
        props: {
        }
    }
}