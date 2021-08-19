import styles from './styles.module.scss'
import CategoryList from './CategoryList'
import RelatedCategoryList from './RelatedCategoryList'
import { useState } from 'react'

export default function Categorias(props){

    const [ mainCategory, setMainCategory ] = useState({
        display: "none",
        text: "",
        borderColor: "1px solid var(--complementar-text)"
    })

    function mouseEnterContainer(e){
        console.log(e.type)

        if(e.type == "mouseenter"){
            setMainCategory({
                display: "flex",
                text: "incluir categoria principal",
                borderColor: "1px solid var(--white-text)"
            })
        }

        if(e.type == "mouseleave"){
            setMainCategory({
                display: "none",
                text: "incluir categoria principal",
                borderColor: "1px solid var(--complementar-text)"
            })
        }
        
    }

    return(
        <div
        className={styles.wrapper}
        style={{display:`${props.display.display}`}}
        >
            <CategoryList
            values={props.values}
            categories={props.categories}
            handleCategories={props.handleCategories}
            />
            <RelatedCategoryList
            values={props.values}
            categories={props.categories}
            categoriesList={props.categoriesList}
            handleCategories={props.handleCategories}
            mainCategory={mainCategory}
            setMainCategory={setMainCategory}
            handleMainCategory={mouseEnterContainer}
            />
        </div>
    )
}