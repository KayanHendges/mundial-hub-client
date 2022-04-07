import styles from './styles.module.scss' 
import { Pages, Search } from '../../../../../pages/produtos'
import { CSSProperties, useEffect, useState, WheelEvent } from 'react'

type Page = string | number 

type Props = {
    label: string
    page: Page,
    setPage(page: Page): void,
    pages: Page[],
    display?: 'flex' | 'none',
    opacity?: number,
}

type SelectorStyles = {
    pages: CSSProperties,
    pagesList: CSSProperties,
    selectedPage: CSSProperties,
}

export default function  PageSelector(props: Props){
    
    const wrapperStyles: CSSProperties = {
        opacity: `${props.opacity}%`,
        display: `${props.display? props.display : 'flex' }`,
    }

    const closedStyles: SelectorStyles = {
        pages: {
            width: 'calc(2rem + 2px)',
        },
        pagesList: {},
        selectedPage: {},
    }
    
    const openStyle: SelectorStyles = {
        pages: {
            width: `${props.pages.length * 2}rem`
        },
        pagesList: {},
        selectedPage: {
            color: 'var(--white-text)',
            backgroundColor: 'var(--gray-4)'
        }
    }
    
    const [ expand, setExpand ] = useState<boolean>(false)
    const [ selectorStyles, setSelectorStyles ] = useState<SelectorStyles>(closedStyles)
    const [ pagesListPosition, setPagesListPosition ] = useState<number>(0)
    const [ displayRightArrow, setDisplayRightArrow ] = useState<boolean>(false)
    const [ displayLeftArrow, setDisplayLeftArrow ] = useState<boolean>(false)
    const [ notSelectedPageStyle, setNotSelectedPageStyle ] = useState<CSSProperties>({
        display: 'none'
    })
    
    useEffect(() => {

        if(expand){
            setSelectorStyles(openStyle)
            setNotSelectedPageStyle({ display: 'flex' })
            if(props.pages.length >= 10){
                setDisplayRightArrow(true)
            }
        }

        if(!expand){
            setSelectorStyles(closedStyles)
            setPagesListPosition(0)
            setTimeout(() => {
                setNotSelectedPageStyle({ display: 'none' })
            }, 100)

            setDisplayLeftArrow(false)
            setDisplayRightArrow(false)
        }

    }, [expand])

    useEffect(() => {

        setExpand(false)

    }, [props.page])

    useEffect(() => {

        if(pagesListPosition < -22){
            setDisplayLeftArrow(true)
        } else {
            setDisplayLeftArrow(false)
        }

        const container = document.querySelector('#pages')
        const containerWidth = container? container.clientWidth - (container.clientWidth*2) : 0
        
        const pagesList = document.querySelector('#pagesList')
        const pagesListWidth = pagesList? pagesList.clientWidth - (pagesList.clientWidth*2) : 0

        const maxPosition = pagesListWidth - containerWidth

        const difference = Math.abs(pagesListPosition - maxPosition)

        if(difference > 22 && expand){
            setDisplayRightArrow(true)
            return
        }

    }, [pagesListPosition])

    function handleScrollList(event: WheelEvent){
        if(!expand){
            return
        }

        if(event.deltaY > 0){ // scroll para baixo
            handleListPosition('left', 20)
        } 
        
        if(event.deltaY < 0) { // scroll para cima
            handleListPosition('right', 20)
        }
    }

    function handleListPosition(direction: 'right' | 'left', speed?: number){

        const container = document.querySelector('#pages')
        const containerWidth = container? container.clientWidth - (container.clientWidth*2) : 0
        
        const pagesList = document.querySelector('#pagesList')
        const pagesListWidth = pagesList? pagesList.clientWidth - (pagesList.clientWidth*2) : 0

        const speedControl = speed? speed : containerWidth * 0.9

        if(direction == 'left'){
            const difference = Math.abs(pagesListPosition - 0)

            if(difference < speedControl){
                setPagesListPosition(pagesListPosition + difference)
                return
            }
            setPagesListPosition(pagesListPosition+speedControl)
        }

        if(direction == 'right'){

            const maxPosition = pagesListWidth - containerWidth

            const difference = Math.abs(pagesListPosition - maxPosition)

            if(difference < speedControl){
                setPagesListPosition(pagesListPosition-difference)
                setDisplayRightArrow(false)
                return
            }
            setDisplayRightArrow(true)
            setPagesListPosition(pagesListPosition-speedControl)

        }
    }

    return (
        <div
        className={styles.wrapper}
        style={wrapperStyles}
        >
            <span
            className={styles.label}
            >
                {props.label}
            </span>
            <div
            className={styles.pages}
            style={selectorStyles.pages}
            id='pages'
            onWheel={(e) => handleScrollList(e)}
            onMouseLeave={() => setExpand(false)}
            >
                <span
                className='material-icons-round'
                id={styles.arrow}
                style={{ 
                    display: `${displayLeftArrow? 'flex' : 'none'}`,
                    left: '0',
                    backgroundImage: 'linear-gradient(to right, var(--gray-2) 50%, transparent 100%)'
                }}
                onClick={() => handleListPosition('left', 200)}
                >
                    arrow_back_ios
                </span>
                <div
                className={styles.pagesList}
                style={{ left: `${pagesListPosition}px` }}
                id='pagesList'
                >
                    
                    {props.pages.map((page, index) => {

                        if(page == props.page){
                            return (
                                <span
                                className={styles.selectedPage}
                                style={selectorStyles.selectedPage}
                                onClick={() => {
                                    setExpand(!expand)
                                    if(!expand){
                                        setTimeout(() => {
                                            if(index > 5){
                                                handleListPosition('right', (index-4)*31)
                                            }
                                        }, 1)
                                    }
                                }}
                                key={page}
                                >
                                    {page}
                                </span>
                            )
                        }

                        if(page < props.page || page > props.page){
                            return (
                                <span
                                className={styles.page}
                                style={notSelectedPageStyle}
                                onClick={() => {
                                    props.setPage(page)
                                }}
                                key={page}
                                >
                                    {page}
                                </span>
                            )
                        }
                    })}
                </div>
                <span
                className='material-icons-round'
                id={styles.arrow}
                style={{ 
                    display: `${displayRightArrow? 'flex' : 'none'}`,
                    right: '0',
                    backgroundImage: 'linear-gradient(to left, var(--gray-2) 50%, transparent 100%)'
                }}
                onClick={() => handleListPosition('right', 200)}
                >
                    arrow_forward_ios
                </span>
            </div>   
        </div>
    )
}