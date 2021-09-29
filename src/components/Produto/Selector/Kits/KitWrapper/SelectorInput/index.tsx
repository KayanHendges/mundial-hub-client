import { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'

export default function SelectorInput(props){

    const [ dropDown, setDropDown ] = useState({
        show: false,
        display: "none"
    })

    function showDropDown(boolean){
        if(boolean){
            setDropDown({
                show: true,
                display: "flex"
            })
        } else {
            setDropDown({
                show: false,
                display: "none"
            })
        }
    }

    return(
        <div
        className={styles.wrapper}
        style={{
            width: `${props.width}`,
            display: `${props.display}`
        }}
        onClick={() => showDropDown(!dropDown.show)}
        onMouseLeave={() => showDropDown(false)}
        >
            <div
            className={styles.label}
            >
                {props.label}
            </div>
            <div
            className={styles.input}
            >
                <span
                className={styles.selectedSpan}
                >
                    {props.value}
                </span>
            </div>
            <div
            className={styles.options}
            style={{display: `${dropDown.display}`}}
            >
                {props.optionList.map((option, index) => {
                    if(option == props.value){
                        return
                    } else {
                        return(
                            <div
                            className={styles.optionContainer}
                            onClick={() => props.onChange(option)}
                            key={index}
                            >
                                <span
                                className={styles.optionSpan}
                                >
                                    {option}
                                </span>
                            </div>
                        )
                    }
                })}
            </div>
        </div>

    )
}