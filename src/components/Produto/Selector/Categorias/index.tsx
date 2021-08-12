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
            categories={props.categories}
            />
            <RelatedCategoryList
            categories={props.categories}
            />
        </div>
    )
}