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

    const startKitValues = {
        kit2: {
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
        },
        kit4: {
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
        },
    }

    const [ values, setValues ] = useState(startValues)
    const [ kitValues, setKitValues ] = useState(startKitValues)
    const [ categories, setCategories ] = useState([])
    const [ categoriesList, setCategoriesList ] = useState([])

    const [ headerTitle, setHeaderTitle ] = useState("")

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
                startPromotion: format(parseISO(productData.start_promotion), "yyyy-MM-dd"),
                endPromotion: format(parseISO(productData.end_promotion), "yyyy-MM-dd"),
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
                console.log(response)
                if(response.data.kitsFound == 2){
                    const kit2 = response.data.kit2
                    const startKit2 = {
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
                        startPromotion: format(parseISO(kit2.start_promotion), "yyyy-MM-dd"),
                        endPromotion: format(parseISO(kit2.end_promotion), "yyyy-MM-dd"),
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
                            discountType: kit2.rule.discount_type,
                            discountValue: kit2.rule.discount_value,
                            price: kit2.rule.price,
                            priceRule: kit2.rule.price_rule,
                            productId: kit2.rule.product_id,
                            productParentId: kit2.rule.product_parent_id,
                            quantity: kit2.rule.quantity,
                            trayId: kit2.rule.tray_id,
                        }
                    }
                    const kit4 = response.data.kit4
                    const startKit4 = {
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
                        startPromotion: format(parseISO(kit4.start_promotion), "yyyy-MM-dd"),
                        endPromotion: format(parseISO(kit4.end_promotion), "yyyy-MM-dd"),
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
                            discountType: kit4.rule.discount_type,
                            discountValue: kit4.rule.discount_value,
                            price: kit4.rule.price,
                            priceRule: kit4.rule.price_rule,
                            productId: kit4.rule.product_id,
                            productParentId: kit4.rule.product_parent_id,
                            quantity: kit4.rule.quantity,
                            trayId: kit4.rule.tray_id,
                        }
                    }
                    setKitValues({
                        kit2: startKit2,
                        kit4: startKit4
                    })
                }
                if(response.data.kitsFound == 1){
                    const kit2 = response.data.kit2
                    const startKit2 = {
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
                        startPromotion: format(parseISO(kit2.start_promotion), "yyyy-MM-dd"),
                        endPromotion: format(parseISO(kit2.end_promotion), "yyyy-MM-dd"),
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
                            discountType: kit2.rule.discount_type,
                            discountValue: kit2.rule.discount_value,
                            price: kit2.rule.price,
                            priceRule: kit2.rule.price_rule,
                            productId: kit2.rule.product_id,
                            productParentId: kit2.rule.product_parent_id,
                            quantity: kit2.rule.quantity,
                            trayId: kit2.rule.tray_id,
                        }
                    }
                    const startKits = {
                        kit2: startKit2,
                        kit4: startKitValues.kit4
                    }
                    setKitValues(startKits)
                }
            })
            .catch(erro => console.log(erro))
        }
    }, [values.name])
    
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
        setValue(
            e.target.getAttribute('name'),
            e.target.value
        )
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
                hub_id: values.hubId,
                values: {
                    ean: values.ean,
                    tray_id: values.trayId,
                    is_kit: values.is_kit,
                    ncm: values.ncm,
                    product_name: values.name,
                    product_title: values.name,
                    product_description: values.description,
                    product_small_description: values.name,
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
            kitValues={kitValues}
            setKitValues={setKitValues}
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