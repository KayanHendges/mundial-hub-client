import { CSSProperties, MouseEvent } from 'react'
import styles from './styles.module.scss'

type Props = {
    selected: boolean,
    width?: string,
    click(e: MouseEvent): void;
}

export default function DefaultSelectBox(props: Props){

    const width = props.width? props.width : '1rem'
    const height = width

    const wrapperCSS: CSSProperties = {
        width,
        height,
        minWidth: width,
        minHeight: height,
    }

    const selectedStyle: CSSProperties = {
        ...wrapperCSS,
        borderColor: 'var(--white-text)'
    }

    const notSelectedStyle: CSSProperties = {
        ...wrapperCSS,
    }

    const selectedBoxStyle: CSSProperties = {
        backgroundColor: 'var(--blue-button)',
        width: 'calc(100% - .5rem)',
        height: 'calc(100% - .5rem)',
        left: 'calc(.25rem - 0px)',
        top: 'calc(.25rem - 0px)',
    }    

    const notSelectedBoxStyle: CSSProperties = {
    } 

    return (
        <div
        className={styles.wrapper}
        style={props.selected? selectedStyle : notSelectedStyle}
        onClick={e => props.click(e)}
        >
            <div
            className={styles.box}
            style={props.selected? selectedBoxStyle : notSelectedBoxStyle}
            >

            </div>
        </div>
    )
}