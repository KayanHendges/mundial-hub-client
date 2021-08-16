import styles from './styles.module.scss'
import CategoryList from './CategoryList'
import RelatedCategoryList from './RelatedCategoryList'


export default function Categorias(props){

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
            />
        </div>
    )
}