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
            kitName="kit 2"
            values=""
            />
            <KitWrapper
            kitName="kit 4"
            />
        </div>
    )
}