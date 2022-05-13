import React, { useEffect, useRef, useState } from 'react'
import styles from './styles.module.scss'

type Props = {
    display?: string;
    visibility?: 'visible' | 'hidden';
    width?: string;
    maxWidth?: string;
    label?: string;
    loading?: boolean;
    value: string | number;
    optionList: string[] | number[];
    arrowKeyControl?: boolean;
    hideSelectedOption?: boolean;
    increaseZIndex?: number;
    lock?: boolean;
    onChange(value: string | number): void;
}

export default function DefaultSelectorInput(props: Props){

    const arrowKeyControl = props.arrowKeyControl? props.arrowKeyControl : true 
    const lock = props.lock != undefined? props.lock : false
    const increaseIndex = props.increaseZIndex? props.increaseZIndex : 0

    const [ dropDown, setDropDown ] = useState({
        show: false,
        display: "none",
        lock: lock
    })

    const hideSelectedOption = props.hideSelectedOption != undefined? props.hideSelectedOption : false

    function showDropDown(boolean){
        if(boolean){
            setDropDown({
                ...dropDown,
                show: true,
                display: "flex"
            })
        } else {
            setDropDown({
                ...dropDown,
                show: false,
                display: "none"
            })
        }
    }

    function handleArrowKey(e: React.KeyboardEvent<HTMLInputElement>){
        const selectedOption = props.value
        const optionsLength = props.optionList.length
        var selectedIndex = 0
        props.optionList.map( (option, index) => {
            if(option == selectedOption){
                selectedIndex = index
            }
        })
        
        if(e.key == 'ArrowUp'){
            if(selectedIndex == 0){
                props.onChange(props.optionList[optionsLength-1])
            } else {
                props.onChange(props.optionList[selectedIndex-1])
            }
        }

        if(e.key == 'ArrowDown'){
            if(selectedIndex == optionsLength-1){
                props.onChange(props.optionList[0])
            } else {
                props.onChange(props.optionList[selectedIndex+1])
            }
        }
    }

    if(props.loading){
        return (
            <div
            className={styles.wrapper}
            style={{
                width: `${props.width? props.width : '100%' }`,
                maxWidth: `${props.maxWidth? props.maxWidth : '' }`,
                display: `${props.display? props.display : 'flex' }`,
                visibility: `${props.visibility? props.visibility : 'visible' }`
            }}
            >
                <label>
                    {props.label}
                </label>
                <div
                className={styles.placeholder}
                style={{ 
                    width: `${props.width? props.width : '100%'}`,
                    maxWidth: `${props.maxWidth? props.maxWidth : '' }`
                }}
                />
            </div>
        )
    } else {
        return(
            <div
            className={styles.wrapper}
            style={{
                width: `${props.width? props.width : '100%' }`,
                maxWidth: `${props.maxWidth? props.maxWidth : '' }`,
                display: `${props.display? props.display : 'flex' }`,
                visibility: `${props.visibility? props.visibility : 'visible' }`
            }}
            onClick={() => showDropDown(!dropDown.show)}
            onMouseLeave={() => showDropDown(false)}
            >
                <div
                className={styles.label}
                style={{ display: `${props.label? 'flex' : 'none' }` }}
                >
                    {props.label}
                </div>
                <div
                className={styles.selectedInput}
                style={{ 
                    zIndex: increaseIndex+3
                }}
                >
                    <input
                    type='text'
                    value={props.value}
                    readOnly={true}
                    onKeyDown={(e) => handleArrowKey(e)}
                    />
                    <span
                    className={styles.separator}
                    >
                    </span>
                    <span 
                    className="material-icons-round" 
                    id={styles.dropIcon}
                    style={{ transform: `${dropDown.show? 'scaleY(-1)' : 'scaleY(1)' }` }}
                    >
                        expand_more
                    </span>
                </div>
                <div
                className={styles.options}
                style={{
                    display: `${props.optionList.length > 0? dropDown.display : 'none'}`,
                    bottom: `-${((props.optionList.length-(hideSelectedOption? 1 : 0 ))*2.5)-.1}rem`,
                    zIndex: increaseIndex+2,
                }}
                >
                    {props.optionList.map((option, index) => {
                        if(option == props.value && hideSelectedOption){
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

}