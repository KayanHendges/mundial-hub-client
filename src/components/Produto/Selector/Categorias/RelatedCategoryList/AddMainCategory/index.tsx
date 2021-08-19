import styles from './styles.module.scss'

export default function AddMainCategory(props){

    return(
        <button
        className={styles.button}
        style={{
            display: `${props.display}`,
            border: `${props.borderColor}`
        }}
        type="button"
        >
            <span
            className={styles.addIcon}
            >
                +
            </span>
            {props.text}
        </button>
    )
}