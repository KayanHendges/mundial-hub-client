import { GetServerSideProps, GetStaticProps } from 'next';
import styles from './styles.module.scss'
import Header from '../../../components/Produto/Header';
import Selector from '../../../components/Produto/Selector';
import { useEffect, useState } from 'react';
import titleize from '../../../services/Titleize'
import onlyNumber from '../../../services/onlyNumber'
import { api } from '../../../services/api';
import router from 'next/router';
import { format } from 'date-fns';


export default function produtos(props){
    
    const startValues = {
        ean: "",
        is_kit: 0,
        ncm: "40111000",
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
    
    const [ categories, setCategories ] = useState([])
    const [ categoriesList, setCategoriesList ] = useState([])

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

export const getStaticProps: GetStaticProps = async () => {

    return {
        props: {
        }
    }
}