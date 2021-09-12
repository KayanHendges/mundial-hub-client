import styles from './styles.module.scss'

export default function PopUp(props){

    return(
        <div
        className={styles.wrapper}
        >
            <div
            className={styles.options}
            >
                ...
            </div>
            <div
            className={styles.popUp}
            >
                <span
                className={styles.newSubCategory}
                >
                    incluir subcategoria
                </span>
                <span
                className={styles.delete}
                >
                    excluir
                </span>
            </div>
        </div>
    )
}