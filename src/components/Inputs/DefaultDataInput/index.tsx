import { CSSProperties } from 'react'
import onlyNumber from '../../../services/onlyNumber'
import onlyNumberText from '../../../services/onlyNumberText'
import styles from './styles.module.scss'

type InputProps = {
    label?: string;
    name: string;
    value: string;
    placeholder?: string;
    visibility?: boolean;
    width?: string;
    border?: string;
    textAlign?: 'start' | 'center' | 'end' ;
    required?: boolean;
    readOnly?: boolean;
    loading?: boolean;
    onChange(value: any): any;
    leaveInput?(): any;
}

export default function DefaultDataInput(props: InputProps){

    const inputStyle: CSSProperties = {
        border: props.border,
        textAlign: props.textAlign,
    }

    const visibility = props.visibility == undefined? true : props.visibility

    const wrapperStyles: CSSProperties = {
        width: `${props.width? props.width : '100%' }`,
        visibility: `${visibility? 'visible' : 'hidden' }`,
    }

    if(props.loading){
        return (
            <div
            className={styles.wrapper}
            style={{ width: `${props.width? props.width : '100%' }` }}
            >
                <label>
                    {props.label}
                </label>
                <div
                className={styles.placeholder}
                style={{ width: `${props.width? props.width : '100%'}` }}
                />
            </div>
        )
    } else {
        return (
            <div
            className={styles.wrapper}
            style={wrapperStyles}
            >
                <label
                style={{ display: `${props.label? 'flex' : 'none'}` }}
                >
                    {props.label}
                </label>
                <input
                type="text"
                style={inputStyle}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                onBlur={() => {if(props.leaveInput != undefined){
                    return props.leaveInput()
                }}}
                autoComplete="new-password"
                required={props.required? props.required : false}
                readOnly={props.readOnly? props.readOnly : false}
                />
                <div
                className={styles.unity}
                style={{ display: `${'none'}` }}
                >
                </div>
            </div>
        )
    }

}