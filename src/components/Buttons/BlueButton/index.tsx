import styles from './styles.module.scss'

export default function BlueButton (props) {
    return (
        <button 
        className={styles.button}
        type="button"
        onClick={() => props.onClick()}
        >
            {props.text}
        </button>
    )
}