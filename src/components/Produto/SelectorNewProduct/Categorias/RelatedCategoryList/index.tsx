import { useEffect, useState } from 'react'
import DropDownButton from '../../../../Categorias/CategoryList/DropDownButton'
import styles from './styles.module.scss'
import SubcategoryContainer from './SubcategoryContainer'
import AddMainCategory from './AddMainCategory'


export default function RelatedCategories(props){
    
    const [ display, setDisplay ] = useState([])

    useEffect(() => {
        const startValues = props.categories.map(category => {
            return {
                hub_category_id: category.hub_category_id,
                displayChild: "flex",
                rotate: "rotate(90deg)"
            }
        })
        setDisplay(startValues)
    }, [props.categories])


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
        console.log(id)
        let list = []
        let childrenList = []
        const hubList = []

        function myChildrens(parentId){
            props.categoriesList.map(category => {
                if(category.tray_category_parent_id == parentId){
                    list.push(category.tray_category_id)
                    myChildrens(category.tray_category_id)
                }
            })
        }

        myChildrens(id)

        list.map(trayId => {
            props.categoriesList.map(category => {
                if(category.tray_category_id == trayId){
                    hubList.push(category.hub_category_id)
                }
            })
        })

        hubList.map(number => {
            if(props.values.related_categories.indexOf(number) > -1){
                childrenList.push(number)
            }
        })

        console.log(list, hubList, childrenList)

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
                                    onMouseEnter={(e) => props.handleMainCategory(e, category.hub_category_id)}
                                    onMouseLeave={(e) => props.handleMainCategory(e, category.hub_category_id)}
                                    >
                                        <div
                                        onClick={() => handleDisplay(category.hub_category_id)}
                                        className={styles.dropDown}
                                        >
                                            <DropDownButton
                                            rotate={whatRotate(category.hub_category_id)}
                                            />
                                        </div>
                                        <span
                                        onClick={() => handleDisplay(category.hub_category_id)}
                                        >
                                            {category.category_name}
                                        </span>
                                        <div
                                        className={styles.buttonsContainer}
                                        >
                                            <AddMainCategory 
                                            mainCategory={props.mainCategory}
                                            selectedCategory={props.values.mainCategoryId}
                                            id={category.hub_category_id}
                                            setValue={props.setValue}
                                            />
                                            <button
                                            type="button"
                                            onClick={() => props.handleCategories(category.hub_category_id, childrenListId(category.tray_category_id), false)}
                                            className={styles.removeButton}
                                            >
                                                remover
                                            </button>
                                        </div>
                                    </div>
                                    <div style={{display: `${whatDisplay(category.hub_category_id)}`}}>
                                        <SubcategoryContainer
                                        handleCategories={props.handleCategories}
                                        children={category}
                                        categoriesList={props.categoriesList}
                                        values={props.values}
                                        setValue={props.setValue}
                                        mainCategory={props.mainCategory}
                                        handleMainCategory={props.handleMainCategory}
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
                                    className={styles.categoryContentNC}
                                    onMouseEnter={(e) => props.handleMainCategory(e, category.hub_category_id)}
                                    onMouseLeave={(e) => props.handleMainCategory(e, category.hub_category_id)}
                                    >
                                        <span>
                                            {category.category_name}
                                        </span>
                                        <div
                                        className={styles.buttonsContainer}
                                        >
                                            <AddMainCategory 
                                            mainCategory={props.mainCategory}
                                            selectedCategory={props.values.mainCategoryId}
                                            id={category.hub_category_id}
                                            setValue={props.setValue}
                                            />
                                            <button
                                            type="button"
                                            onClick={() => props.handleCategories(category.hub_category_id, childrenListId(category.hub_category_id), false)}
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
                })}
            </div>
        </div>
    )
}