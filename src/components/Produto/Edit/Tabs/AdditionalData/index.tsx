import { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../../../../contexts/ProductContext'
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
    } = useContext(ProductContext)


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
                loading={unitaryDetails.hub_id? false : true }
                label='peso'
                name='weight'
                value={unitaryDetails.weight.toString()}
                unity='g'
                onlyNumber={true}
                onChange={(e) => 
                    setUnitaryDetails({...unitaryDetails, weight: parseFloat(e.target.value)})
                }
                />
                <DefaultTextInput
                loading={unitaryDetails.hub_id? false : true } 
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
                loading={unitaryDetails.hub_id? false : true }
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
                loading={unitaryDetails.hub_id? false : true } 
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
            loading={unitaryDetails.hub_id? false : true }
            label='ncm'
            name='ncm'
            width='10rem'
            value={unitaryDetails.ncm}
            onChange={(e) => 
                setUnitaryDetails({...unitaryDetails, ncm: e.target.value})
            }
            />
            <DefaultTextAreaInput 
            loading={unitaryDetails.hub_id? false : true }
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