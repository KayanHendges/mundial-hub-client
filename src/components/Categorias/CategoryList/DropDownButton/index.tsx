import { useState } from 'react'
import styles from './styles.module.scss'

export default function DropDownButton(){

    const [ style, setStyle ] = useState("rotate(0deg)")

    function handleStyle(){
        console.log('ola')
        if(style == "rotate(0deg)"){ // ativa
            setStyle("rotate(90deg)")
        } else {
            setStyle("rotate(0deg)")
        }
    }

    return(
        <div
        className={styles.showSubcategory}
        onClick={() => handleStyle()}
        style={{ transform: `${style}` }}
        >
            {">"}
        </div>
    )
}