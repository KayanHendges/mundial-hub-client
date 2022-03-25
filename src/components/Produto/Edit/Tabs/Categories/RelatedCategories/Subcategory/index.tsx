import { useContext, useState } from 'react'
import { Category, CategoryTree } from '../..'
import { ProductContext } from '../../../../../../../contexts/ProductContext'
import HandleCategoryButton from '../../HandleCategoryButton'
import MainCategoryButton from '../MainCategoryButton'
import Children from './Children'
import styles from './styles.module.scss'


type Props = {
    subcategory: CategoryTree;
    removeRelatedCategory(category: Category): void;
    hoverCategory: number;
    setHoverCategory(hoverCategory: number): void;
}

export default function Subcategory(props: Props){

    const { unitaryDetails, setUnitaryDetails } = useContext(ProductContext)
    const [ hover, setHover ] = useState(false)

    const [ open, setOpen ] = useState(true)

    const openStyle = {
        container: {
            backgroundColor: 'var(--gray-3)'
        },
        category: {
            borderBottom: '1px solid var(--complementar-text)',
            // marginBottom: '.2rem',
            color: 'var(--white-text)'
        }
    }

    const closedStyle = {
        container: {
            backgroundColor: 'var(--gray-3)'
        },
        category: {
            borderBottom: '1px solid var(--complementar-text)',
            // marginBottom: '.2rem',
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
            removeRelatedCategory={props.removeRelatedCategory}
            hoverCategory={props.hoverCategory}
            setHoverCategory={props.setHoverCategory}
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
            removeRelatedCategory={props.removeRelatedCategory}
            hoverCategory={props.hoverCategory}
            setHoverCategory={props.setHoverCategory}
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
                        removeRelatedCategory={props.removeRelatedCategory}
                        hoverCategory={props.hoverCategory}
                        setHoverCategory={props.setHoverCategory}
                        />
                    }
                })}
            </div>
        </div>
    }

    if(unitaryDetails.related_categories.includes(props.subcategory.hub_category_id)){
        if(props.subcategory.children){
            return (
                <div
                className={styles.wrapper}
                style={open? openStyle.container : closedStyle.container}
                >
                    <div
                    className={styles.categoryContainer}
                    style={open? openStyle.category : closedStyle.category}
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
                        className={styles.categoryName}
                        onClick={() => {
                            setOpen(!open)
                        }}
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
                    onMouseEnter={() => {
                        setHover(true)
                        props.setHoverCategory(props.subcategory.hub_category_id)
                    }}
                    onMouseLeave={() => {
                        setHover(false)
                        props.setHoverCategory(-1)
                    }}
                    style={{ marginBottom: '0' }}
                    >
                        <div
                        className={styles.categoryName}
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
        }
    } else {
        return <div></div>
    }
    
}