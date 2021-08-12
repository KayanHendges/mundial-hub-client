import { useState } from 'react'
import DropDownButton from '../../../../Categorias/CategoryList/DropDownButton'
import styles from './styles.module.scss'
import SubcategoryContainer from './SubcategoryContainer'


export default function relatedCategory(props){

    const startValues = props.categories.map(category => {
        return {
            hub_category_id: category.hub_category_id,
            displayChild: "none"
        }
    })

    const [ display, setDisplay ] = useState(startValues)

    function whatDisplay(id){
        let result = []
        display.map((category) => {
            if(category.hub_category_id == id){
                result.push(category.displayChild)
            }
        });
        return result[0]
    }
    
    function handleDisplay(id){
        let displayList = []
        display.map(category => {
            if(category.hub_category_id == id){
                if(category.displayChild == "none"){
                    const categoryDisplay = {
                        hub_category_id: category.hub_category_id,
                        displayChild: "flex"
                    }
                    displayList.push(categoryDisplay)
                } else {
                    const categoryDisplay = {
                        hub_category_id: category.hub_category_id,
                        displayChild: "none"
                    }
                    displayList.push(categoryDisplay)
                }
            } else {
                displayList.push(category)
            }
        })
        setDisplay(displayList)
    }

    return(
        <div
        className={styles.wrapper}
        >
            <div
            className={styles.header}
            >
                <span>
                    todas as Categorias
                </span>
            </div>
            <div
            className={styles.listContainer}
            >
                {props.categories.map(category => {
                    if(category.children != null){
                        return(
                            <div
                            className={styles.categoryContainer}
                            key={category.hub_category_id}
                            >
                                <div
                                className={styles.categoryContent}
                                >
                                    <div
                                    className={styles.dropDown}
                                    onClick={() => handleDisplay(category.hub_category_id)}
                                    >
                                        <DropDownButton />
                                    </div>
                                    <span>
                                        {category.category_name}
                                    </span>
                                </div>
                                <div style={{display: `${whatDisplay(category.hub_category_id)}`}}>
                                    <SubcategoryContainer
                                    children={category}
                                    />
                                </div>
                            </div>
                        )
                    } else {
                        return(
                            <div
                            className={styles.categoryContainer}
                            key={category.hub_category_id}
                            >
                                <div
                                className={styles.categoryContent}
                                >
                                    {category.category_name}
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}