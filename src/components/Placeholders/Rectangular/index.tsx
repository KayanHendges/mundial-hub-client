import { CSSProperties } from 'react'
import styles from './styles.module.scss'

type Props = {
    display?: string;
    width?: string,
    height?: string,
}

export default function RectangularPlaceholder(props: Props) {

    const containerStyles: CSSProperties = {
        display: props.display? props.display : 'flex',
        width: props.width? props.width : '100%',
        height: props.height? props.height : '100%',
    }

    return (
        <div
        className={styles.placeholder}
        style={containerStyles}
        />
    )
}