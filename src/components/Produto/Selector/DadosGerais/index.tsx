import { useState } from 'react'

import styles from './styles.module.scss'

import DefaultInput from '../../../Inputs/DefaultInput'
import DefaultTextArea from '../../../Inputs/DefaultTextArea'
import DefaultNumberInput from '../../../Inputs/DefaultNumberInput'
import ImageContainer from '../../../Inputs/ImageContainer'


export default function DadosGerais(props){

    const [ autoDescription, setAutoDescription ] = useState(false)
    const [ borderColor, setBorderColor ] = useState("var(--gray-line)")

    const [ imageGallery, setImageGallery ] = useState([
        {"imageUrl": `${props.values.images.imageUrl1}`},
        {"imageUrl": `${props.values.images.imageUrl2}`},
        {"imageUrl": `${props.values.images.imageUrl3}`},
        {"imageUrl": `${props.values.images.imageUrl4}`},
        {"imageUrl": `${props.values.images.imageUrl5}`},
        {"imageUrl": `${props.values.images.imageUrl6}`}        
    ])

    function setImage(chave, valor){
        console.log("me chamou", chave)
        const updatedImages = imageGallery.map((image, index) => {
            console.log(chave, image)
            if(chave == image) {
                console.log(chave, "=", image)
            }
        })
    }

    function handleImages(e){
        console.log("mexeu")
        console.log(e.target.getAttribute('name'))
        setImage(
            e.target.getAttribute('name'),
            e.target.value
        )
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

    return(
        <div className={styles.wrapper} style={{display:`${props.display.display}`}}>
            <DefaultInput
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
                width="100%"
                label="referencia"
                name="reference"
                placeholder=""
                required="required"
                value={props.values.reference}
                onChange={props.onChange}
                />
                <DefaultNumberInput
                width="100%"
                label="ean"
                name="ean"
                placeholder="código de barras"
                required=""
                value={props.values.ean}
                onChange={props.onChange}
                onlyNumber={props.onlyNumber}
                />
                <DefaultNumberInput
                width="100%"
                label="id da tray"
                name="idTray"
                placeholder="id gerado pela tray..."
                required=""
                value={props.values.idTray}
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
            <div className={styles.imageGallery}>
                {imageGallery.map((imageUrl, index) => {
                    return (
                        <div key={index}>
                            <ImageContainer
                            name={imageUrl.imageUrl}
                            url={imageUrl.imageUrl}
                            onChange={handleImages}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}