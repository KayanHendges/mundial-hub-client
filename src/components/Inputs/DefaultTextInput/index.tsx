import { ChangeEvent, CSSProperties } from 'react'
import onlyNumber from '../../../services/onlyNumber'
import onlyNumberText from '../../../services/onlyNumberText'
import styles from './styles.module.scss'

type InputProps = {
    type?: string;
    label?: string;
    name?: string;
    value: string;
    placeholder?: string;
    width?: string;
    display?: string;
    visibility?: 'visible' | 'hidden';
    border?: string;
    textAlign?: 'start' | 'center' | 'end' ;
    required?: boolean;
    readOnly?: boolean;
    loading?: boolean;
    unity?: string;
    onlyNumber?: boolean;
    onChange?(value: ChangeEvent<HTMLInputElement>): any;
    leaveInput?(): any;
}

export default function DefaultTextInput(props: InputProps){

    const wrapperStyles: CSSProperties = {
        width: `${props.width? props.width : '100%' }`,
        display: `${props.display? props.display : 'flex' }`,
        visibility: `${props.visibility? props.visibility : 'visible' }`,
    }

    const fontSize = props.unity? (props.unity.length == 3? '.8rem' : '.9rem') : '.9rem'

    const inputStyle: CSSProperties = {
        border: props.readOnly? '1px solid transparent' : props.border,
        backgroundColor: props.readOnly? 'var(--gray-2)' : undefined,
        cursor: props.readOnly? 'default' : undefined,
        textAlign: props.textAlign,
        paddingRight: `${props.unity? '2.2rem' : '.8rem' }`
    }

    if(props.loading){
        return (
            <div
            className={styles.wrapper}
            style={wrapperStyles}
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
                type={`${props.type? props.type : 'text' }`}
                style={inputStyle}
                name={props.name}
                value={props.value}
                onChange={event => {
                    props.onChange(event)
                }}
                onKeyPress={(e) => {
                    if(props.onlyNumber){
                        onlyNumber(e)
                    }
                }}
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
                style={{ 
                    display: `${props.unity? 'flex' : 'none' }`,
                    fontSize: fontSize,
                }}
                >
                    {props.unity?.substring(0, 3)}
                </div>
            </div>
        )
    }

}