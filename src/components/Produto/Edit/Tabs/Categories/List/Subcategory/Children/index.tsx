import { useContext } from 'react'
import { Category, CategoryTree } from '../../..'
import { NewProductContext } from '../../../../../../../../contexts/NewProductContext'
import HandleCategoryButton from '../../../HandleCategoryButton'
import styles from './styles.module.scss'

type ChildrenProps = {
    subcategory: CategoryTree
    open: boolean;
    addRelatedCategory(category: Category): void;
}

export default function Children(props: ChildrenProps){

    const { unitaryDetails, setUnitaryDetails } = useContext(NewProductContext)

    function verifyDisplay(hubId: number): boolean{
        if(unitaryDetails.related_categories.includes(hubId)){
            return false
        } else {
            return true
        }
    }

    if(props.open){
        return (
            <div
            className={styles.wrapper}
            // style={{ display: `${props.open? 'display:' : 'none'}` }}
            >
                <div
                className={styles.childrenContainer}
                >
                    <div
                    className={styles.childrenName}
                    >
                        {props.subcategory.category_name}
                    </div>
                    <HandleCategoryButton
                    text='adicionar'
                    onClickFunction={() => {
                        props.addRelatedCategory(props.subcategory)
                    }}
                    display={verifyDisplay(props.subcategory.hub_category_id)}
                    />
                </div>
            </div>
        )
    } else {
        return <></>
    }
}