import styles from './styles.module.scss'
import { useState, useEffect } from 'react'
import { api } from '../../../../services/api'
import DefaultInput from '../../../Inputs/DefaultInput'
import KitWrapper from './KitWrapper'

export default function Kits(props){
    
    if(props.requestKits){
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
                createKit={props.createKit.kit2}
                setCreateKit={props.setCreateKit}
                onChange={props.onChange}
                fillKits={props.fillKits}
                quantity={2}
                reload={props.reload}
                setReload={props.setReload}
                updateImages={props.updateImages}
                setUpdateImages={props.setUpdateImages}
                />
                <KitWrapper
                kitHeader="kit 4"
                values={props.values}
                setValues={props.setValues}
                kitValues={props.kitValues.kit4Values}
                setKitValues={props.setKit4Values}
                createKit={props.createKit.kit4}
                setCreateKit={props.setCreateKit}
                onChange={props.onChange}
                fillKits={props.fillKits}
                quantity={4}
                reload={props.reload}
                setReload={props.setReload}        
                updateImages={props.updateImages}
                setUpdateImages={props.setUpdateImages}
                />
            </div>
        )
    } else {
        return(
            <span
            style={{display:`${props.display.display}`}}
            >
                carregando kits...
            </span>
        )
    }

}