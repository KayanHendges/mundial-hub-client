import styles from './styles.module.scss'
import DefaultInput from '../../../Inputs/DefaultInput'

export default function SearchForm(props){

    return(
        <div
        className={styles.wrapper}
        >
            <div
            className={styles.rowInput}
            >
                <DefaultInput
                width="100%"
                label=""
                name="search"
                placeholder="pesquise por nome, referencia ou categoria..."
                required=""
                value={props.search.searchInput}
                onChange={props.onChange}
                />
            </div>
            <div
            className={styles.rowInput}
            >
                <button
                className={styles.submitButton}
                type="button"
                >
                    filtrar
                </button>
            </div>
        </div>
    )
}   