import styles from './styles.module.scss'

export default function SubcategoryContainer(props){
    function hasChildren(category, padding){
        let list = []
        category.map(children => {
            console.log(children.category_name, padding)
            if(children.children != null){
                list.push(
                    <div
                    className={styles.container}
                    key={children.hub_category_id}
                    >
                        <div
                        className={styles.subcategoryContainer}
                        style={{paddingLeft: `${padding}rem`}}
                        >
                            <span className={styles.categoryId}>
                                {children.hub_category_id}
                            </span>
                            <span className={styles.categoryName}>
                                {children.category_name}
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
                        {hasChildren(children.children, padding + 2)}
                    </div>
                )
            } else {
                let count = padding
                console.log(category.length)
                if(category.length > 1){
                    count = padding -2
                }
                list.push(
                    <div
                    className={styles.container}
                    key={children.hub_category_id}
                    >
                        <div
                        className={styles.subcategoryContainer}
                        style={{paddingLeft: `${count}rem`}}
                        >
                            <span className={styles.categoryId}>
                                {children.hub_category_id}
                            </span>
                            <span className={styles.categoryName}>
                                {children.category_name}
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
            }
        })
        return list
    }
    const itens = hasChildren(props.children, 2)


    return(
        <div className={styles.wrapper}>
            {itens}
        </div>
    )
}