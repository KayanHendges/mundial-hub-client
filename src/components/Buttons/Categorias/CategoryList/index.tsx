import styles from './styles.module.scss'
import SubcategoryContainer from './SubcategoryContainer'

export default function CategoryList(props){
    return(
        <div
        className={styles.wrapper}
        >
            {props.categories.map(category => {
                if(category.children == null) {
                    return(
                        <div key={category.hub_category_id}>
                            <div
                            className={styles.categoryContainer}
                            >
                                <span className={styles.categoryId}>
                                    {category.hub_category_id}
                                </span>
                                <span className={styles.categoryName}>
                                    {category.category_name}
                                </span>
                                <div className={styles.buttons}>
                                    <div className={styles.more}>
                                        <span>
                                            ...
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                } else {

                    return(
                        <div key={category.hub_category_id}>
                            <div
                            className={styles.categoryContainer}
                            >
                                <span className={styles.categoryId}>
                                    {category.hub_category_id}
                                </span>
                                <span className={styles.categoryName}>
                                    {category.category_name}
                                </span>
                                <div className={styles.buttons}>
                                    <div className={styles.showSubcategory}>
                                        {">"}
                                    </div>
                                    <div className={styles.more}>
                                        <span>
                                            ...
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <SubcategoryContainer
                            children={category.children}
                            />
                        </div>
                    )
                }
            })}
        </div>
    )
}