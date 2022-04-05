import { CSSProperties, useState } from 'react'
import onlyNumber from '../../../services/onlyNumber'
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
    onChange?(value: any): any;
    leaveInput?(date?: string): any;
}

export default function DefaultDateInput(props: InputProps){

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

    function handleOnChangeDate(e: string){

        // pega apenas os numeros da string e transforma em um array
        const numbers: number [] = e.replaceAll('/', '')
        .replaceAll(',', '')
        .replaceAll('.', '')
        .replaceAll('-', '')
        .split('').map(crt => {
            return parseInt(crt)
        })

        // array com as caracteres que serão retornadas no fim da função
        const dateNumbers: string[] = []

        const isErasing = e.length - props.value.length == -1? true : false
        var currentLastValue = '' 

        if(props.value.length > 0){ 
            const splittedCurrentValue = props.value.split('')
            currentLastValue = splittedCurrentValue[props.value.length-1] 
        }

        if(isErasing && currentLastValue == '/'){ 
            // se o usuário está tentando apagar o "/",
            // irá apagar o numero anterior também
            numbers.pop()
        }

        numbers.map((number, index) => {

            // primeiro caracter do dia
            if(index == 0){
                if(number > 3){
                    dateNumbers.push('0')
                    dateNumbers.push(number.toString())
                    dateNumbers.push('/')
                } else {
                    dateNumbers.push(number.toString())
                }
            }
            
            // primeiro caracter do mês
            if(index == 2){
                if(number > 1){
                    dateNumbers.push('0')
                    dateNumbers.push(number.toString())
                    dateNumbers.push('/')
                } else {
                    dateNumbers.push(number.toString())
                }
            }

            // caracteres do ano
            if(index > 3 && index < 8){
                dateNumbers.push(number.toString())
            }

            // segundo caracter do dia/mês
            if([1, 3].includes(index)){
                dateNumbers.push(number.toString())
                dateNumbers.push('/')
            }
        })

        return dateNumbers.join('')
    }

    function handleLeaveInput(values: string){
        if(values.length == 8){
            const crts = values.split('')
            const finalCrts = []
            crts.map((crt, index) => {
                if(index == 6){
                    finalCrts.push('2')
                    finalCrts.push('0')
                    finalCrts.push(crt)
                } else {
                    finalCrts.push(crt)
                }
            })
            return finalCrts.join('')
        }

        if(values.length == 10){
            return values
        } 

        return ''
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
                onChange={(e) => props.onChange(handleOnChangeDate(e.target.value))}
                onKeyPress={(e) => {
                    if(props.onlyNumber){
                        onlyNumber(e)
                    }
                }}
                placeholder={props.placeholder}
                onBlur={async() => {if(props.leaveInput != undefined){
                    props.onChange(handleLeaveInput)
                    return props.leaveInput(handleLeaveInput(props.value))
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