import Link from 'next/link'
import styles from './styles.module.scss'

export default function LinkBlueButton (props) {
    return (
        <Link
        href={props.href}
        >
            <button 
            className={styles.button}
            type="button"
            >
                {props.text}
            </button>
        </Link>
    )
}