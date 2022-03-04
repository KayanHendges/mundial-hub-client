import { rejects } from 'assert'
import { useContext, useEffect, useState } from 'react'
import { NewProductContext } from '../../../../../contexts/NewProductContext'
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

export default function AdditionalData(props: Props){

    const { 
        unitaryDetails, setUnitaryDetails,
    } = useContext(NewProductContext)


    return (
        <div
        className={styles.wrapper}
        style={props.styles}
        >
            <h1
            className={styles.title}
            >
                Medidas
            </h1>
            <div
            className={styles.inputRow}
            >
                <DefaultTextInput 
                label='peso'
                name='weight'
                value={unitaryDetails.weight.toString()}
                unity='g'
                onlyNumber={true}
                onChange={(e) => 
                    setUnitaryDetails({...unitaryDetails, weight: Math.floor(e.target.value)})
                }
                />
                <DefaultTextInput 
                label='comprimento'
                name='length'
                value={unitaryDetails.length.toString()}
                unity='cm'
                onlyNumber={true}
                onChange={(e) => 
                    setUnitaryDetails({...unitaryDetails, length: Math.floor(e.target.value)})
                }
                />
                <DefaultTextInput 
                label='largura'
                name='width'
                value={unitaryDetails.width.toString()}
                unity='cm'
                onlyNumber={true}
                onChange={(e) => 
                    setUnitaryDetails({...unitaryDetails, width: Math.floor(e.target.value)})
                }
                />
                <DefaultTextInput 
                label='altura'
                name='height'
                value={unitaryDetails.height.toString()}
                unity='cm'
                onlyNumber={true}
                onChange={(e) => 
                    setUnitaryDetails({...unitaryDetails, height: Math.floor(e.target.value)})
                }
                />
            </div>
            <h1
            className={styles.title}
            >
                Complementos
            </h1>
            <DefaultTextInput 
            label='ncm'
            name='ncm'
            width='10rem'
            value={unitaryDetails.ncm}
            onChange={(e) => 
                setUnitaryDetails({...unitaryDetails, ncm: e.target.value})
            }
            />
            <DefaultTextAreaInput 
            label='observações'
            name='comments'
            value={unitaryDetails.comments}
            onChange={(e) => 
                setUnitaryDetails({...unitaryDetails, comments: e.target.value})
            }
            />
        </div>
    )
}