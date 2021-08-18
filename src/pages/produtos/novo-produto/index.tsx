import { GetStaticProps } from 'next';
import styles from './styles.module.scss'
import Header from '../../../components/Produto/Header';
import Selector from '../../../components/Produto/Selector';
import { useState } from 'react';
import titleize from '../../../services/Titleize'
import onlyNumber from '../../../services/onlyNumber'
import { api } from '../../../services/api2';
import router from 'next/router';
import { format } from 'date-fns';


export default function produtos(props){
    
    const startValues = {
        is_kit: 0,
        name: "",
        reference: "",
        ean: "",
        idTray: "",
        brand: "",
        model: "",
        description: "",
        related_categories: [],
        cost: "",
        profit: "",
        price: "",
        promotional_price: "",
        start_promotion: format(new Date(), "yyyy-MM-dd"),
        end_promotion: "",
        stock: 0,
        available: 1,
        availability: "imediato",
        availabilityDays: 0,
        images: [
            {imageUrl: ""},
            {imageUrl: ""},
            {imageUrl: ""},
            {imageUrl: ""},
            {imageUrl: ""},
            {imageUrl: ""}
        ]
    }
    
    const [ values, setValues ] = useState(startValues)
    
    function setValue(chave, valor) {
        console.log(chave, valor)
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
            is_kit: values.is_kit,
            product_name: values.name,
            reference: values.reference,
            ean: values.ean,
            tray_id: parseInt(values.idTray),
            brand: values.brand,
            model: values.model,
            product_description: values.description,
            product_small_description: values.name,
            related_categories: values.related_categories,
            cost_price: parseFloat(values.cost),
            profit: parseFloat(values.profit),
            price: parseFloat(values.price),
            promotional_price: parseFloat(values.promotional_price),
            start_promotion: hasPromotionPrice(values.start_promotion),
            end_promotion: hasPromotionPrice(values.end_promotion),
            stock: values.stock,
            picture_source_1: values.images[0].imageUrl,
            picture_source_2: values.images[1].imageUrl,
            picture_source_3: values.images[2].imageUrl,
            picture_source_4: values.images[3].imageUrl,
            picture_source_5: values.images[4].imageUrl,
            picture_source_6: values.images[5].imageUrl,
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

export const getStaticProps: GetStaticProps = async () => {

    const productsData = await api.get('produtos')
    const categoriesData = await api.get('categorias/arvore')
    const categoriesListData = await api.get('categorias')
    
    const products = productsData.data 
    const categories = categoriesData.data
    const categoriesList= categoriesListData.data

    return {
        props: {
            products: products,
            categories: categories,
            categoriesList: categoriesList
        }
    }
}