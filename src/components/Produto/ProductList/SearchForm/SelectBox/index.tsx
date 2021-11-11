import { useState } from 'react'
import styles from './styles.module.scss'

export default function SelectBox(props){

    const [ position, setPosition ] = useState({
        select: false,
        leftStyle: {
            left: '0%'
        },
        rightStyle: {
            left: '50%'
        }
    })

    const [ style, setStyle ] = useState({
        active: false,
        border: "1px solid var(--gray-2)",
        textColor: "var(--complementar-text)"
    })

    function handleSelect(boolean){
        if(boolean){
            setPosition({
                ...position,
                select: true
            })
        } else {
            setPosition({
                ...position,
                select: false
            })
        }
    }

    function storeName(store){
        if(store == props.option1.value){
            return props.option1.label
        }
        if(store == 1049898){
            return props.option2.label
        }
    }

    return (
        <div
        className={styles.wrapper}
        >
            <div
            className={styles.selected}
            style={position.select ? position.rightStyle : position.leftStyle}
            >
                {storeName(props.search.store)}
            </div>
            <div
            className={styles.placeholder}
            onClick={() => {
                handleSelect(false)
                props.setSearch({
                    ...props.search,
                    store: props.option1.value,
                    onChangeSearch: (props.search.onChangeSearch+1)
                })
            }}
            >
                {props.option1.label}
            </div>
            <div
            className={styles.placeholder}
            onClick={() => {
                handleSelect(true)
                props.setSearch({
                    ...props.search,
                    store: props.option2.value,
                    onChangeSearch: (props.search.onChangeSearch+1)
                })
            }}
            >
                {props.option2.label}
            </div>
        </div>
    )
}