import { useEffect, useState } from 'react'
import styles from './styles.module.scss'

type handleTray = {
    function: string;
    initialStock: number;
    trayId: boolean;
}

type Props = {
    stock: string;
    handleTray: handleTray;
    setHandleTray(handleTray: handleTray): void;
}

type Option = {
    handle: string;
    label: string;
}

type ButtonStyles = {
    color: string;
    backgroundColor: string;
    border: string;
}

type OptionIndex = {
    selected: number,
    availableOptions: number[]
}

export default function HandleTray(props: Props){

    const options: Option[] = [
        {
            handle: 'edit',
            label: 'apenas editar'
        },
        {
            handle: 'delete',
            label: 'excluir'
        },
        {
            handle: 'create',
            label: 'recriar'
        },
    ]

    const standartButton: ButtonStyles = {
        color: 'var(--complementar-text)',
        backgroundColor: 'var(--gray-3)',
        border: '1px solid var(--gray-line)'
    }

    const hoverButton: ButtonStyles = {
        color: 'var(--white-text)',
        backgroundColor: 'var(--gray-4)',
        border: '1px solid var(--white-text)'
    }

    const selectedButton: ButtonStyles = {
        color: 'var(--white-text)',
        backgroundColor: 'var(--gray-3)',
        border: '1px solid var(--complementar-text)'
    }

    const [ optionIndex, setOptionIndex ] = useState<OptionIndex>({
        selected: 0,
        availableOptions: []
    })

    const [ hoverButtonIndex, setHoverButtonIndex ] = useState(-1)

    useEffect(() => {
        const initialStock = props.handleTray.initialStock
        const stock = parseInt(props.stock)

        if(stock == initialStock){
            if(props.handleTray.trayId){
                setOptionIndex({
                    selected: 0,
                    availableOptions: [0]
                })
            } else {
                setOptionIndex({
                    selected: 2,
                    availableOptions: [2]
                })
            }
        }

        if(stock == 0 && initialStock == 0){
            if(props.handleTray.trayId){
                setOptionIndex({
                    selected: 0,
                    availableOptions: [0, 1]
                })
            } else {
            
                setOptionIndex({
                    selected: 2,
                    availableOptions: [2]
                })
            }

        }

        if(stock == 0 && initialStock > 0){
            if(props.handleTray.trayId){
                setOptionIndex({
                    selected: 0,
                    availableOptions: [0, 1]
                })
            } else {
                setOptionIndex({
                    selected: 2,
                    availableOptions: [2]
                })
            }
        }

        if(stock > 0 && initialStock == 0){
            if(props.handleTray.trayId){
                setOptionIndex({
                    selected: 0,
                    availableOptions: [0, 1]
                })
            } else {
                setOptionIndex({
                    selected: 2,
                    availableOptions: [2]
                })
            }
        }

        if(stock != initialStock && initialStock > 0 && stock > 0){
            if(props.handleTray.trayId){
                setOptionIndex({
                    selected: 0,
                    availableOptions: [0]
                })
            } else {
                setOptionIndex({
                    selected: 2,
                    availableOptions: [2]
                })
            }
        }

    }, [props.stock, props.handleTray.initialStock, props.handleTray.trayId])

    function handleStyle(index){
        const display = `${optionIndex.availableOptions.includes(index) ? 'flex' : 'none' }`
        if(index == optionIndex.selected){
            return {
                ...selectedButton,
                display: display
            }
        } else {
            if(index == hoverButtonIndex){
                return {
                    ...hoverButton,
                    display: display
                }
            } else {
                return {
                    ...standartButton,
                    display: display
                }
            }
        }
    }

    return (
        <div
        className={styles.wrapper}
        >
            <div
            className={styles.label}
            >
                <label>
                    anuncio na Tray
                </label>
            </div>
            <div
            className={styles.options}
            >
                {options.map( (option, index) => {
                    return (
                        <span
                        className={styles.option}
                        style={handleStyle(index)}
                        onClick={() => {
                            props.setHandleTray({...props.handleTray, function: options[index].handle})
                            setOptionIndex({
                                ...optionIndex,
                                selected: index
                            })
                        }}
                        onMouseEnter={() => setHoverButtonIndex(index)}
                        onMouseLeave={() => setHoverButtonIndex(-1)}
                        >
                            {option.label}
                        </span>
                    )
                } )}
            </div>
        </div>
    )
}