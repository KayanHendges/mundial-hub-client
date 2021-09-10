import PageSelector from './PageSelector'
import PerPageSelector from './PerPageSelector'
import styles from './styles.module.scss'

export default function Footer(props){
    return(
        <div
        className={styles.wrapper}
        >
            <span
            className={styles.results}
            >
                {`foram encontrados ${props.pages.resultsLength} produtos`}
            </span>
            <div
            className={styles.inputs}
            >
                <PageSelector
                pages={props.pages}
                setPages={props.setPages}
                search={props.search}
                setSearch={props.setSearch}
                />
                <PerPageSelector
                pages={props.pages}
                setPages={props.setPages}
                search={props.search}
                setSearch={props.setSearch}
                />
            </div>
        </div>
    )
}