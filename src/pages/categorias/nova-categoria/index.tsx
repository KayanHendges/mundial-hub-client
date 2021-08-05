import { GetStaticProps } from 'next';
import Header from '../../../components/Produto/Header';
import styles from './styles.module.scss'
import DefaultInput from '../../../components/Inputs/DefaultInput';
import DefaultTextArea from '../../../components/Inputs/DefaultTextArea';
import { useState } from 'react';

export default function novaCategorias(){

    const startValues = {
        category_name: "",
        category_small_desc: "",
        category_description: "",
        category_title: "",
        category_slug:"",
        order_list:"",
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
        console.log("sai")
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

    return (
        <div className={styles.wrapper}>
            <Header
            submit={"salvar categoria"}
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
                name="category_name_description"
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
                <DefaultInput // slug
                label="slug"
                name="category_slug"
                value={values.category_slug}
                onChange={handleChange}
                placeholder=""
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
                value={values.category_name}
                onChange={handleChange}
                placeholder=""
                />
                <DefaultInput // meta_description
                label="descrição Meta tag"
                name="category_meta_desc"
                value={values.category_name}
                onChange={handleChange}
                placeholder=""
                />
            </div>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    return {
        props: {
            
        }
    }
}