import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"
import styles from './editCategory.module.scss'
import { api } from '../../services/api';
import Head from 'next/head'

import Header from '../../components/Produto/Header';
import SlugInput from '../../components/Inputs/SlugInput';

import stringToSlug from '../../services/stringToSlug';
import { useState, useEffect } from 'react';
import router from 'next/router';
import { parseCookies } from "nookies";
import DefaultTextInput from "../../components/Inputs/DefaultTextInput";
import DefaultTextAreaInput from "../../components/Inputs/DefaultTextAreaInput";

export default function addSubcategory(props){

    const [ display, setDisplay ] = useState('none')
    const [ title, setTitle ] = useState('carregando...')

    const startValues = {
        hub_category_id: 0,
        tray_category_id: 0,
        tray_scpneus_category_id: 0,
        category_name: '',
        category_description: '',
        category_slug: '',
        category_title: '',
        category_small_desc: '',
        has_acceptance_term: 0,
        acceptance_term: '',
        category_meta_key: '',
        category_meta_desc: '',
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

    useEffect(() => {
        api.get(`/categories/${props.hubCategoryId}`)
        .then(response => {
            if (response.data.code == 200) {
                const category = response.data.category
                setValues(category)

                setDisplay('flex')
                setTitle(category.category_name)
            } else {
                console.log(response.data)
            }
        })
        .catch(erro => console.log(erro.response.data.message))
    }, [])


    function submitCategory(e) {
        e.preventDefault();

        api.patch(`/categories/`, {
            category: values
        }).then(response => {
          alert(response.data.message)
  
          router.push('/categorias')
        }).catch((error) => {
          alert()
          console.log(error)
        })
      }
    
    return (
        <form onSubmit={submitCategory} className={styles.wrapper}>
            <Head>
                <title>Categoria {values.category_name}</title>
            </Head>
            <Header
            textButton={"salvar categoria"}
            strong={title}
            title={"Todas as informa????es da categoria"}
            href="/categorias"
            maxWidth='50rem'
            />
            <div
            className={styles.formContainer}
            style={{ display: `${display}` }}
            >
                <DefaultTextInput // Nome
                label="Nome da Categoria"
                name="category_name"
                value={values.category_name}
                onChange={handleChange}
                placeholder="Insira o nome da categoria"
                leaveInput={leaveInput}
                required={true}
                />
                <DefaultTextInput // Small Description
                label="Descri????o breve"
                name="category_small_desc"
                value={values.category_small_desc}
                onChange={handleChange}
                placeholder=""
                />
                <DefaultTextAreaInput
                label="Descri????o" // Description
                name="category_description"
                value={values.category_description}
                onChange={handleChange}
                placeholder="Descri????o da categoria..."
                />
                <DefaultTextInput // title
                label="t??tulo"
                name="category_title"
                value={values.category_title}
                onChange={handleChange}
                placeholder=""
                />
                <SlugInput
                label="url"
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
                        termo de aceita????o
                    </span>
                </div>
                <div
                style={{display: `${acceptanceTerm.display}`}}
                className={styles.acceptanceTerm}
                >
                    <DefaultTextAreaInput
                    label="termo de aceita????o" // acceptance_term
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
                label="descri????o Meta tag"
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
    
    const id = ctx.params.editCategory

    return {
        props: {
            hubCategoryId: id 
        },
    }
}