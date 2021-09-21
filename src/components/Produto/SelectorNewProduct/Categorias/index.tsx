import styles from './styles.module.scss'
import CategoryList from './CategoryList'
import RelatedCategoryList from './RelatedCategoryList'
import { useEffect, useState } from 'react'
import { api } from '../../../../services/api'

export default function Categorias(props){

    const [ mainCategory, setMainCategory ] = useState({
        display: "none",
        displayId: 0,
        text: "",
        borderColor: "1px solid var(--complementar-text)"
    })

    function mouseEnterContainer(e, id){
        if(e.type == "mouseenter"){
            setMainCategory({
                display: "flex",
                displayId: id,
                text: "incluir categoria principal",
                borderColor: "1px solid var(--white-text)"
            })
        }

        if(e.type == "mouseleave"){
            setMainCategory({
                display: "none",
                displayId: id,
                text: "incluir categoria principal",
                borderColor: "1px solid var(--complementar-text)"
            })
        }
        
    }

    if(props.categories != undefined){
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
                setValue={props.setValue}
                categories={props.categories}
                categoriesList={props.categoriesList}
                handleCategories={props.handleCategories}
                mainCategory={mainCategory}
                setMainCategory={setMainCategory}
                handleMainCategory={mouseEnterContainer}
                />
            </div>
        )
    } else {
        return(
            <div>
                nenhuma categoria foi encontrada
            </div>
        )
    }
    
}