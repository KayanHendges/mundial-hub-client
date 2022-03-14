import { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../../../../contexts/ProductContext'
import { api } from '../../../../../services/api'
import titleize from '../../../../../services/Titleize'
import DefaultTextAreaInput from '../../../../Inputs/DefaultTextAreaInput'
import DefaultTextInput from '../../../../Inputs/DefaultTextInput'
import ImageGallery from '../../ImagesGallery'
import styles from './styles.module.scss'

type Styles = {
    left: string
}

type Props = {
    styles: Styles;
}

export default function GeneralData(props: Props){

    const { 
        unitaryDetails, setUnitaryDetails,
        kit2Details , kit4Details,
        verifyErrorInput
    } = useContext(ProductContext)

    const [ referenceLoading, setReferenceLoading ] = useState(false)

    const [ wasFilled, setWasFilled ] = useState(false)
    const [ loadingFill, setLoadingFill ] = useState(false)
    const [ fillError, setFillError ] = useState({
        error: false,
        border: '1px solid #E01D10'
    })

    async function getReference(){
        setReferenceLoading(true)
        await api.get('products/reference')
        .then(response => {
            if(response.data.code == 200){
                setUnitaryDetails({...unitaryDetails, reference: response.data.reference})
            } else {
                setUnitaryDetails({...unitaryDetails, reference: '9999'})
            }
        })
        .catch(erro => {
            setUnitaryDetails({...unitaryDetails, reference: '9999'})
        })
        setReferenceLoading(false)
    }

    async function handleFill(){
        setWasFilled(true)
        setLoadingFill(true)

        await fillBrandModel(unitaryDetails.name)
        .then(response => {
            console.log(response)
            if(response.brand.length > 0){
                setUnitaryDetails({...unitaryDetails, ...response})
            } else {
                setUnitaryDetails({...unitaryDetails, ...response})
                setFillError({...fillError, error: true})
                setTimeout(() => {
                    setFillError({...fillError, error: false})
                }, 1000) 
            }
        })
        .catch(() => {
            setFillError({...fillError, error: true})
            setTimeout(() => {
                setFillError({...fillError, error: false})
            }, 1000)
        })
        setLoadingFill(false)
    }

    async function fillBrandModel(productName: string)
    :Promise<{model: string, brand: string, related_categories: number[]}>{
        return new Promise((resolve, reject) => {
            api.get(`/products/model-suggestion?productName=${productName}`)
            .then(response => {
                if(response.data.model.length > 0){
                    resolve({
                        model: response.data.model,
                        brand: response.data.brand,
                        related_categories: response.data.related_categories
                    })
                } else {
                    resolve({
                        model: '',
                        brand: '',
                        related_categories: []
                    })
                }
            })
            .catch(() => {
                reject()
            })
        })
    }

    useEffect(() => {
        getReference()
    }, [])

    return (
        <div
        className={styles.wrapper}
        style={props.styles}
        >
            <DefaultTextInput 
            label='nome'
            name='name'
            value={unitaryDetails.name}
            unity={unitaryDetails.name.length.toString()}
            border={verifyErrorInput('name')? '1px solid #E01D10' : undefined}
            onChange={(e) => 
                setUnitaryDetails({...unitaryDetails, name: e.target.value})
            }
            leaveInput={() => {
                if(!wasFilled){
                    handleFill()
                }
            }}
            />
            <div
            className={styles.inputRow}
            >
                <DefaultTextInput 
                label='referencia'
                name='reference'
                value={unitaryDetails.reference}
                loading={referenceLoading}
                border={verifyErrorInput('reference')? '1px solid #E01D10' : undefined}
                onChange={(e) => 
                    setUnitaryDetails({...unitaryDetails, reference: e.target.value})
                }
                />
                <DefaultTextInput 
                label='ean'
                name='ean'
                value={unitaryDetails.ean}
                onChange={(e) => 
                    setUnitaryDetails({...unitaryDetails, ean: e.target.value})
                }
                />
            </div>
            <span
            className={styles.fillButton}
            onClick={() => {
                if(!fillError.error){
                    handleFill()
                }
            }}
            >
                preencher
            </span>
            <div
            className={styles.inputRow}
            >
                <DefaultTextInput 
                label='marca'
                name='brand'
                value={unitaryDetails.brand}
                loading={loadingFill}
                border={fillError.error? fillError.border : undefined }
                onChange={(e) => 
                    setUnitaryDetails({...unitaryDetails, brand: e.target.value})
                }
                />
                <DefaultTextInput 
                label='modelo'
                name='model'
                value={unitaryDetails.model}
                loading={loadingFill}
                border={fillError.error? fillError.border : undefined }
                onChange={(e) => 
                    setUnitaryDetails({...unitaryDetails, model: e.target.value})
                }
                />
            </div>
            <DefaultTextAreaInput
            label='descrição'
            name='description'
            value={unitaryDetails.description}
            border={verifyErrorInput('description')? '1px solid #E01D10' : undefined}
            onChange={(e) => 
                setUnitaryDetails({...unitaryDetails, description: e.target.value})
            }
            />
            <span
            className={styles.autoDescription}
            onClick={() => {
                setUnitaryDetails({...unitaryDetails, description: titleize(unitaryDetails.name)})
            }}
            >
                descrição automática
            </span>
            <ImageGallery
            values={unitaryDetails}
            setValues={setUnitaryDetails}
            />
        </div>
    )
}