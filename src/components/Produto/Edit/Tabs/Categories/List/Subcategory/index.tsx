import { useContext, useState } from 'react'
import { Category, CategoryTree } from '../..'
import { NewProductContext } from '../../../../../../../contexts/NewProductContext'
import HandleCategoryButton from '../../HandleCategoryButton'
import Children from './Children'
import styles from './styles.module.scss'


type Props = {
    subcategory: CategoryTree;
    addRelatedCategory(category: Category): void;
}

export default function Subcategory(props: Props){

    const { unitaryDetails, setUnitaryDetails } = useContext(NewProductContext)

    const [ open, setOpen ] = useState(false)

    const openStyle = {
        container: {
            backgroundColor: 'var(--gray-3)'
        },
        category: {
            borderBottom: '1px solid var(--complementar-text)',
            marginBottom: '.2rem',
            color: 'var(--white-text)'
        }
    }

    const childrenList = props.subcategory.children == null? <></> 
    : props.subcategory.children.map((children, index) => {
        if(children.children){
            return childrenLoop(children)
        } else {
            return <Children 
            key={children.hub_category_id}
            subcategory={children}
            open={open}
            addRelatedCategory={props.addRelatedCategory}
            />
        }
    })

    function childrenLoop(children: CategoryTree){
        console.log(children)
        return <div
        className={styles.childrenContainer}
        >
            <Children
            key={children.hub_category_id}
            open={open}
            subcategory={children}
            addRelatedCategory={props.addRelatedCategory}
            />
            <div
            className={styles.childrenList}
            >
                {children.children.map((child) => {
                    if(child.children){
                        return childrenLoop
                    } else {
                        <Children 
                        key={child.hub_category_id}
                        open={open}
                        subcategory={child}
                        addRelatedCategory={props.addRelatedCategory}
                        />
                    }
                })}
            </div>
        </div>
    }

    function verifyDisplay(hubId: number): boolean{
        if(unitaryDetails.related_categories.includes(hubId)){
            return false
        } else {
            return true
        }
    }

    if(props.subcategory.children){
        return (
            <div
            className={styles.wrapper}
            style={open? {
                ...openStyle.container,
                paddingLeft: '0rem'
            } : {
                paddingLeft: '0rem'
            }}
            >
                <div
                className={styles.categoryContainer}
                style={open? {
                    ...openStyle.category,
                    paddingLeft: '0rem'
                } : {
                    paddingLeft: '0rem'
                }}
                >
                    <div
                    className={styles.categoryName}
                    onClick={() => {
                        setOpen(!open)
                    }}
                    >
                        <span 
                        className="material-icons-round"
                        id={styles.arrow}
                        style={{ 
                            transform: `${open ? 'rotate(0deg)' : 'rotate(-90deg)' }`,
                        }}
                        >
                            expand_more
                        </span>
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
                {childrenList}
            </div>
        )
    } else {
        return (
            <div
            className={styles.wrapper}
            >
                <div
                className={styles.categoryContainer}
                style={{ paddingLeft: '1.2rem' }}
                >
                    <div
                    className={styles.categoryName}
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
    }

}