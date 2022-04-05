import styles from './styles.module.scss' 
import { Pages, Search } from '../../../../../pages/produtos'
import { CSSProperties, useEffect, useState } from 'react'

type Props = {
    search: Search,
    setSearch(search: Search): void,
    pages: Pages,
    setPages(pages: Pages): void;
}

type SelectorStyles = {
    pages: CSSProperties,
    selectedPage: CSSProperties,
}

export default function PageSelector(props: Props){
    
    const [ allPages, setAllPages ] = useState<number[]>([]) 

    const closedStyles: SelectorStyles = {
        pages: {
            // position: 'relative',
            width: '2rem',
        },
        selectedPage: {}
    }
    
    const openStyle: SelectorStyles = {
        pages: {
            // position: 'absolute',
            width: `${allPages.length * 2}rem`
        },
        selectedPage: {
            color: 'var(--white-text)',
            backgroundColor: 'var(--gray-4)'
        }
    }
    
    const [ expand, setExpand ] = useState<boolean>(false)
    const [ selectorStyles, setSelectorStyles ] = useState<SelectorStyles>(closedStyles)
    
    useEffect(() => {

        if(expand){
            setSelectorStyles(openStyle)
        }

        if(!expand){
            setSelectorStyles(closedStyles)
        }

    }, [expand])

    useEffect(() => {
        const pages = []

        for (let index = 0; index < props.pages.pages; index++) {
            pages.push(index+1)            
        }

        setAllPages(pages)
    }, [props.pages.pages])

    return (
        <div
        className={styles.wrapper}
        >
            <span
            className={styles.label}
            >
                pagina
            </span>
            <div
            className={styles.pages}
            style={selectorStyles.pages}
            >
                <div
                className={styles.pagesList}
                >
                    {allPages.map(page => {

                        if(page == props.pages.page){
                            return (
                                <span
                                className={styles.selectedPage}
                                style={selectorStyles.selectedPage}
                                onClick={() => {
                                    setExpand(!expand)
                                }}
                                key={page}
                                >
                                    {page}
                                </span>
                            )
                        }

                        if(!expand){
                            return
                        }

                        if(page < props.pages.page || page > props.pages.page){
                            return (
                                <span
                                className={styles.page}
                                onClick={() => {
                                    setExpand(!expand)
                                }}
                                key={page}

                                >
                                    {page}
                                </span>
                            )
                        }
                    })}
                </div>
            </div>   
        </div>
    )
}