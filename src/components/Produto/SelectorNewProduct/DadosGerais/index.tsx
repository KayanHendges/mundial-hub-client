import { useState, useEffect } from 'react'

import styles from './styles.module.scss'

import InputLength from '../../../Inputs/InputLength'
import DefaultInput from '../../../Inputs/DefaultInput'
import DefaultTextArea from '../../../Inputs/DefaultTextArea'
import DefaultNumberInput from '../../../Inputs/DefaultNumberInput'
import ImageContainer from '../../../Inputs/ImageContainer'
import { api } from '../../../../services/api'
import ImageGallery from './ImagesGallery'


export default function DadosGerais(props){

    const [ autoDescription, setAutoDescription ] = useState(false)
    const [ borderColor, setBorderColor ] = useState("var(--gray-line)")
    const [ wasSuggestion, setWasSuggestion ] = useState(false)

    const [ fill, setFill ] = useState({
        borderColor: "1px solid var(--complementar-text)",
        color: "var(--complementar-text)",
        auth: true
    })

    async function handleFill(){

        setWasSuggestion(false)
        setFill({
            borderColor: "1px solid var(--white-text)",
            color: "var(--white-text)",
            auth: false
        })
        await suggestionInput("button")
        .then(response => {
            if(response){
                setFill({
                    borderColor: "1px solid #207567",
                    color: "var(--white-text)",
                    auth: false
                })
            } else {
                setFill({
                    borderColor: "1px solid #E01D10",
                    color: "var(--white-text)",
                    auth: false
                })
            }
        })
        setTimeout(() => {
            setFill({
                borderColor: "1px solid var(--complementar-text)",
                color: "var(--complementar-text)",
                auth: true
            })
        }, 2000)
    }

    
    function handleCheck(){ // Ativa e desativa a descrição automatica
        if(autoDescription == true) { // desativa
            setAutoDescription(false)
            setBorderColor("var(--gray-line)")
            props.handleDescription(autoDescription)
        }
        if(autoDescription == false) { // ativa
            setAutoDescription(true)
            setBorderColor("var(--complementar-text")
            props.handleDescription(autoDescription)
        }
    }

    async function suggestionInput(input){
        return new Promise((resolve, reject) => {
            console.log(input)
            if(input != "button" && wasSuggestion){
                return
            }

            if((fill.auth) && props.values.name.length > 0){
                api.get(`/products/model-suggestion?productName=${props.values.name}`)
                .then(response => {
                    setWasSuggestion(true)
                    props.setValues({
                        ...props.values,
                        brand: response.data.brand,
                        model: response.data.model,
                        related_categories: response.data.relatedCategories
                    })
                    if(response.data.model.length > 0){
                        resolve(true)
                    } else {
                        resolve(false)
                    }
                })
                .catch(() => {
                    resolve(false)
                })
                setWasSuggestion(true)
            } else {
                resolve(false)
            }
        })
    }

    function getReference(){
        if(props.values.reference == ""){
            api.get('products/reference')
            .then(response => {
                props.setValues({...props.values, reference: response.data})
            })
            .catch(erro => {
                console.log(erro)
            })
        } else {
            return
        }
    }

    return(
        <div 
        className={styles.wrapper} 
        style={{display:`${props.display.display}`}}
        onFocus={() => getReference()}
        >
            <InputLength
            width="100%"
            label="nome"
            name="name"
            placeholder="escreva o nome do produto..."
            required="required"
            value={props.values.name}
            onChange={props.onChange}
            leaveInput={suggestionInput}
            />
            <div className={styles.inputContainer}>
                <DefaultInput
                width="33.3333%"
                label="referencia"
                name="reference"
                placeholder=""
                required="required"
                value={props.values.reference}
                onChange={props.onChange}
                />
                <DefaultNumberInput
                width="33.3333%"
                label="ean"
                name="ean"
                placeholder="código de barras"
                required=""
                value={props.values.ean}
                onChange={props.onChange}
                onlyNumber={props.onlyNumber}
                />
            </div>
            <div
            className={styles.fillButton}
            onClick={() => handleFill()}
            style={{
                border: `${fill.borderColor}`
            }}
            >
                <span
                style={{
                  color: `${fill.color}`  
                }}
                >
                    preencher
                </span>
            </div>
            <div className={styles.inputContainer}>
                <DefaultInput
                width="100%"
                label="marca"
                name="brand"
                placeholder=""
                required=""
                value={props.values.brand}
                onChange={props.onChange}
                />
                <DefaultInput
                width="100%"
                label="modelo"
                name="model"
                placeholder=""
                required=""
                value={props.values.model}
                onChange={props.onChange}
                />
            </div>
            <div className={styles.descriptionArea}>
                <DefaultTextArea
                rows={3}
                type="textarea"
                width="100%"
                label="descrição"
                name="description"
                placeholder=""
                required=""
                value={props.values.description}
                onChange={props.onChange}
                readOnly={autoDescription}
                />
                <div 
                className={styles.autoDescription}
                onClick={handleCheck}
                style={{
                    color: `${borderColor}`,
                    border: `1px solid ${borderColor}`
                }}
                >
                    <p>
                        descrição automática
                    </p>
                </div>
                
            </div>
            <ImageGallery
            values={props.values}
            setValues={props.setValues}
            />
        </div>
    )
}