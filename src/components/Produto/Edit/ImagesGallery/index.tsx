import { useEffect, useState } from 'react'
import styles from './styles.module.scss'
import ImageContainer from '../../../../components/Inputs/ImageContainer'

type Values = {
    hub_id: number | null;
    images: {imageUrl: string}[]
}

type Props = {
    values: Values;
    setValues(values: Values): void;
}

export default function ImageGallery(props: Props){

    const [ imageGallery, setImageGallery ] = useState([])

    useEffect(() => {
        setImageGallery([
            {"imageUrl": `${props.values.images[0].imageUrl}`},
            {"imageUrl": `${props.values.images[1].imageUrl}`},
            {"imageUrl": `${props.values.images[2].imageUrl}`},
            {"imageUrl": `${props.values.images[3].imageUrl}`},
            {"imageUrl": `${props.values.images[4].imageUrl}`},
            {"imageUrl": `${props.values.images[5].imageUrl}`}        
        ])
    }, [props.values.hub_id])

    useEffect(() => {
        props.setValues({
            ...props.values,
            images: imageGallery
        })
    }, [imageGallery])

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

    return(
        <div
        className={styles.wrapper}
        >
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