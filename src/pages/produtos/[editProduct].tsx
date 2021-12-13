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

    const [ headerTitle, setHeaderTitle ] = useState("")
    const [ textButton, setTextButton ] = useState('salvar produto')
    const [ submit, setSubmit ] = useState(false)

    const [ updateImages, setUpdateImages ] = useState(false)

    const [ requestKits, setRequestKits ] = useState(false)
    const [ createKit, setCreateKit ] = useState({
        kit2: false,
        kit4: false,
    })
    const [ reload, setReload ] = useState(0)

    useEffect(() => {
        api.get(`/products/page/${props.hubProductId}`)
        .then(response => {
            if(response.data.code == 200){
                const product = response.data.product
                console.log(product)

                setValues({
                    hubId: product.hubId,
                    ean: product.ean,
                    ncm: product.ncm,
                    name: product.name,
                    description: product.description,
                    pricing: {
                        mundial: {
                            tray_id: product.pricing.mundial.tray_id,
                            cost: product.pricing.mundial.cost.toFixed(2).replace('.', ','),
                            profit: product.pricing.mundial.profit.toString(),
                            price: product.pricing.mundial.price.toFixed(2).replace('.', ','),
                            promotionalPrice: product.pricing.mundial.promotionalPrice.toFixed(2).replace('.', ','),
                            startPromotion: product.pricing.mundial.startPromotion.length > 0 ? format(parseISO(product.pricing.mundial.startPromotion), 'yyyy-MM-dd') : '',
                            endPromotion: product.pricing.mundial.endPromotion.length > 0 ? format(parseISO(product.pricing.mundial.endPromotion), 'yyyy-MM-dd') : '',
                            stock: product.pricing.mundial.stock
                        },
                        scpneus: {
                            tray_id: product.pricing.scpneus.tray_id,
                            cost: product.pricing.scpneus.cost.toFixed(2).replace('.', ','),
                            profit: product.pricing.scpneus.profit.toString(),
                            price: product.pricing.scpneus.price.toFixed(2).replace('.', ','),
                            promotionalPrice: product.pricing.scpneus.promotionalPrice.toFixed(2).replace('.', ','),
                            startPromotion: product.pricing.scpneus.startPromotion.length > 0 ? format(parseISO(product.pricing.scpneus.startPromotion), 'yyyy-MM-dd') : '',
                            endPromotion: product.pricing.scpneus.endPromotion.length > 0 ? format(parseISO(product.pricing.scpneus.endPromotion), 'yyyy-MM-dd') : '',
                            stock: product.pricing.scpneus.stock
                        }
                    },
                    brand: product.brand,
                    model: product.model,
                    weight: product.weight.toString(),
                    length: product.length.toString(),
                    width: product.width.toString(),
                    height: product.height.toString(),
                    mainCategoryId: product.mainCategoryId,
                    related_categories: product.related_categories,
                    availability: product.availability,
                    availabilityDays: product.availabilityDays,
                    reference: product.reference,
                    images: [
                        {imageUrl: product.images[0].imageUrl},
                        {imageUrl: product.images[1].imageUrl},
                        {imageUrl: product.images[2].imageUrl},
                        {imageUrl: product.images[3].imageUrl},
                        {imageUrl: product.images[4].imageUrl},
                        {imageUrl: product.images[5].imageUrl}
                    ],
                    comments: product.comments,
                })
                setHeaderTitle(product.name)
            }
        })
        .catch(err => {
            console.log(err)
            // console.log(err.response.data.message)
            // alert(err.response.data.message)
        })
    }, [])

    useEffect(() => {
        if(values.name.length > 0){

            api.get('/products/page/categories/list')
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

            api.get(`/products/page/kits/${values.reference}`)
            .then(response => {
                if(response.data.code == 200){
                    setKit2Values(response.data.kit2)
                    setKit4Values(response.data.kit4)
                    setCreateKit({
                        ...createKit,
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

    useEffect(() => {
        if(reload > 0){
            api.get(`/products/page/kits/${values.reference}`)
                .then(response => {
                    if(response.data.code == 200){
                        setKit2Values(response.data.kit2)
                        setKit4Values(response.data.kit4)
                        setCreateKit({
                            ...createKit,
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
    }, [reload])
    
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

        if(requestKits && !submit){
            setSubmit(true)
            api.patch(`/products/${values.reference}`, {
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
                    },
                    updateImages: updateImages             
                }
                
            }).then(response => {
                console.log(response)
                if(response.data.code == 200){
                    setTextButton('salvo com sucesso')
                    // router.push(`/produtos?search=${values.reference}`)
                    router.back()
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
            href={`/produtos?search=${values.reference}`}
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
            reload={reload}
            setReload={setReload}
            updateImages={updateImages}
            setUpdateImages={setUpdateImages}
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