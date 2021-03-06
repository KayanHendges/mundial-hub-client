import { useContext, useEffect, useState } from 'react'
import { NewProductContext } from '../../../../../contexts/NewProductContext'
import DefaultTextAreaInput from '../../../../Inputs/DefaultTextAreaInput'
import DefaultTextInput from '../../../../Inputs/DefaultTextInput'
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
                    setUnitaryDetails({...unitaryDetails, weight: parseInt(e.target.value)})
                }
                />
                <DefaultTextInput 
                label='comprimento'
                name='length'
                value={unitaryDetails.length.toString()}
                unity='cm'
                onlyNumber={true}
                onChange={(e) => 
                    setUnitaryDetails({...unitaryDetails, length: parseInt(e.target.value)})
                }
                />
                <DefaultTextInput 
                label='largura'
                name='width'
                value={unitaryDetails.width.toString()}
                unity='cm'
                onlyNumber={true}
                onChange={(e) => 
                    setUnitaryDetails({...unitaryDetails, width: parseInt(e.target.value)})
                }
                />
                <DefaultTextInput 
                label='altura'
                name='height'
                value={unitaryDetails.height.toString()}
                unity='cm'
                onlyNumber={true}
                onChange={(e) => 
                    setUnitaryDetails({...unitaryDetails, height: parseInt(e.target.value)})
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
            label='observa????es'
            name='comments'
            value={unitaryDetails.comments}
            onChange={(e) => 
                setUnitaryDetails({...unitaryDetails, comments: e.target.value})
            }
            />
        </div>
    )
}