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


export default function produtos(props){
    
    const startValues = {
        ean: "",
        is_kit: 0,
        ncm: "4011.10.00",
        name: "",
        description: "",
        price: "",
        cost: "",
        profit: "",
        promotionalPrice: "",
        startPromotion: format(new Date(), "yyyy-MM-dd"),
        endPromotion: "",
        brand: "",
        model: "",
        weight: "",
        length: "",
        width: "",
        height: "",
        stock: "",
        mainCategoryId: 0,
        related_categories: [],
        available: 1,
        availability: "imediato",
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
            ean: "",
            is_kit: 1,
            ncm: "",
            name: "",
            description: "",
            price: "0",
            cost: "0",
            profit: "",
            promotionalPrice: "",
            startPromotion: "",
            endPromotion: "",
            brand: "",
            model: "",
            weight: "",
            length: "",
            width: "",
            height: "",
            stock: "",
            mainCategoryId: 1,
            related_categories: [],
            available: 0,
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
            rules: {
                discountType: "%",
                discountValue: "2,5",
                price: "",
                priceRule: "2",
                productId: 0,
                productParentId: 0,
                quantity: 2,
            }
    }

    const startKit4 = {
        ean: "",
        is_kit: 1,
        ncm: "",
        name: "",
        description: "",
        price: "0",
        cost: "0",
        profit: "",
        promotionalPrice: "",
        startPromotion: "",
        endPromotion: "",
        brand: "",
        model: "",
        weight: "",
        length: "",
        width: "",
        height: "",
        stock: "",
        mainCategoryId: 1,
        related_categories: [],
        available: 0,
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
        rules: {
            discountType: "%",
            discountValue: "5",
            price: "",
            priceRule: "2",
            productId: 0,
            productParentId: 0,
            quantity: 4,
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
        api.get('categorias/arvore')
        .then(response => {
            setCategories(response.data)
        })
        .catch(erro => console.log(erro))

        api.get('categorias')
        .then(response => {
            setCategoriesList(response.data)
        })
        .catch(erro => console.log(erro))
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

    function hasPromotionPrice(date){
        if(values.promotionalPrice == ""){
            return ""
        } else {
            return date
        }
    }

    function submitProduct(e) {
        e.preventDefault();

        if(!submit){
            setSubmit(true)
            console.log('salvando')
            setTextButton('salvando...')
    
            api.post('/produtos', {
                params: {
                    reference: values.reference,
                    unitary: {
                        ean: values.ean,
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
                        creation_date: addHours(new Date(), -3)
                    },
                    kit2: {
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
                        },
                        creation_date: addHours(new Date(), -3)
                    },
                    kit4: {
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
                        },
                        creation_date: addHours(new Date(), -3)
                    }             
                }
                
            }).then(response => {
                if(response.data.code == 201){
                    setTextButton('salvo com sucesso')
                    router.push('/produtos')
                }
              alert(response.data.message)
            }).catch((error) => {
                setTextButton('erro ao salvar')
                alert(error)
                console.log(error)
            })
        }

    }

    return (
        <form onSubmit={submitProduct} className={styles.wrapper}>
            <Head>
                <title>Cadastro Produto</title>
            </Head>
            <Header 
            textButton={textButton}
            strong="Novo produto"
            title="Insira as informações do produto que deseja cadastrar"
            href="/produtos"
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
            />
        </form>
    )
}

export const getServerSideProps = async (ctx) => {

    const { ['mundialhub.token']: token } = parseCookies(ctx)

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