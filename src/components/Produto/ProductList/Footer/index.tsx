import { Pages, Search } from '../../../../pages/produtos'
import PageSelector from './PageSelector'
import PerPageSelector from './PerPageSelector'
import styles from './styles.module.scss'

type Props = {
    search: Search,
    setSearch(search: Search): void,
    pages: Pages,
    setPages(pages: Pages): void;
}

export default function Footer(props: Props){

    return(
        <div
        className={styles.wrapper}
        >
            <span
            className={styles.results}
            >
                {`foram encontrados ${props.pages.resultLength == undefined ? "0" : props.pages.resultLength} produtos`}
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