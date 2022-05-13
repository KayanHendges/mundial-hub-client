import { MouseEvent } from 'react';
import styles from './styles.module.scss'

type Props = {
    text: string
    action(e: MouseEvent): any;
}

export default function BlueButtonAction (props: Props) {

    return (
        <button 
        className={styles.button}
        onClick={e => props.action(e)}
        type="button"
        >
            {props.text}
        </button>
    )
}