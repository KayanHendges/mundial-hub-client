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
                                    onClick={() => props.handleCategories(category.hub_category_id, false)}
                                    >
                                        adicionar
                                    </button>
                                </div>
                                <div style={{display: `${whatDisplay(category.hub_category_id)}`}}>
                                    <SubcategoryContainer
                                    handleCategories={props.handleCategories}
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
                                onClick={() => handleDisplay(category.hub_category_id)}
                                className={styles.categoryContentNC}
                                >
                                    <span>
                                        {category.category_name}
                                    </span>
                                    <button
                                    onClick={() => props.handleCategories(category.hub_category_id, false)}
                                    >
                                        adicionar
                                    </button>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        </div>
    )
}