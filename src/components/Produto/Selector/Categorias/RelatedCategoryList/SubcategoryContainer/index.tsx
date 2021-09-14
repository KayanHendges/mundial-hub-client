import styles from './styles.module.scss'
import DropDownButton from '../../../../../Categorias/CategoryList/DropDownButton'
import { Children, useState } from 'react'
import AddMainCategory from '../AddMainCategory'

export default function SubcategoryContainer(props){

    console.log(props)

    const startValues = props.children.children.map(category => {
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

    function displayButton(id){
        if (props.values.related_categories.indexOf(id) > -1){
            return "flex"
        } else {
            return "none"
        }
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
        console.log("list", list)

        list.map(number => {
            if(props.values.related_categories.indexOf(number) > -1){
                childrenList.push(number)
            }
        })

        return childrenList
    }

    function renderCategory(category){
        let categories = []
        category.map(children => {
            if(props.values.related_categories.indexOf(children.hub_category_id) > -1){
                if(children.children != null){
                    categories.push(
                        <div
                        className={styles.categoryContainer}
                        key={children.hub_category_id}
                        >
                            <div
                            onMouseEnter={(e) => props.handleMainCategory(e, children.hub_category_id)}
                            onMouseLeave={(e) => props.handleMainCategory(e, children.hub_category_id)}
                            className={styles.categoryContent}
                            >
                                <div
                                className={styles.dropDown}
                                onClick={() => handleDisplay(children.hub_category_id)}
                                >
                                    <DropDownButton rotate={whatRotate(children.hub_category_id)}/>
                                </div>
                                <span
                                onClick={() => handleDisplay(children.hub_category_id)}
                                >
                                    {children.category_name}
                                </span>
                                <div
                                className={styles.buttonsContainer}
                                >
                                    <AddMainCategory 
                                    mainCategory={props.mainCategory}
                                    selectedCategory={props.values.mainCategoryId}
                                    id={children.hub_category_id}
                                    setValue={props.setValue}
                                    />
                                    <button
                                    type="button"
                                    style={{display: `${displayButton(children.hub_category_id)}`}}
                                    onClick={() => props.handleCategories(children.hub_category_id, childrenListId(children.hub_category_id), false)}
                                    className={styles.removeButton}
                                    >
                                        remover
                                    </button>
                                </div>
                            </div>
                            <div
                            className={styles.subcategoryContent}
                            style={{display: `${whatDisplay(children.hub_category_id)}`}}
                            >
                                {renderCategory(children.children)}
                            </div>
                        </div>
                    )
                } else {
                    categories.push(
                        <div
                        className={styles.categoryContainerNC} // No childrens
                        key={children.hub_category_id}
                        >
                            <div
                            className={styles.categoryContent}
                            onMouseEnter={(e) => props.handleMainCategory(e, children.hub_category_id)}
                            onMouseLeave={(e) => props.handleMainCategory(e, children.hub_category_id)}
                            >
                                <span>
                                    {children.category_name}
                                </span>
                                <div
                                className={styles.buttonsContainer}
                                >
                                    <AddMainCategory 
                                    mainCategory={props.mainCategory}
                                    selectedCategory={props.values.mainCategoryId}
                                    id={children.hub_category_id}
                                    setValue={props.setValue}
                                    />
                                    <button
                                    type="button"
                                    style={{display: `${displayButton(children.hub_category_id)}`}}
                                    onClick={() => props.handleCategories(children.hub_category_id, null, false)}
                                    className={styles.removeButton}
                                    >
                                        remover
                                    </button>
                                </div>
                            </div>
                        </div>
                    )
                }
            }
        })
        return categories
    }
    
    const list = renderCategory(props.children.children)
    
    renderCategory(props.children.children)
    return(
        <div
        className={styles.wrapper}
        key={props.children.hub_category_id}
        >
            {list}
        </div>
    )
}