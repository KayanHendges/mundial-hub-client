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

    return(
        <div 
        className={styles.wrapper} 
        style={{display:`${props.display.display}`}}
        >
            <InputLength
            width="100%"
            label="nome"
            name="name"
            placeholder="escreva o nome do produto..."
            required="required"
            value={props.values.name}
            onChange={props.onChange}
            />
            <div className={styles.inputContainer}>
                <DefaultInput
                width="33.3333%"
                label="Id Tray"
                name=""
                placeholder=""
                required=""
                value={props.values.trayId}
                onChange={props.onChange}
                />
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