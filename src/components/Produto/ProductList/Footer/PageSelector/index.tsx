import { useState } from 'react'
import styles from './styles.module.scss' 

export default function PageSelector(props){

    const pageList = () => {
        const arrayPages = []
        for(var page = 1; page <= props.pages.pages; page++){
            arrayPages.push(page)
        }
        return arrayPages
    }

    const [ pageStyle, setPageStyle ] = useState({
        dropList: false,
        displayList: "none",
        selectedPage: {
            backgroundColor: "var(--gray-5)",
            fontSize: ".8rem",
        }
    })

    function openPageList(boolean){
        if(!boolean){
            setPageStyle({
                displayList: "none",
                dropList: false,
                selectedPage: {
                    backgroundColor: "var(--gray-5)",
                    fontSize: ".8rem",
                }
            })
        } else {
            setPageStyle({
                displayList: "flex",
                dropList: true,
                selectedPage: {
                    backgroundColor: "var(--blue-button)",
                    fontSize: ".7rem",
                }
            })
        }
    }

    return(
        <div
        className={styles.pageContainer}
        onClick={() => openPageList(!pageStyle.dropList)}
        >
            <span
            className={styles.pageSpan}
            >
                pagina
            </span>
            <div
            className={styles.anchor}
            >
                <div
                className={styles.pageList}
                >
                    <div
                    className={styles.pageItemList}
                    style={{
                        display: `${pageStyle.displayList}`,
                    }}
                    >
                        {pageList().map((page, index) => {
                            if(page == props.pages.page){
                                return(
                                    <div
                                    key={1001}
                                    className={styles.pageSelectedItem}
                                    onClick={() => openPageList(!pageStyle.dropList)}
                                    >
                                        {page}
                                    </div>
                                )
                            } else {
                                if(index > 4 && (index+1) == pageList().length){
                                    return(
                                        <div
                                        key={index}
                                        style={{display: "flex", flexDirection: "column"}}
                                        >   
                                            <div
                                            className={styles.pageItem}
                                            onClick={() => {
                                                openPageList(!pageStyle.dropList)
                                                props.setPages({...props.pages, page: page})
                                                props.setSearch({...props.search, page: page})
                                            }}
                                            >
                                                {page}
                                            </div>
                                            <div
                                            className={styles.pageItem}
                                            >
                                                ...
                                            </div>
                                        </div>
                                    )
                                } 
                                
                                if(pageList().length > 5) {
                                    if(index < 3){
                                        return(
                                    
                                            <div
                                            key={index}
                                            className={styles.pageItem}
                                            onClick={() => {
                                                openPageList(!pageStyle.dropList)
                                                props.setPages({...props.pages, page: page})
                                                props.setSearch({...props.search, page: page})
                                            }}
                                            >
                                                {page}
                                            </div>
                                        )
                                    }
                                } else {
                                    return(
                                    
                                        <div
                                        key={index}
                                        className={styles.pageItem}
                                        onClick={() => {
                                            openPageList(!pageStyle.dropList)
                                            props.setPages({...props.pages, page: page})
                                            props.setSearch({...props.search, page: page})
                                        }}
                                        >
                                            {page}
                                        </div>
                                    )
                                }
                            }
                            
                        })}
                    </div>
                    <div
                    className={styles.selectedPage}
                    style={{
                        backgroundColor: `${pageStyle.selectedPage.backgroundColor}`,
                        fontSize: `${pageStyle.selectedPage.fontSize}`,
                    }}
                    onClick={() => openPageList(!pageStyle.dropList)}
                    >
                        {props.pages.page}
                    </div>
                </div>
            </div>
        </div>
    )
}