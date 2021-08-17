import { useState } from 'react'
import DropDownButton from '../../../../Categorias/CategoryList/DropDownButton'
import styles from './styles.module.scss'
import SubcategoryContainer from './SubcategoryContainer'


export default function RelatedCategories(props){    

    const startValues = props.categories.map(category => {
        return {
            hub_category_id: category.hub_category_id,
            displayChild: "flex",
            rotate: "rotate(90deg)"
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

    function whatRotate(id){
        let result = []
        display.map((category) => {
            if(category.hub_category_id == id){
                result.push(category.rotate)
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
                        displayChild: "flex",
                        rotate: "rotate(90deg)"
                    }
                    displayList.push(categoryDisplay)
                } else {
                    const categoryDisplay = {
                        hub_category_id: category.hub_category_id,
                        displayChild: "none",
                        rotate: "rotate(0deg)"
                    }
                    displayList.push(categoryDisplay)
                }
            } else {
                displayList.push(category)
            }
        })
        setDisplay(displayList)
    }

    function childrenListId(id){
        let list = []
        let childrenList = []

        function myChildrens(parentId){
            props.categoriesList.map(category => {
                if(category.category_parent_id == parentId){
                    list.push(category.hub_category_id)
                    if(category.children != null){
                        myChildrens(category.hub_category_id)
                    }
                }
            })
        }

        myChildrens(id)

        list.map(number => {
            if(props.values.related_categories.indexOf(number) > -1){
                childrenList.push(number)
            }
        })

        return childrenList
    }

    return(
        <div
        className={styles.wrapper}
        >
            <div
            className={styles.header}
            >
                <span>
                    categorias selecionadas
                </span>
            </div>
            <div
            className={styles.listContainer}
            >
                {props.categories.map(category => {
                    if(props.values.related_categories.indexOf(category.hub_category_id) > -1){
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
                                        onClick={() => handleDisplay(category.hub_category_id)}
                                        className={styles.dropDown}
                                        >
                                            <DropDownButton rotate={whatRotate(category.hub_category_id)}/>
                                        </div>
                                        <span
                                        onClick={() => handleDisplay(category.hub_category_id)}
                                        >
                                            {category.category_name}
                                        </span>
                                        <button
                                        type="button"
                                        onClick={() => props.handleCategories(category.hub_category_id, childrenListId(category.hub_category_id), false)}
                                        >
                                            remover
                                        </button>
                                    </div>
                                    <div style={{display: `${whatDisplay(category.hub_category_id)}`}}>
                                        <SubcategoryContainer
                                        handleCategories={props.handleCategories}
                                        children={category}
                                        categoriesList={props.categoriesList}
                                        values={props.values}
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
                                    onClick={() => handleDisplay(category.hub_category_id)}
                                    className={styles.categoryContentNC}
                                    >
                                        <span>
                                            {category.category_name}
                                        </span>
                                        <button
                                        type="button"
                                        onClick={() => props.handleCategories(category.hub_category_id, null, false)}
                                        >
                                            remover
                                        </button>
                                    </div>
                                </div>
                            )
                        }
                    }                    
                })}
            </div>
        </div>
    )
}