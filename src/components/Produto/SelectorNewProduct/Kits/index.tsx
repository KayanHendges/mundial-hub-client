import styles from './styles.module.scss'
import { useState, useEffect } from 'react'
import { api } from '../../../../services/api'
import DefaultInput from '../../../Inputs/DefaultInput'
import KitWrapper from './KitWrapper'

export default function Kits(props){

    return(
        <div 
        className={styles.wrapper} 
        style={{display:`${props.display.display}`}}
        >
            <KitWrapper
            kitHeader="kit 2"
            values={props.values}
            setValues={props.setValues}
            kitValues={props.kitValues.kit2Values}
            setKitValues={props.setKit2Values}
            onChange={props.onChange}
            />
            <KitWrapper
            kitHeader="kit 4"
            values={props.values}
            setValues={props.setValues}
            kitValues={props.kitValues.kit4Values}
            setKitValues={props.setKit4Values}
            onChange={props.onChange}
            />
        </div>
    )
}