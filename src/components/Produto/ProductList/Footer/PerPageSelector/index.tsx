import { useState } from 'react'
import styles from './styles.module.scss' 

export default function PerPageSelector(props){

    const options = [
        10,
        20,
        30,
        50
    ]

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
                resultados por página
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
                        {options.map((option, index) => {
                            if(option == props.pages.perPage){
                                return(
                                    <div
                                    key={1001}
                                    className={styles.pageSelectedItem}
                                    onClick={() => openPageList(!pageStyle.dropList)}
                                    >
                                        {option}
                                    </div>
                                )
                            } else {
                                return(
                                    
                                    <div
                                    key={index}
                                    className={styles.pageItem}
                                    onClick={() => {
                                        openPageList(!pageStyle.dropList)
                                        props.setPages({...props.pages, perPage: option, page: 1})
                                        props.setSearch({...props.search, perPage: option, page: 1})
                                    }}
                                    >
                                        {option}
                                    </div>
                                )
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
                        {props.pages.perPage}
                    </div>
                </div>
            </div>
        </div>
    )
}