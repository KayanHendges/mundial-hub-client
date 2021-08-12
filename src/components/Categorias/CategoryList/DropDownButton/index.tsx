import { useState } from 'react'
import styles from './styles.module.scss'

export default function DropDownButton(props){

    const [ style, setStyle ] = useState("rotate(0deg)")

    function handleStyle(){
        if(style == "rotate(0deg)"){ // ativa
            setStyle("rotate(90deg)")
        } else {
            setStyle("rotate(0deg)")
        }
    }

    return(
        <div
        className={styles.showSubcategory}
        style={{ transform: `${props.rotate}` }}
        >
            {">"}
        </div>
    )
}