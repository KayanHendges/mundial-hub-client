import { CSSProperties, useState } from 'react'
import { Pages, Search } from '../../../../pages/produtos'
import useWindowSize from '../../../../services/windowSize/useWindowSize'
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

    const [ open, setOpen ] = useState<boolean>(false)

    function getPagesArray(pages: number): number[]{
        
        const list: number[] = []

        for (let index = 1; index <= pages; index++) {
            list.push(index)
        }
        
        return list
    }

    function resultsText(): string{

        const { width } = useWindowSize()

        if(props.pages.resultsLength == undefined){
            return ''
        }

        if(props.pages.pages == 0){
            return ''
        }

        if(width > 730){
            return `foram encontrados ${props.pages.resultsLength} produtos`
        }

        return `${props.pages.resultsLength} produtos`
    }

    function wrapperStyles(): CSSProperties {

        const { width } = useWindowSize()

        if(width > 730){
            return {
                justifyContent: 'flex-end'
            }
        }

        if(width > 550){
            return {
                justifyContent: 'center'
            }
        }
        
        if(open){
            return {
                position: 'absolute',
                right: '0rem',
                bottom: '0rem',
                height: '15rem',
                gap: '2rem',
                paddingBottom: '2.3rem',
                flexDirection: 'column-reverse',
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                borderTop: 'none',
                background: 'linear-gradient(349deg, rgba(0,0,0,0.80) 50%, rgba(0,0,0,0) 80%)',
            }
        }

        if(!open){
            return {
                position: 'absolute',
                right: '0rem',
                bottom: '0rem',
                height: '15rem',
                paddingBottom: '0rem',
                flexDirection: 'column-reverse',
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                borderTop: 'none',
                background: 'linear-gradient(349deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 50%)',
            }
        }

    }

    function iconStyles(): CSSProperties {
        
        const { width } = useWindowSize()

        if(width > 550){
            return {
                display: 'none'
            }
        }
    }

    function checkOpacity(): number{
        const { width } = useWindowSize()
        
        if(width > 550){
            return 100
        }

        if(open){
            return 100
        }

        return 0
    }

    return(
        <div
        className={styles.wrapper}
        style={wrapperStyles()}
        >
            <span
            className="material-icons-outlined"
            id={styles.icon}
            style={iconStyles()}
            onClick={() => setOpen(!open)}
            >
                auto_stories
            </span>
            <span
            className={styles.results}
            style={{ opacity: `${checkOpacity()}%` }}
            >
                {resultsText()}
            </span>  
            <PageSelector
            opacity={checkOpacity()}
            label='pagina'
            pages={getPagesArray(props.pages.pages)}
            page={props.search.page}
            setPage={page => {
                props.setPages({...props.pages, page: page as number})
                props.setSearch({...props.search, page: page as number})
            }}
            />  
            <PageSelector
            opacity={checkOpacity()}
            label='produtos por paginas'
            pages={[10, 20, 30, 50]}
            page={props.search.perPage}
            setPage={page => {
                props.setPages({...props.pages, perPage: page as number})
                props.setSearch({...props.search, perPage: page as number})
            }}
            />
            
        </div>
    )
}