import { GetStaticPaths, GetStaticProps } from "next"
import styles from './editCategory.module.scss'
import { api } from '../../services/api';
import Head from 'next/head'

import Header from '../../components/Produto/Header';
import DefaultInput from '../../components/Inputs/DefaultInput';
import DefaultTextArea from '../../components/Inputs/DefaultTextArea';
import SlugInput from '../../components/Inputs/SlugInput';

import stringToSlug from '../../services/stringToSlug';
import { useState, useEffect } from 'react';
import router from 'next/router';
import { parseCookies } from "nookies";

export default function addSubcategory(props){

    const [ display, setDisplay ] = useState('none')
    const [ title, setTitle ] = useState('carregando...')

    const startValues = {
        hub_category_id: 0,
        tray_category_id: 0,
        category_name: '',
        category_description: '',
        category_slug: '',
        order_list: 0,
        category_title: '',
        category_small_desc: '',
        has_acceptance_term: 0,
        acceptance_term: '',
        category_meta_key: '',
        category_meta_desc: '',
        property: '',
        http_image: '',
        https_image: '',
        http_link: '',
        https_link: '',
        parent_id: '',
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
        api.get(`categorias/${props.hubCategoryId}`)
        .then(response => {
            const category = response.data

            setValues({
                hub_category_id: category.hub_category_id,
                tray_category_id: category.tray_category_id,
                category_name: category.category_name,
                category_description: category.category_description,
                category_slug: category.category_slug,
                order_list: category.order_list,
                category_title: category.category_title,
                category_small_desc: category.category_small_description,
                has_acceptance_term: category.has_acceptance_term,
                acceptance_term: category.acceptance_term,
                category_meta_key: category.category_meta_key,
                category_meta_desc: category.category_meta_desc,
                property: category.property,
                http_image: category.http_image,
                https_image: category.https_image,
                http_link: category.http_link,
                https_link: category.https_link,
                parent_id: category.category_parent_id
            })

            setDisplay('flex')
            setTitle(category.category_name)
        })
    }, [])

    function submitCategory(e) {
        e.preventDefault();
        
        console.log(values.tray_category_id)

        api.patch(`/categorias/${values.hub_category_id}`, {
            hub_category_id: values.hub_category_id,
            tray_category_id: values.tray_category_id,
            category_name: values.category_name,
            category_description: values.category_description,
            category_slug: values.category_slug,
            order_list: values.order_list,
            category_title: values.category_title,
            category_small_description: values.category_small_desc,
            has_acceptance_term: values.has_acceptance_term,
            acceptance_term: values.acceptance_term,
            category_meta_key: values.category_meta_key,
            category_meta_desc: values.category_meta_desc,
            property: values.property,
            http_image: values.http_image,
            https_image: values.https_image,
            http_link: values.http_link,
            https_link: values.https_link,
            category_parent_id: values.parent_id
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
            title={"Todas as informações da categoria"}
            href="/categorias"
            maxWidth='50rem'
            />
            <div
            className={styles.formContainer}
            style={{ display: `${display}` }}
            >
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

export const getServerSideProps = async (ctx) => {
    
    const id = ctx.params.editCategory

    const { ['mundialhub.token']: token } = parseCookies(ctx)
  
    if(!token){
      return {
        redirect: {
          destination: '/login',
          permanent: false
        }
      }
    }

    return {
        props: {
            hubCategoryId: id 
        },
    }
}