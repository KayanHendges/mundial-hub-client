import { GetStaticPaths, GetStaticProps } from "next"
import styles from './editProduct.module.scss'
import { api } from '../../services/api';

import Header from '../../components/Produto/Header';
import Selector from '../../components/Produto/Selector';
import { useState } from 'react';
import titleize from '../../services/Titleize'
import onlyNumber from '../../services/onlyNumber'
import router from 'next/router';
import { format } from 'date-fns';



export default function editProduct(props){

    const startValues = {
        ean: "",
        is_kit: 0,
        ncm: "40111000",
        name: "",
        description: "",
        price: "",
        cost: "",
        profit: "",
        promotional_price: "",
        start_promotion: format(new Date(), "yyyy-MM-dd"),
        end_promotion: "",
        brand: "",
        model: "",
        weight: 0,
        length: 0,
        width: 0,
        height: 0,
        stock: 0,
        mainCategoryId: null,
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
        if(values.promotional_price == ""){
            return ""
        } else {
            return date
        }
    }

    function submitProduct(e) {
        e.preventDefault();

        api.post('/produtos', {
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
            promotional_price: parseFloat(values.promotional_price),
            start_promotion: hasPromotionPrice(values.start_promotion),
            end_promotion: hasPromotionPrice(values.end_promotion),
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
        }).then(() => {
            router.push('/produtos')
            alert('produto criado com sucesso')
        }).catch((error) => {
          alert(error)
          console.log(error)
        })
    }

    return (
        <form onSubmit={submitProduct} className={styles.wrapper}>
            <Header 
            textButton="salvar produto"
            strong="Novo produto"
            title="Insira as informações do produto que deseja cadastrar"
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

    const id  = ctx.params.editCategory
    const { data } = await api.get(`produtos/${id}`) 

    const productsData = await api.get('produtos')
    const categoriesData = await api.get('categorias/arvore')
    const categoriesListData = await api.get('categorias')
    
    const products = productsData.data 
    const categories = categoriesData.data
    const categoriesList= categoriesListData.data

    return {
        props: {
            product: data,
            products: products,
            categories: categories,
            categoriesList: categoriesList
        }
    }

    return {
        props: {
            category: data
        },
    }
}