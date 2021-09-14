import { GetStaticPaths, GetStaticProps } from "next"
import styles from './editProduct.module.scss'
import Header from '../../components/Produto/Header';
import Selector from '../../components/Produto/Selector';
import { useState } from 'react';
import titleize from '../../services/Titleize'
import onlyNumber from '../../services/onlyNumber'
import { api } from '../../services/api';
import router from 'next/router';
import { format } from 'date-fns';


export default function editProduct(props){
    const startValues = {
        hubId: props.product.hub_id,
        ean: props.product.ean,
        is_kit: props.product.is_kit,
        ncm: props.product.ncm,
        name: props.product.product_name,
        description: props.product.product_description,
        price: props.product.price,
        cost: props.product.cost,
        profit: props.product.profit,
        promotionalPrice: props.product.promotional_price,
        startPromotion: props.product.start_promotion,
        endPromotion: props.product.end_promotion,
        brand: props.product.brand,
        model: props.product.model,
        weight: props.product.weight,
        length: props.product.length,
        width: props.product.width,
        height: props.product.height,
        stock: props.product.stock,
        mainCategoryId: props.product.main_category_id,
        related_categories: props.product.related_categories,
        available: props.product.available,
        availability: props.product.availability,
        availabilityDays: props.product.availability_days,
        reference: props.product.reference,
        images: [
            {imageUrl: props.product.picture_source_1},
            {imageUrl: props.product.picture_source_2},
            {imageUrl: props.product.picture_source_3},
            {imageUrl: props.product.picture_source_4},
            {imageUrl: props.product.picture_source_5},
            {imageUrl: props.product.picture_source_6}
        ],
        comments: props.product.comments,
    }
    
    const [ values, setValues ] = useState(startValues)
    
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
                    weight: values.weight,
                    length: values.length,
                    width: values.width,
                    height: values.height,
                    stock: values.stock,
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
            categories={props.categories}
            categoriesList={props.categoriesList}
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
    const categories = await api.get('categorias/arvore')
    const categoriesList = await api.get('categorias')

    const productData = product.data
    
    Object.keys(productData).map(function(key, index) {
        if(productData[key] == null){
            productData[key] = ""
        }
      })

    return {
        props: {
            product: productData,
            categories: categories.data,
            categoriesList: categoriesList.data
        }
    }
}