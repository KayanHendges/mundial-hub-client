import { useState } from 'react'
import styles from './styles.module.scss'

export default function CheckBox(props){

    const [ style, setStyle ] = useState({
        active: false,
        border: "1px solid var(--gray-line)",
        textColor: "var(--complementar-text)"
    })

    function handleCheck(boolean){
        if(boolean){
            setStyle({
                active: true,
                border: "1px solid var(--white-text)",
                textColor: "var(--white-text)"
            })
        } else {
            setStyle({
                active: false,
                border: "1px solid var(--gray-line)",
                textColor: "var(--complementar-text)"
            })
        }
    }

    return (
        <div
        className={styles.wrapper}
        onClick={() => {
            handleCheck(!style.active)
            props.setValue(props.stateKey, !props.value)
        }}
        style={{border: `${style.border}`}}
        >
            <span
            className={styles.label}
            style={{color: `${style.textColor}`}}
            >
                {props.label}
            </span>
        </div>
    )
}