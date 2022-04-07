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

    function getPagesArray(pages: number): number[]{
        
        const list: number[] = []

        for (let index = 1; index <= pages; index++) {
            list.push(index)
        }
        
        return list
    }

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
                label='pagina'
                pages={getPagesArray(props.pages.pages)}
                page={props.search.page}
                setPage={page => {
                    props.setPages({...props.pages, page: page as number})
                    props.setSearch({...props.search, page: page as number})
                }}
                />
                <PageSelector
                label='produtos por paginas'
                pages={[10, 20, 30, 50]}
                page={props.search.perPage}
                setPage={page => {
                    props.setPages({...props.pages, perPage: page as number})
                    props.setSearch({...props.search, perPage: page as number})
                }}
                />
            </div>
        </div>
    )
}