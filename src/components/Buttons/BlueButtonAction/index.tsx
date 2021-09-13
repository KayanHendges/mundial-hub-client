import styles from './styles.module.scss'

export default function BlueButtonAction (props) {

    return (
        <button 
        className={styles.button}
        onClick={() => props.action()}
        type="button"
        >
            {props.text}
        </button>
    )
}