import { GetServerSideProps, GetStaticProps } from 'next';
import { api } from '../../../services/api';
import styles from './styles.module.scss'

import Header from '../../../components/Produto/Header';
import SlugInput from '../../../components/Inputs/SlugInput';

import stringToSlug from '../../../services/stringToSlug';
import { useState } from 'react';
import router from 'next/router';
import Head from 'next/head';
import { parseCookies } from 'nookies';
import DefaultTextInput from '../../../components/Inputs/DefaultTextInput';
import DefaultTextAreaInput from '../../../components/Inputs/DefaultTextAreaInput';

export default function novaCategorias(props){

    const startValues = {
        category_name: "",
        category_small_desc: "",
        category_description: "",
        category_title: "",
        category_slug:"",
        tray_category_parent_id: 0,
        order_list: 100000,
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
        

        api.post('/categories/', {
            category: {
                category_name: values.category_name,
                category_small_desc: values.category_small_desc,
                category_description: values.category_description,
                category_title: values.category_title,
                category_slug: values.category_slug,
                order_list: values.order_list,
                has_acceptance_term: values.has_acceptance_term,
                acceptance_term: values.acceptance_term,
                category_meta_key: values.category_meta_key,
                category_meta_desc: values.category_meta_desc,
            }
        }).then(response => {
            if(response.data.code == 201){
                alert(response.data.message)
                router.push('/categorias')
            } else {
                console.log(response.data)
            }
        }).catch(error => {
            if(error.response.data.message){
                alert(error.response.data.message)
            } else {
                console.log(error)
            }
        })
      }

    return (
        <form onSubmit={submitCategory} className={styles.wrapper}>
            <Head>
                <title>Cadastrar Categoria</title>
            </Head>
            <Header
            maxWidth='100%'
            textButton={"salvar categoria"}
            strong={"Nova Categoria"}
            title={"Insira as informações da nova categoria"}
            href="/categorias"
            />
            <div className={styles.formContainer}>
                <DefaultTextInput // Nome
                label="Nome da Categoria"
                name="category_name"
                value={values.category_name}
                onChange={handleChange}
                placeholder="Insira o nome da categoria"
                leaveInput={leaveInput}
                required
                />
                <DefaultTextInput // Small Description
                label="Descrição breve"
                name="category_small_desc"
                value={values.category_small_desc}
                onChange={handleChange}
                placeholder=""
                />
                <DefaultTextAreaInput
                label="Descrição" // Description
                name="category_description"
                value={values.category_description}
                onChange={handleChange}
                placeholder="Descrição da categoria..."
                />
                <DefaultTextInput // title
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
                    <DefaultTextAreaInput
                    label="termo de aceitação" // acceptance_term
                    name="acceptance_term"
                    value={values.acceptance_term}
                    onChange={handleChange}
                    placeholder="eu aceito..."
                    />
                </div>
                <DefaultTextInput // meta_keywords
                label="keywords meta tag"
                name="category_meta_key"
                value={values.category_meta_key}
                onChange={handleChange}
                placeholder=""
                />
                <DefaultTextInput // meta_description
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    return {
      props: {}
    }
  }