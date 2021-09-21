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


export default function editProduct(props){
    
    const startValues = {
        hubId: 0,
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

    const [ values, setValues ] = useState(startValues)

    const [ categories, setCategories ] = useState([])
    const [ categoriesList, setCategoriesList ] = useState([])

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
                ean: productData.ean,
                is_kit: productData.is_kit,
                ncm: productData.ncm,
                name: productData.product_name,
                description: productData.product_description,
                price: productData.price.toString(),
                cost: productData.cost_price.toString(),
                profit: productData.profit.toString(),
                promotionalPrice: productData.promotional_price.toString(),
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
            
            setValues(startValues)

        })

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
                    is_kit: values.is_kit,
                    ncm: values.ncm,
                    product_name: values.name,
                    product_title: values.name,
                    product_description: values.description,
                    product_small_description: values.name,
                    price: parseFloat(values.price),
                    cost_price: parseFloat(values.cost),
                    profit: parseFloat(values.profit),
                    promotional_price: parseFloat(values.promotionalPrice),
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
                    related_categories: values.related_categories,
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
            
        }).then(() => {
            router.push('/produtos')
            alert('produto salvo com sucesso')
        }).catch((error) => {
          alert(error)
          console.log(error)
        })
    }

    return (
        <form onSubmit={submitProduct} className={styles.wrapper}>
            <Header 
            textButton="salvar produto"
            strong={values.name}
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

    const product = await api.get(`produtos/${id}`)

    const productData = product.data
    
    

    return {
        props: {
            hubProductId: id,
            product: productData,
        }
    }
}