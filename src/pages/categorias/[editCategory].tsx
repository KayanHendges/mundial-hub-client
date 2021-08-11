import { GetStaticPaths, GetStaticProps } from "next"
import styles from './editCategory.module.scss'
import { api } from '../../services/api2';

import Header from '../../components/Produto/Header';
import DefaultInput from '../../components/Inputs/DefaultInput';
import DefaultTextArea from '../../components/Inputs/DefaultTextArea';
import SlugInput from '../../components/Inputs/SlugInput';

import stringToSlug from '../../services/stringToSlug';
import { useState } from 'react';
import router from 'next/router';

export default function addSubcategory(props){

    const startValues = {
        hub_category_id: props.category.hub_category_id,
        tray_category_id: props.category.category_name,
        category_name: props.category.category_name,
        category_description: props.category.category_description,
        category_slug: props.category.category_slug,
        order_list: props.category.order_list,
        category_title: props.category.category_title,
        category_small_desc: props.category.category_small_description,
        has_acceptance_term: props.category.has_acceptance_term,
        acceptance_term: props.category.acceptance_term,
        category_meta_key: props.category.category_meta_key,
        category_meta_desc: props.category.category_meta_desc,
        property: props.category.property,
        http_image: props.category.http_image,
        https_image: props.category.https_image,
        http_link: props.category.http_link,
        https_link: props.category.https_link,
        parent_id: props.category.category_parent_id
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
        }).then(() => {
          alert('Categoria salva com sucesso')
  
          router.push('/categorias')
        }).catch((error) => {
          alert(error)
          console.log(error)
        })
      }

    return (
        <form onSubmit={submitCategory} className={styles.wrapper}>
            <Header
            textButton={"salvar categoria"}
            strong={startValues.category_name}
            title={"Todas as informações da categoria"}
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
export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {

    const id  = ctx.params.editCategory
    const { data } = await api.get(`categorias/${id}`) 

    return {
        props: {
            category: data
        },
    }
}