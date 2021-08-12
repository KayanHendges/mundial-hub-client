import styles from './styles.module.scss'
import DropDownButton from '../../../../../Categorias/CategoryList/DropDownButton'
import { useState } from 'react'

export default function SubcategoryContainer(props){

    const startValues = props.children.children.map(category => {
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
            console.log(id, category)
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

    function renderCategory(category){
        let categories = []
        category.map(children => {
            if(children.children != null){
                categories.push(
                    <div
                    className={styles.categoryContainer}
                    key={children.hub_category_id}
                    >
                        <div
                        className={styles.categoryContent}
                        >
                            <div
                            className={styles.dropDown}
                            onClick={() => handleDisplay(children.hub_category_id)}
                            >
                                <DropDownButton />
                            </div>
                            <span>
                                {children.category_name}
                            </span>
                            <button>
                                adicionar
                            </button>
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
                    className={styles.categoryContainer}
                    key={children.hub_category_id}
                    >
                        <div
                        className={styles.categoryContent}
                        >
                            <span>
                                {children.category_name}
                            </span>
                        </div>
                    </div>
                )
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