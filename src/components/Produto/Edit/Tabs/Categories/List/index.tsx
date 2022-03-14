import { Children, useContext, useEffect, useState } from 'react'
import { Category, CategoryTree } from '..'
import { ProductContext } from '../../../../../../contexts/ProductContext'
import HandleCategoryButton from '../HandleCategoryButton'
import styles from './styles.module.scss'
import Subcategory from './Subcategory'

type ListProps = {
    fetchingCategories: boolean;
    categories: CategoryTree[];
    categoriesList: Category[];
}

export interface ContainerStyle {
    parentContainer: {
        borderBottom: string;
    },
    container: {
        backgroundColor: string;
        border: string;
        height: string;
    },
    categoryName: {
        color: string;
    }
}

export default function List(props: ListProps){

    const { unitaryDetails, setUnitaryDetails } = useContext(ProductContext)

    const standartContainerStyle: ContainerStyle = {
        parentContainer: {
            borderBottom: 'none',
        },
        container: {
            backgroundColor: 'var(--gray-2)',
            border: '1px solid transparent',
            height: '2rem',
        },
        categoryName: {
            color: 'var(--complementar-text)'
        }
    }

    const hoverContainerStyle: ContainerStyle = {
        parentContainer: {
            borderBottom: 'none',
        },
        container: {
            backgroundColor: 'var(--gray-2)',
            border: '1px solid var(--complementar-text)',
            height: '2rem',
        },
        categoryName: {
            color: 'var(--complementar-text)'
        }
    }

    const selectedContainerStyle: ContainerStyle = {
        parentContainer: {
            borderBottom: '1px solid var(--complementar-text)',
        },
        container: {
            backgroundColor: 'var(--gray-4)',
            border: '1px solid transparent',
            height: `min-content`,
        },
        categoryName: {
            color: 'var(--white-text)'
        }
    }

    const [ categoryStyles, setCategoryStyle ] = useState<ContainerStyle[]>([])
    const [ selectedCategory, setSelectedCategory ] = useState(-1)

    const [ placeholderList, setPlaceholderList ] = useState([ 0, 1, 2, 3, 4, 5, 6, 7])

    useEffect(() => {
        const listStyles: ContainerStyle[] = []
        for (let index = 0; index < props.categories.length; index++) {
            listStyles.push(standartContainerStyle)
        }
        setCategoryStyle(listStyles)
    }, [props.categories])

    useEffect(() => {
        const listStyles: ContainerStyle[] = []        
        categoryStyles.map((style, index) => {
            if(index == selectedCategory){
                listStyles.push(selectedContainerStyle)
            } else {
                listStyles.push(standartContainerStyle)
            }
        })
        setCategoryStyle(listStyles)
    }, [selectedCategory])

    function handleHoverStyles(enter: boolean, index: number){
        const listStyles: ContainerStyle[] = []        
        categoryStyles.map( (style, i) => {
            if(i == selectedCategory){
                listStyles.push(selectedContainerStyle)
            } else {
                if(i == index && enter){
                    listStyles.push(hoverContainerStyle)
                } else {
                    listStyles.push(standartContainerStyle)
                }
            }
        })
        setCategoryStyle(listStyles)
    }

    function verifyDisplay(hubId: number): boolean{
        if(unitaryDetails.related_categories.includes(hubId)){
            return false
        } else {
            return true
        }
    }

    function addRelatedCategory(category: Category){
        const list = unitaryDetails.related_categories
        const ordenedList = []
        
        if(category.tray_category_parent_id != 0){
            parentMap(category)
        }

        function parentMap(parentCategory: Category){
            props.categoriesList.map(parent => {
                if(parent.tray_category_id == parentCategory.tray_category_parent_id 
                && !unitaryDetails.related_categories.includes(parent.hub_category_id)){
                    list.push(parent.hub_category_id)
                    if(parent.tray_category_parent_id != 0){
                        parentMap(parent)
                    } 
                }
            })
            return
        }

        list.push(category.hub_category_id)
        
        props.categoriesList.map(category => {
            list.map(hubId => {
                if(category.hub_category_id == hubId){
                    ordenedList.push(category.hub_category_id)
                }
            })
        })

        setUnitaryDetails({
            ...unitaryDetails,
            related_categories: ordenedList
        })
    }


    return (
        <div
        className={styles.wrapper}
        >
            <div
            className={styles.header}
            >
                categorias
            </div>
            <div
            className={styles.container}
            >
                <div
                className={styles.containerList}
                >
                    <div
                    className={styles.list}
                    >
                        {props.categories.map( (category, index) => {
                            if(category.children){
                                return (
                                    <div
                                    className={styles.categoryContainer}
                                    key={index}
                                    style={categoryStyles[index]?.container}
                                    onMouseEnter={() => handleHoverStyles(true, index)}
                                    onMouseLeave={() => handleHoverStyles(false, index)}
                                    >
                                        <div
                                        className={styles.parentContainer}
                                        style={categoryStyles[index]?.parentContainer}
                                        >
                                            <span
                                            className={styles.categoryName}
                                            style={categoryStyles[index]?.categoryName}
                                            onClick={() => {
                                                if(index != selectedCategory){
                                                    setSelectedCategory(index)
                                                } else {
                                                    setSelectedCategory(-1)
                                                }
                                            }}
                                            >
                                                <span 
                                                className="material-icons-round"
                                                id={styles.arrow}
                                                style={{ transform: `${index == selectedCategory ? 'rotate(0deg)' : 'rotate(-90deg)' }` }}
                                                >
                                                    expand_more
                                                </span>
                                                {category.category_name}
                                            </span>
                                            <HandleCategoryButton
                                            text='adicionar'
                                            onClickFunction={() => {
                                                addRelatedCategory(category)
                                            }}
                                            display={verifyDisplay(category.hub_category_id)}
                                            />
                                        </div>
                                        {category.children.map( (children, i) => {
                                            if(index == selectedCategory){
                                                console.log()
                                                return (
                                                    <Subcategory
                                                    key={i}
                                                    subcategory={children}
                                                    addRelatedCategory={addRelatedCategory}
                                                    />
                                                )
                                            }
                                        } )}
                                    </div>
                                )
                            } else {
                                return (
                                    <div
                                    className={styles.categoryContainer}
                                    key={index}
                                    style={categoryStyles[index]?.container}
                                    onMouseEnter={() => handleHoverStyles(true, index)}
                                    onMouseLeave={() => handleHoverStyles(false, index)}
                                    >
                                        <div
                                        className={styles.parentContainer}
                                        style={{ cursor: 'default' }}
                                        >
                                            <span
                                            className={styles.categoryName}
                                            style={{
                                                ...categoryStyles[index]?.categoryName,
                                                cursor: 'default',
                                                paddingLeft: '1.6rem'
                                                }}
                                            >
                                                {category.category_name}
                                            </span>
                                            <HandleCategoryButton
                                            text='adicionar'
                                            onClickFunction={() => {
                                                addRelatedCategory(category)
                                            }}
                                            display={verifyDisplay(category.hub_category_id)}
                                            />
                                        </div>
                                    </div>
                                )
                            }         
                        })}
                        {placeholderList.map(placeholder => {
                            return (
                                <div
                                className={styles.placeholder}
                                style={{ display: `${props.fetchingCategories? 'flex' : 'none' }` }}
                                key={placeholder}
                                >
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}