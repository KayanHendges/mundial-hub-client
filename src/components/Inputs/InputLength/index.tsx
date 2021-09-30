import { useState, useEffect } from 'react'
import styles from './styles.module.scss'

export default function InputLength(props){
    
    const [ length, setLength ] = useState(0)

    useEffect(() => {
        countLength()
    }, [props.value])

    function countLength(){
        const count = props.value.length
        setLength(count)
    }

    if (props.required == "required") {
        return (
            <div
            className={styles.wrapper}
            style={{
                width: `${props.width}`,
            }}>  
                <label>
                    {props.label}
                </label>
                <input
                type={props.type}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                onBlur={() => {if(props.leaveInput != undefined){
                    return props.leaveInput()
                }}}
                autoComplete="new-password"
                required
                />
                <span>
                    {length}
                </span>
            </div>
        )
    } else {
        return (            
            <div
            className={styles.wrapper}
            style={{
                width: `${props.width}`,
            }}>  
                <label>
                    {props.label}
                </label>
                <input 
                type={props.type}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                onBlur={() => {if(props.leaveInput != undefined){
                    return props.leaveInput()
                }}}
                autoComplete="new-password"
                />
            </div>
        )
    }
    
}