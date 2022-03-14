import { useContext, useState } from 'react'
import { Category, CategoryTree } from '../../..'
import { NewProductContext } from '../../../../../../../../contexts/NewProductContext'
import HandleCategoryButton from '../../../HandleCategoryButton'
import MainCategoryButton from '../../MainCategoryButton'
import styles from './styles.module.scss'

type ChildrenProps = {
    subcategory: CategoryTree
    open: boolean;
    removeRelatedCategory(category: Category): void;
    hoverCategory: number;
    setHoverCategory(hoverCategory: number): void;
}

export default function Children(props: ChildrenProps){

    const { unitaryDetails, setUnitaryDetails } = useContext(NewProductContext)

    const [ hover, setHover ] = useState(false)

    if(props.open && unitaryDetails.related_categories.includes(props.subcategory.hub_category_id)){
        return (
            <div
            className={styles.wrapper}
            >
                <div
                className={styles.childrenContainer}
                onMouseEnter={() => {
                    setHover(true)
                    props.setHoverCategory(props.subcategory.hub_category_id)
                }}
                onMouseLeave={() => {
                    setHover(false)
                    props.setHoverCategory(-1)
                }}
                >
                    <div
                    className={styles.childrenName}
                    >
                        {props.subcategory.category_name}
                    </div>
                    <HandleCategoryButton
                    text='remover'
                    onClickFunction={() => {
                        props.removeRelatedCategory(props.subcategory)
                    }}
                    display={hover}
                    />
                    <MainCategoryButton
                    text={'categoria principal'}
                    hubId={props.subcategory.hub_category_id}
                    hoverCategory={props.hoverCategory}
                    setHoverCategory={props.setHoverCategory}
                    />
                </div>
            </div>
        )
    } else {
        return <></>
    }
}