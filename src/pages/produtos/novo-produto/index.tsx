import { GetStaticProps } from 'next';
import styles from './styles.module.scss'
import Header from '../../../components/Produto/Header';
import Selector from '../../../components/Produto/Selector';
import { useState } from 'react';
import titleize from '../../../services/Titleize'
import onlyNumber from '../../../services/onlyNumber'
import { api } from '../../../services/api2';


export default function produtos(props){
    
    const startValues = {
        name: "",
        reference: "",
        ean: "",
        idTray: "",
        brand: "",
        model: "",
        description: "",
        related_categories: [],
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
        console.log(id, parentsId, boolean)
        if(boolean && values.related_categories.indexOf(id) == -1){
            const relatedCategories = values.related_categories
            relatedCategories.push(id)
            setValues({
                ...values,
                related_categories: relatedCategories
            })
        }
        if(!boolean && values.related_categories.indexOf(id) > -1){
            const relatedCategories = values.related_categories
            relatedCategories.splice(values.related_categories.indexOf(id), 1)
            setValues({
                ...values,
                related_categories: relatedCategories
            })
        }
    }

    console.log(values.related_categories)

    function handleChange(e){
        setValue(
            e.target.getAttribute('name'),
            e.target.value
        )
    }

    return (
        <div className={styles.wrapper}>
            <Header 
            textButton="salvar produto"
            strong="Novo produto"
            title="Insira as informações do produto que deseja cadastrar"
            href="/produtos"
            />
            <Selector
            values={values}
            categories={props.categories}
            onChange={handleChange}
            onlyNumber={onlyNumber}
            handleDescription={handleDescription}
            setValue={setValue}
            handleCategories={handleCategories}
            />
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    const productsData = await api.get('produtos')
    const categoriesData = await api.get('categorias/arvore')
    
    const products = productsData.data 
    const categories = categoriesData.data

    return {
        props: {
            products: products,
            categories: categories
        }
    }
}