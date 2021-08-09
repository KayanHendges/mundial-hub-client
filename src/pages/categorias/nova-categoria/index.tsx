import { GetStaticProps } from 'next';
import { api } from '../../../services/api2';
import styles from './styles.module.scss'

import Header from '../../../components/Produto/Header';
import DefaultInput from '../../../components/Inputs/DefaultInput';
import DefaultTextArea from '../../../components/Inputs/DefaultTextArea';
import SlugInput from '../../../components/Inputs/SlugInput';

import stringToSlug from '../../../services/stringToSlug';
import { useState } from 'react';
import router from 'next/router';

export default function novaCategorias(props){

    const startValues = {
        category_name: "",
        category_small_desc: "",
        category_description: "",
        category_title: "",
        category_slug:"",
        order_list: props.lastCategory+1,
        has_acceptance_term: 0,
        acceptance_term: "",
        category_meta_key:"",
        category_meta_desc:"",
        property: "",
    }

    const [ values, setValues ] = useState(startValues)
    
    const [ acceptanceTerm, setAcceptanceTerm ] = useState({
        display: "none",
        color: "#E01D10",
    })

    function setValue(chave, valor) {
        setValues({
          ...values,
          [chave]: valor,
        })
      }

    function handleChange(e){
        setValue(
            e.target.getAttribute('name'),
            e.target.value
        )
    }

    function leaveInput(){
        setValues({
            ...values,
            category_meta_key: values.category_name,
            category_meta_desc: values.category_name,
            category_slug: stringToSlug(values.category_name)
        })
    }

    function switchTerm(){
            if(acceptanceTerm.display == "flex"){ // desativa
                setAcceptanceTerm({
                    display: "none",
                    color: "#E01D10"
                }) 
            } else {
                setAcceptanceTerm({ // ativa
                    display: "flex",
                    color: "#207567"
                })
            }
    }

    function submitCategory(e) {
        e.preventDefault();
        

        api.post('/categorias', {
            category_name: values.category_name,
            category_small_description: values.category_small_desc,
            category_description: values.category_description,
            category_title: values.category_title,
            category_slug: values.category_slug,
            order_list: values.order_list,
            has_acceptance_term: values.has_acceptance_term,
            acceptance_term: values.acceptance_term,
            category_meta_key: values.category_meta_key,
            category_meta_desc: values.category_meta_desc,
            property: values.property,
        }).then(() => {
          alert('Categoria salva com sucesso')
  
          router.push('/categorias')
        }).catch((error) => {
          alert(error)
        })
      }

    return (
        <form onSubmit={submitCategory} className={styles.wrapper}>
            <Header
            textButton={"salvar categoria"}
            strong={"Nova Categoria"}
            title={"Insira as informações da nova categoria"}
            href="/categorias"
            />
            <div className={styles.formContainer}>
                <DefaultInput // Nome
                label="Nome da Categoria"
                name="category_name"
                value={values.category_name}
                onChange={handleChange}
                placeholder="Insira o nome da categoria"
                leaveInput={leaveInput}
                required
                />
                <DefaultInput // Small Description
                label="Descrição breve"
                name="category_small_desc"
                value={values.category_small_desc}
                onChange={handleChange}
                placeholder=""
                />
                <DefaultTextArea
                label="Descrição" // Description
                rows={1}
                name="category_description"
                value={values.category_description}
                onChange={handleChange}
                placeholder="Descrição da categoria..."
                />
                <DefaultInput // title
                label="título"
                name="category_title"
                value={values.category_title}
                onChange={handleChange}
                placeholder=""
                />
                <SlugInput 
                label="url"
                url={`mundialpneumaticos.com.br/`}
                name="category_slug"
                value={values.category_slug}
                onChange={handleChange}
                />
                <div
                className={styles.switch}
                onClick={() => switchTerm()}
                >
                    <div
                    className={styles.switchColor}
                    style={{border: `2px solid ${acceptanceTerm.color}`}}
                    />
                    <span>
                        termo de aceitação
                    </span>
                </div>
                <div
                style={{display: `${acceptanceTerm.display}`}}
                className={styles.acceptanceTerm}
                >
                    <DefaultTextArea
                    label="termo de aceitação" // acceptance_term
                    rows={1}
                    name="acceptance_term"
                    value={values.acceptance_term}
                    onChange={handleChange}
                    placeholder="eu aceito..."
                    />
                </div>
                <DefaultInput // meta_keywords
                label="keywords meta tag"
                name="category_meta_key"
                value={values.category_meta_key}
                onChange={handleChange}
                placeholder=""
                />
                <DefaultInput // meta_description
                label="descrição Meta tag"
                name="category_meta_desc"
                value={values.category_meta_desc}
                onChange={handleChange}
                placeholder=""
                />
            </div>
        </form>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    const { data } = await api.get('/categorias/arvore') 

    const index = data.length -1
    const indexLength = () => {
        if(index == -1 ){
            return 0
        } else {
            return data[index].order_list
        }
    }

    const lastCategory = indexLength()

    return {
        props: {
            lastCategory: lastCategory
        },
    }
}