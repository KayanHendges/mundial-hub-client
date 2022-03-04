import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next"
import styles from './styles.module.scss'
import { api } from '../../../services/api';

import Header from '../../../components/Produto/Header';
import DefaultInput from '../../../components/Inputs/DefaultInput';
import DefaultTextArea from '../../../components/Inputs/DefaultTextArea';
import SlugInput from '../../../components/Inputs/SlugInput';

import stringToSlug from '../../../services/stringToSlug';
import { useEffect, useState } from 'react';
import router from "next/router";
import Head from "next/head";
import { parseCookies } from "nookies";

export default function slug(props){

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
        parent_slug: ''
    }

    const [ values, setValues ] = useState(startValues)
    
    const [ acceptanceTerm, setAcceptanceTerm ] = useState({
        display: "none",
        color: "#E01D10",
    })

    const [ display, setDisplay ] = useState('none')

    useEffect(() => {
        api.get(`/categories/${props.parentId}`)
        .then(response => {
            console.log(response)
            setValues({
                ...values,
                tray_category_parent_id: response.data.tray_category_id,
                parent_slug: response.data.category_slug
            })
            setDisplay('flex')
        })
    }, [])

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
        

        api.post(`/categories/subcategory/${props.parentId}`, {
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
            router.push('/categorias')
            alert(response.data.message)
        }).catch(error => {
            console.log(error)
          alert(error)
        })
      }

    return (
        <form onSubmit={submitCategory} className={styles.wrapper}>
            <Head>
                <title>Incluir Subcategoria</title>
            </Head>
            <Header
            maxWidth="100%"
            textButton={"salvar categoria"}
            strong={"Nova Subategoria"}
            title={"Insira as informações da nova subcategoria"}
            href="/categorias"
            />
            <div
            className={styles.formContainer}
            style={{ display: `${display}`}}
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
                url={`${values.parent_slug}/`}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const parentId  = ctx.params.slug

    const { ['mundialhub.token']: token } = parseCookies(ctx)
  
    if(!token){
        const { url } = ctx.req
        return {
            redirect: {
            destination: `/login?redirect=${url}`,
            permanent: false
            }
        }
    }


    return {
        props: {
            parentId: parentId,
        },
    }
}