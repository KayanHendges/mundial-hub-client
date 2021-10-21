import { useState } from 'react'
import DropDownButton from '../../DropDownButton'
import PopUp from '../../PopUp'
import styles from './styles.module.scss'

export default function SubcategoryContainer(props){

    const startValues = props.children.children.map(category => {
        return {
            hub_category_id: category.hub_category_id,
            displayChild: "none",
            rotate: "rotate(0deg)"
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

    function renderCategory(category){
        let categories = []
        category.map((children, index) => {
            var border = "1px solid var(--gray-line)"
            if((index) == 0){
                border = "none"
            }
            if(children.children != null){
                categories.push(
                    <div
                    className={styles.categoryContainer}
                    key={children.hub_category_id}
                    >
                        <div
                        style={{borderTop: `${border}`}}
                        className={styles.categoryContent}
                        >  
                            <div
                            className={styles.leftContent}
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
                                    {children.order_list} - {children.category_name}
                                </span>
                            </div>
                            <div
                            className={styles.buttons}
                            >
                                <PopUp 
                                hubCategoryId={category.hub_category_id}
                                />
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
                    className={styles.categoryContainerNC}
                    key={children.hub_category_id}
                    >
                        <div
                        style={{borderTop: `1px solid var(--gray-line)`}}
                        className={styles.categoryContentNC}
                        >
                            <div
                            className={styles.leftContentNC}
                            >
                                <span>
                                    {children.order_list} - {children.category_name}
                                </span> 
                            </div>
                            <div
                            className={styles.buttons}
                            >
                                <PopUp 
                                hubCategoryId={children.hub_category_id}
                                />
                            </div>
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