import { GetStaticPaths, GetStaticProps } from "next"
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
        trayId: 0,
        ean: "",
        is_kit: 0,
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
    }

    const startKit2 = {
        hubId: 0,
            trayId: 0,
            ean: "",
            is_kit: 0,
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
                discountType: "",
                discountValue: "",
                price: "",
                priceRule: "",
                productId: 0,
                productParentId: 0,
                quantity: 0,
                trayId: "",
            }
    }

    const startKit4 = {
        hubId: 0,
        trayId: 0,
        ean: "",
        is_kit: 0,
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
            discountType: "",
            discountValue: "",
            price: "",
            priceRule: "",
            productId: 0,
            productParentId: 0,
            quantity: 0,
            trayId: "",
        }
    }
        

    const [ values, setValues ] = useState(startValues)
    const [ kit2Values, setKit2Values ] = useState(startKit2)
    const [ kit4Values, setKit4Values ] = useState(startKit4)
    const [ categories, setCategories ] = useState([])
    const [ categoriesList, setCategoriesList ] = useState([])

    const [ headerTitle, setHeaderTitle ] = useState("")

    function validateDate(date){
        if(date == "0000-00-00"){
            return ""
        } else {
            return format(parseISO(date), "yyyy-MM-dd")
        }
    }

    useEffect(() => {
        api.get(`produtos/${props.hubProductId}`)
        .then(response => {
            const productData = response.data
            Object.keys(productData).map(function(key, index) {
                if(productData[key] == null){
                    productData[key] = ""
                }
            })
            const startValues = {
                hubId: productData.hub_id,
                trayId: productData.tray_id,
                ean: productData.ean,
                is_kit: productData.is_kit,
                ncm: productData.ncm,
                name: productData.product_name,
                description: productData.product_description,
                price: parseFloat(productData.price).toFixed(2).replace(".", ","),
                cost: parseFloat(productData.cost_price).toFixed(2).replace(".", ","),
                profit: productData.profit.toString(),
                promotionalPrice: parseFloat(productData.promotional_price).toFixed(2).replace(".", ","),
                startPromotion: validateDate(productData.start_promotion),
                endPromotion: validateDate(productData.end_promotion),
                brand: productData.brand,
                model: productData.model,
                weight: productData.weight,
                length: productData.length,
                width: productData.width,
                height: productData.height,
                stock: productData.stock_tray,
                mainCategoryId: productData.main_category_id,
                related_categories: productData.related_categories,
                available: productData.available,
                availability: productData.availability,
                availabilityDays: productData.availability_days,
                reference: productData.reference,
                images: [
                    {imageUrl: productData.picture_source_1},
                    {imageUrl: productData.picture_source_2},
                    {imageUrl: productData.picture_source_3},
                    {imageUrl: productData.picture_source_4},
                    {imageUrl: productData.picture_source_5},
                    {imageUrl: productData.picture_source_6}
                ],
                comments: productData.comments,
            }

            setHeaderTitle(productData.product_name)
            
            setValues(startValues)

        })
    }, [])

    useEffect(() => {
        if(values.name.length > 0){
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

            api.get(`/produtos.kits/${values.reference}`)
            .then(response => {
                if(response.data.kit2.product_name != undefined){
                    const kit2 = response.data.kit2
                    setKit2Values({
                        hubId: kit2.hub_id,
                        trayId: kit2.tray_id,
                        ean: kit2.ean,
                        is_kit: kit2.is_kit,
                        ncm: kit2.ncm,
                        name: kit2.product_name,
                        description: kit2.product_description,
                        price: parseFloat(kit2.price).toFixed(2).replace(".", ","),
                        cost: parseFloat(kit2.cost_price).toFixed(2).replace(".", ","),
                        profit: kit2.profit.toString(),
                        promotionalPrice: parseFloat(kit2.promotional_price).toFixed(2).replace(".", ","),
                        startPromotion: validateDate(kit2.start_promotion),
                        endPromotion: validateDate(kit2.end_promotion),
                        brand: kit2.brand,
                        model: kit2.model,
                        weight: kit2.weight,
                        length: kit2.length,
                        width: kit2.width,
                        height: kit2.height,
                        stock: kit2.stock_tray,
                        mainCategoryId: kit2.main_category_id,
                        related_categories: kit2.related_categories,
                        available: kit2.available,
                        availability: kit2.availability,
                        availabilityDays: kit2.availability_days,
                        reference: kit2.reference,
                        images: [
                            {imageUrl: kit2.picture_source_1},
                            {imageUrl: kit2.picture_source_2},
                            {imageUrl: kit2.picture_source_3},
                            {imageUrl: kit2.picture_source_4},
                            {imageUrl: kit2.picture_source_5},
                            {imageUrl: kit2.picture_source_6}
                        ],
                        comments: kit2.comments,
                        rules: {
                            discountType: kit2.rules.discount_type,
                            discountValue: kit2.rules.discount_value.toString(),
                            price: kit2.rules.price,
                            priceRule: kit2.rules.price_rule,
                            productId: kit2.rules.product_id,
                            productParentId: kit2.rules.product_parent_id,
                            quantity: kit2.rules.quantity,
                            trayId: kit2.rules.tray_id,
                        }
                    })
                }
                if(response.data.kit4.product_name != undefined){
                    const kit4 = response.data.kit4
                    setKit4Values({
                        hubId: kit4.hub_id,
                        trayId: kit4.tray_id,
                        ean: kit4.ean,
                        is_kit: kit4.is_kit,
                        ncm: kit4.ncm,
                        name: kit4.product_name,
                        description: kit4.product_description,
                        price: parseFloat(kit4.price).toFixed(2).replace(".", ","),
                        cost: parseFloat(kit4.cost_price).toFixed(2).replace(".", ","),
                        profit: kit4.profit.toString(),
                        promotionalPrice: parseFloat(kit4.promotional_price).toFixed(2).replace(".", ","),
                        startPromotion: validateDate(kit4.start_promotion),
                        endPromotion: validateDate(kit4.end_promotion),
                        brand: kit4.brand,
                        model: kit4.model,
                        weight: kit4.weight,
                        length: kit4.length,
                        width: kit4.width,
                        height: kit4.height,
                        stock: kit4.stock_tray,
                        mainCategoryId: kit4.main_category_id,
                        related_categories: kit4.related_categories,
                        available: kit4.available,
                        availability: kit4.availability,
                        availabilityDays: kit4.availability_days,
                        reference: kit4.reference,
                        images: [
                            {imageUrl: kit4.picture_source_1},
                            {imageUrl: kit4.picture_source_2},
                            {imageUrl: kit4.picture_source_3},
                            {imageUrl: kit4.picture_source_4},
                            {imageUrl: kit4.picture_source_5},
                            {imageUrl: kit4.picture_source_6}
                        ],
                        comments: kit4.comments,
                        rules: {
                            discountType: kit4.rules.discount_type,
                            discountValue: kit4.rules.discount_value.toString(),
                            price: kit4.rules.price,
                            priceRule: kit4.rules.price_rule,
                            productId: kit4.rules.product_id,
                            productParentId: kit4.rules.product_parent_id,
                            quantity: kit4.rules.quantity,
                            trayId: kit4.rules.tray_id,
                        }
                    })
                }
            })
            .catch(erro => {console.log(erro)})
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

    function hasPromotionPrice(date){
        if(values.promotionalPrice == ""){
            return ""
        } else {
            return date
        }
    }

    function submitProduct(e) {
        e.preventDefault();

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
            if(response.data.code == 200){
                router.push('/produtos')
            }
        }).catch((error) => {
          alert(error)
          console.log(error)
        })
    }

    return (
        <form onSubmit={submitProduct} className={styles.wrapper}>
            <Head>
                <title>Editar | {values.reference}</title>
            </Head>
            <Header 
            textButton="salvar produto"
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
            />
        </form>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {

    const id = ctx.params.editProduct
     
    return {
        props: {
            hubProductId: id,
        }
    }
}