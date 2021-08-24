import styles from './styles.module.scss'
import { CSSProperties } from 'react'

export default function DateInput(props){

    console.log(props)

    function showInput(displayValue){
        if(displayValue.length > 0){
            return 'visible'
        } else {
            return 'hidden'
        }
    }

    const myStyles: CSSProperties = {
        width: `${props.width}`,
        visibility: `${showInput(props.visibility)}`
    } as const

    if(props.visibility.length > 0){
        return(
            <div
                className={styles.wrapper}
                style={myStyles}>  
                    <label>
                        {props.label}
                    </label>
                    <input
                    type="date"
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                    required
                    />
                </div>
        )
    } else {
        return(
            <div
                className={styles.wrapper}
                style={myStyles}>  
                    <label>
                        {props.label}
                    </label>
                    <input
                    type="date"
                    name={props.name}
                    value={props.value}
                    onChange={props.onChange}
                    />
                </div>
        )
    }
}