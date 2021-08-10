import { useState } from 'react'
import styles from './styles.module.scss'

import DropDownButton from './DropDownButton'
import PopUp from './PopUp'
import SubcategoryContainer from './SubcategoryContainer'

export default function CategoryList(props){
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
    if(props.categories.length > 0){
        return(
            <div
            className={styles.wrapper}
            >
                {props.categories.map(category => {
                    if(category.children == null) {
                        return(
                            <div key={category.hub_category_id}>
                                <div
                                className={styles.categoryContainer}
                                >
                                    <span className={styles.categoryId}>
                                        {category.hub_category_id}
                                    </span>
                                    <span className={styles.categoryName}>
                                        {category.category_name}
                                    </span>
                                    <div className={styles.buttons}>
                                        <PopUp
                                        categoryId={category.hub_category_id}
                                        category={category}
                                        />
                                    </div>
                                </div>
                            </div>
                        )
                    } else {
                        return(
                            <div key={category.hub_category_id}>
                                <div
                                className={styles.categoryContainer}
                                >
                                    <span className={styles.categoryId}>
                                        {category.hub_category_id}
                                    </span>
                                    <span className={styles.categoryName}>
                                        {category.category_name}
                                    </span>
                                    <div className={styles.buttons}>
                                        <PopUp
                                        categoryId={category.hub_category_id}
                                        category={category}
                                        />
                                        <div
                                        className={styles.dropDown}
                                        onClick={() => handleDisplay(category.hub_category_id)}
                                        >
                                            <DropDownButton />
                                        </div>
                                    </div>
                                </div>
                                <div style={{display: `${whatDisplay(category.hub_category_id)}`}}>
                                    <SubcategoryContainer
                                    children={category.children}
                                    />
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        )
    } else {
        return (
            <div
            className={styles.wrapper}
            >
                <h1>ainda não há categorias cadastradas</h1>
            </div>
        )
    }
}