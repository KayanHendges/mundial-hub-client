import { GetStaticPaths, GetStaticProps } from "next"
import { parseCookies } from 'nookies';
import styles from './editProduct.module.scss'
import Header from '../../components/Produto/Header';
import Selector from '../../components/Produto/Selector';
import { useEffect, useState } from 'react';
import titleize from '../../services/Titleize'
import onlyNumber from '../../services/onlyNumber'
import { api } from '../../services/api';
import router from 'next/router';
import { format } from 'date-fns';
import { parseISO } from "date-fns";
import Head from "next/head";



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
                price: "0",
                promotionalPrice: "",
                startPromotion: "",
                endPromotion: "",
                stock: ""
            },
            scpneus: {
                tray_id: 0,
                cost: "0",
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

    const [ headerTitle, setHeaderTitle ] = useState("")
    const [ textButton, setTextButton ] = useState('salvar produto')
    const [ submit, setSubmit ] = useState(false)

    const [ requestKits, setRequestKits ] = useState(false)
    const [ createKit, setCreateKit ] = useState({
        kit2: false,
        kit4: false,
    })

    useEffect(() => {
        api.get(`/client.productPage/${props.hubProductId}`)
        .then(response => {
            if(response.data.code == 200){
                const product = response.data.product

                setValues(product)
                setHeaderTitle(product.name)
            }
        })
        .catch(err => {
            console.log(err.respose.data.message)
            alert(err.respose.data.message)
        })
    }, [])

    useEffect(() => {
        if(values.name.length > 0){

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

            api.get(`/client.productPage.kits/${values.reference}`)
            .then(response => {
                if(response.data.code == 200){
                    setKit2Values(response.data.kit2)
                    setKit4Values(response.data.kit4)
                    setCreateKit({
                        kit2: response.data.kit2.hubId == 0 ? true : false,
                        kit4: response.data.kit4.hubId == 0 ? true : false,
                    })
                    setRequestKits(true)

                } else {
                    console.log(response.data)
                }
            })
            .catch(erro => alert(erro.response.data.message))
        }
    }, [values.hubId])
    
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

    function hasPromotionPrice(date){
        if(values.promotionalPrice == ""){
            return ""
        } else {
            return date
        }
    }

    function submitProduct(e) {
        e.preventDefault();

        setTextButton('salvando...')

        if(requestKits && !submit){
            setSubmit(true)
            api.patch('/produtos', {
                params: {
                    reference: values.reference,
                    unitary: {
                        ean: values.ean,
                        tray_id: values.trayId,
                        is_kit: values.is_kit,
                        ncm: values.ncm,
                        product_name: values.name,
                        product_title: values.name,
                        product_description: values.description,
                        product_small_description: values.description,
                        price: values.price,
                        cost_price: values.cost,
                        profit: values.profit,
                        promotional_price: values.promotionalPrice,
                        start_promotion: hasPromotionPrice(values.startPromotion),
                        end_promotion: hasPromotionPrice(values.endPromotion),
                        brand: values.brand,
                        model: values.model,
                        weight: parseInt(values.weight),
                        length: parseInt(values.length),
                        width: parseInt(values.width),
                        height: parseInt(values.height),
                        stock_tray: parseInt(values.stock),
                        main_category_id: values.mainCategoryId,
                        tray_related_categories: values.related_categories,
                        available: values.available,
                        availability: values.availability,
                        availability_days: values.availabilityDays,
                        reference: values.reference,
                        picture_source_1: values.images[0].imageUrl,
                        picture_source_2: values.images[1].imageUrl,
                        picture_source_3: values.images[2].imageUrl,
                        picture_source_4: values.images[3].imageUrl,
                        picture_source_5: values.images[4].imageUrl,
                        picture_source_6: values.images[5].imageUrl,
                        comments: "",
                    },
                    kit2: {
                        tray_id: kit2Values.trayId,
                        is_kit: kit2Values.is_kit,
                        product_name: kit2Values.name,
                        product_title: kit2Values.name,
                        product_description: kit2Values.description,
                        product_small_description: kit2Values.description,
                        reference: kit2Values.reference,
                        picture_source_1: kit2Values.images[0].imageUrl,
                        picture_source_2: kit2Values.images[1].imageUrl,
                        picture_source_3: kit2Values.images[2].imageUrl,
                        picture_source_4: kit2Values.images[3].imageUrl,
                        picture_source_5: kit2Values.images[4].imageUrl,
                        picture_source_6: kit2Values.images[5].imageUrl,
                        rules: {
                            discount_type: kit2Values.rules.discountType,
                            discount_value: parseFloat(kit2Values.rules.discountValue.replace(",", ".")),
                            price: 0,
                            price_rule: kit2Values.rules.priceRule,
                            product_id: kit2Values.rules.productId,
                            product_parent_id: kit2Values.rules.productParentId,
                            quantity: kit2Values.rules.quantity,
                            tray_id: kit2Values.rules.trayId,
                        }
                    },
                    kit4: {
                        tray_id: kit4Values.trayId,
                        is_kit: kit4Values.is_kit,
                        product_name: kit4Values.name,
                        product_title: kit4Values.name,
                        product_description: kit4Values.description,
                        product_small_description: kit4Values.description,
                        reference: kit4Values.reference,
                        picture_source_1: kit4Values.images[0].imageUrl,
                        picture_source_2: kit4Values.images[1].imageUrl,
                        picture_source_3: kit4Values.images[2].imageUrl,
                        picture_source_4: kit4Values.images[3].imageUrl,
                        picture_source_5: kit4Values.images[4].imageUrl,
                        picture_source_6: kit4Values.images[5].imageUrl,
                        rules: {
                            discount_type: kit4Values.rules.discountType,
                            discount_value: parseFloat(kit4Values.rules.discountValue.replace(",", ".")),
                            price: 0,
                            price_rule: kit4Values.rules.priceRule,
                            product_id: kit4Values.rules.productId,
                            product_parent_id: kit4Values.rules.productParentId,
                            quantity: kit4Values.rules.quantity,
                            tray_id: kit4Values.rules.trayId,
                        }
                    }             
                }
                
            }).then(response => {
                console.log(response)
                if(response.data.code == 200){
                    setTextButton('salvo com sucesso')
                    router.push('/produtos')
                }
            }).catch((error) => {
                setSubmit(false)
              alert(error)
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
            <Selector
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

    const id = ctx.params.editProduct
     
    return {
        props: {
            hubProductId: id,
        }
    }
}