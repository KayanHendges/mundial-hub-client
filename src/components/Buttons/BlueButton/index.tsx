import styles from './styles.module.scss'

export default function BlueButton (props) {
    return (
        <button 
        className={styles.button}
        type="submit"
        >
            {props.text}
        </button>
    )
}