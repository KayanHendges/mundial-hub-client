import React, { useEffect, useState } from 'react'
import styles from './styles.module.scss'

type SwitchProps = {
    width?: string;
    arrowsControl?: boolean;
    values: string[] | number[];
    selectedValue: string | number;
    onChange(any: any): void;
}

type SelectedStyle = {
    left: string;
}

export default function DefaultSwitch(props: SwitchProps){

    const arrowsControl = props.arrowsControl != undefined? props.arrowsControl : true

    const leftPositionStyle = {
        left: '0%'
    }
    
    const rightPositionStyle = {
        left: '50%'
    }

    const [ selectedStyle, setSelectedStyle ] = useState<SelectedStyle>(leftPositionStyle)

    useEffect(() => {

        if(props.selectedValue == props.values[0]){
            setSelectedStyle(leftPositionStyle)
        }

        if(props.selectedValue == props.values[1]){
            setSelectedStyle(rightPositionStyle)
        }

    }, [props.selectedValue])

    function handleByArrows(e: React.KeyboardEvent){
        if(e.key == 'ArrowRight' && props.selectedValue == props.values[0]){
            props.onChange(props.values[1])
        }
        if(e.key == 'ArrowLeft' && props.selectedValue == props.values[1]){
            props.onChange(props.values[0])
        }
    }

    return (
        <div
        className={styles.wrapper}
        style={{ width: `${props.width? props.width : '100%' }` }}
        >
            <input
            className={styles.selected}
            style={selectedStyle}
            value={props.selectedValue}
            type='text'
            onKeyDown={(e) => {
                if(arrowsControl){
                    handleByArrows(e)
                }
            }}
            readOnly={true}
            />
            
            <div
            className={styles.placeholderValue}
            onClick={() => {
                if(props.selectedValue != props.values[0]){
                    props.onChange(props.values[0])
                }
            }}
            >
                {props.values[0]}
            </div>
            <div
            className={styles.placeholderValue}
            onClick={() => {
                if(props.selectedValue != props.values[1]){
                    props.onChange(props.values[1])
                }
            }}
            >
                {props.values[1]}
            </div>
        </div>
    )
}