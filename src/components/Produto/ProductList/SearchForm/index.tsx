import styles from './styles.module.scss'
import InputSearch from './InputSearch'

export default function SearchForm(props){

    const pages = () => {
        const arrayPages = []
        for(var page = 1; page <= props.pages.pages; page++){
            arrayPages.push(page)
        }
        return arrayPages
    }

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
                <button
                className={styles.submitButton}
                type="button"
                >
                    filtrar
                </button>
            </div>
            <div
            className={styles.rowPage}
            >
                <div
                className={styles.pageContainer}
                >
                    <div
                    className={styles.pageList}
                    >
                        <div
                        className={styles.selectedPage}
                        >
                            {props.pages.page}
                        </div>
                        {pages().map(page => {
                            return(
                                <div
                                key={page}
                                className={styles.pageItem}
                                >
                                    {page}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}   