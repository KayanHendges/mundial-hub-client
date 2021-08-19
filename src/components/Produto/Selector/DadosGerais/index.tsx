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
        {"imageUrl": `${props.values.images[0].imageUrl}`},
        {"imageUrl": `${props.values.images[1].imageUrl}`},
        {"imageUrl": `${props.values.images[2].imageUrl}`},
        {"imageUrl": `${props.values.images[3].imageUrl}`},
        {"imageUrl": `${props.values.images[4].imageUrl}`},
        {"imageUrl": `${props.values.images[5].imageUrl}`}        
    ])

    function setImage(chave, valor){
        let updatedImages = []
        
        imageGallery.map((image, index) => {
            if(chave == index) {
                image.imageUrl = valor
                
            }
            updatedImages.push(image)
        })
        setImageGallery(updatedImages)   
    }

    function leaveInput(){
        let updatedImages = imageGallery
        let ordenedImages = []
        
        updatedImages.map((image) => {
            if(image.imageUrl.length > 0){
                ordenedImages.push(image)
            }
        })

        let ordenedImagesFilled = ordenedImages

        updatedImages.map(() => {
            if(ordenedImages.length < 6) {
                ordenedImagesFilled.push({imageUrl: ""})
            }
        })

        setImageGallery(ordenedImagesFilled)
        props.setValue("images", imageGallery)
        
    }

    function changeOrder(direction, index){
        let updatedImages = []
        if(direction == "forward"){
            imageGallery.map((image, i) => {
                if(index == i) {
                    updatedImages.push(imageGallery[index+1])
                } else {
                    if((index + 1) == i) {
                        updatedImages.push(imageGallery[index])
                    } else {
                        updatedImages.push(image)
                    }
                }
            })
        }
        if(direction == "backward"){
            imageGallery.map((image, i) => {
                if((index - 1) == i) {
                    updatedImages.push(imageGallery[index])
                } else {
                    if(index == i) {
                        updatedImages.push(imageGallery[index - 1])
                    } else {
                        updatedImages.push(image)
                    }
                }
            })
        }
        setImageGallery(updatedImages)
    }

    function handleImages(e){
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
            <span className={styles.imageTitle}>imagens</span>
            <div className={styles.imageGallery}>
                {imageGallery.map((imageUrl, index) => {
                    let display = "none"
                    let displayFB = "flex"
                    let displayBB = "flex"
                    
                    if (imageUrl.imageUrl.length > 0) {
                        display = "flex";
                    } else {
                        if(index == 0){
                            display = "flex"
                            displayFB = "none"
                            displayBB = "none"
                        } else {
                            if (imageGallery[index-1].imageUrl.length > 0){
                                display = "flex"
                                displayFB = "none"
                                displayBB = "none"
                            }
                        }
                        
                    }
                    
                    if (index == 0){
                        displayBB = "none"
                    }
                    
                    if (index == 5){
                        displayFB = "none"
                    } else {
                        if (imageGallery[index+1].imageUrl.length == 0) {
                            displayFB = "none"
                        }
                    }

                    let displayButtons = {displayFB, displayBB}
                    
                    return (
                        <div key={index}>
                            <ImageContainer
                            display={display}
                            name={index}
                            url={imageUrl.imageUrl}
                            onChange={handleImages}
                            leaveInput={leaveInput}
                            onClick={changeOrder}
                            displayButtons={displayButtons}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}