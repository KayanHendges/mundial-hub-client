import styles from './styles.module.scss'

export default function SubcategoryContainer(props){
    function hasChildren(category){
        if(category != null){
            let list = []
            category.map(children => {
                list.push(
                    <div key={children.key}>
                        {children.category_name}
                        {hasChildren(children.children)}
                    </div>
                )
            })
            return list
        }
    }
    console.log(props.children)
    const itens = hasChildren(props.children)
    console.log(itens)


    return(
        <div key={props.children[0].hub_category_id}>
            {props.children[0].hub_category_id}
            {itens}
        </div>
    )
}