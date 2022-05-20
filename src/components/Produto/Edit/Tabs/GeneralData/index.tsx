import { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../../../../contexts/ProductContext'
import { api } from '../../../../../services/api'
import { titleize } from '../../../../../services/Titleize'
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
    
    return (
        <div
        className={styles.wrapper}
        style={props.styles}
        >
            <DefaultTextInput
            loading={unitaryDetails.hub_id? false : true } 
            label='nome'
            name='name'
            value={unitaryDetails.name}
            unity={unitaryDetails.name.length.toString()}
            border={verifyErrorInput('name')? '1px solid #E01D10' : undefined}
            onChange={(e) => 
                setUnitaryDetails({...unitaryDetails, name: e.target.value})
            }
            />
            <div
            className={styles.inputRow}
            >
                <DefaultTextInput 
                loading={unitaryDetails.hub_id? false : true } 
                label='referencia'
                name='reference'
                value={unitaryDetails.reference}
                border={verifyErrorInput('reference')? '1px solid #E01D10' : undefined}
                onChange={(e) => 
                    setUnitaryDetails({...unitaryDetails, reference: e.target.value})
                }
                />
                <DefaultTextInput
                loading={unitaryDetails.hub_id? false : true } 
                label='ean'
                name='ean'
                value={unitaryDetails.ean}
                onChange={(e) => 
                    setUnitaryDetails({...unitaryDetails, ean: e.target.value})
                }
                />
            </div>
            <div
            className={styles.inputRow}
            >
                <DefaultTextInput 
                loading={unitaryDetails.hub_id? false : true } 
                label='marca'
                name='brand'
                value={unitaryDetails.brand}
                onChange={(e) => 
                    setUnitaryDetails({...unitaryDetails, brand: e.target.value})
                }
                />
                <DefaultTextInput 
                loading={unitaryDetails.hub_id? false : true }
                label='modelo'
                name='model'
                value={unitaryDetails.model}
                onChange={(e) => 
                    setUnitaryDetails({...unitaryDetails, model: e.target.value})
                }
                />
            </div>
            <DefaultTextAreaInput
            loading={unitaryDetails.hub_id? false : true }
            label='descrição'
            name='description'
            value={unitaryDetails.description.replaceAll('</br>', '\n')}
            border={verifyErrorInput('description')? '1px solid #E01D10' : undefined}
            onChange={(e) => {
                const description = e.target.value.replaceAll('</br>', '\n')
                setUnitaryDetails({...unitaryDetails, description})
            }}
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