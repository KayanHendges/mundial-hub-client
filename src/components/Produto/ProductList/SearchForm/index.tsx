import styles from './styles.module.scss'
import InputSearch from './InputSearch'
import CheckBox from './CheckBox'

export default function SearchForm(props){


    return(
        <div
        className={styles.wrapper}
        >
            <div
            className={styles.rowInput}
            >
                <InputSearch
                width="100%"
                label=""
                name="searchInput"
                placeholder="pesquise por nome, referencia ou categoria..."
                required=""
                value={props.search.searchInput}
                onChange={props.onChange}
                leaveInput={props.sendSearch}
                />
            </div>
            <div
            className={styles.rowInput}
            >
                <CheckBox 
                label="mostrar kits"
                setValue={props.setValue}
                stateKey="showKits"
                value={props.search.showKits}
                />
                <button
                className={styles.submitButton}
                type="button"
                onClick={() => props.sendSearch()}
                >
                    filtrar
                </button>
            </div>
            <div
            className={styles.rowPage}
            >
            </div>
        </div>
    )
}   