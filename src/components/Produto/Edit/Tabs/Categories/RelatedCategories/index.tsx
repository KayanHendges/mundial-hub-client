import { Children, useContext, useEffect, useState } from 'react'
import { Category, CategoryTree } from '..'
import { NewProductContext } from '../../../../../../contexts/NewProductContext'
import { ProductContext } from '../../../../../../contexts/ProductContext'
import HandleCategoryButton from '../HandleCategoryButton'
import MainCategoryButton from './MainCategoryButton'
import styles from './styles.module.scss'
import Subcategory from './Subcategory'

type ListProps = {
    fetchingCategories: boolean;
    categories: CategoryTree[];
    categoriesList: Category[];
}

export interface ContainerStyle {
    showButton: boolean;
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

export default function RelatedCategories(props: ListProps){

    const { unitaryDetails, setUnitaryDetails } = useContext(ProductContext)

    const standartContainerStyle: ContainerStyle = {
        showButton: false,
        parentContainer: {
            borderBottom: 'none',
        },
        container: {
            backgroundColor: 'var(--gray-2)',
            border: '1px solid transparent',
            height: 'min-content',
        },
        categoryName: {
            color: 'var(--complementar-text)'
        }
    }

    const hoverContainerStyle: ContainerStyle = {
        showButton: true,
        parentContainer: {
            borderBottom: 'none',
        },
        container: {
            backgroundColor: 'var(--gray-2)',
            border: '1px solid var(--complementar-text)',
            height: 'min-content',
        },
        categoryName: {
            color: 'var(--complementar-text)'
        }
    }

    const selectedContainerStyle: ContainerStyle = {
        showButton: false,
        parentContainer: {
            borderBottom: '1px solid var(--blue-button-text)',
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
    const [ placeholderList, setPlaceholderList ] = useState([ 0, 1, 2, 3, 4, 5, 6, 7])

    const [ hoverCategory, setHoverCategory ] = useState(-1)

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
            if(props.categories[index].hub_category_id == unitaryDetails.main_category_id){
                listStyles.push(selectedContainerStyle)
            } else {
                listStyles.push(standartContainerStyle)
            }
        })
        setCategoryStyle(listStyles)
    }, [unitaryDetails.main_category_id])

    function handleHoverStyles(enter: boolean, index: number){
        const listStyles: ContainerStyle[] = []        
        categoryStyles.map( (style, i) => {
            if(props.categories[index].hub_category_id == unitaryDetails.main_category_id){
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

    function removeRelatedCategory(category: Category){
        const list = unitaryDetails.related_categories
        const newList = []
        const idsToDelete = []
        var mainCategoryId = unitaryDetails.main_category_id
        
        idsToDelete.push(category.hub_category_id)

        if(category.tray_category_parent_id != 0){
            parentMap(category)
        }

        function parentMap(parentCategory: Category){
            props.categoriesList.map(parent => {
                if(parent.hub_category_id == 346){
                    // console.log(parent.tray_category_id, parentCategory.tray_category_parent_id, unitaryDetails.related_categories.includes(parent.hub_category_id))
                }
                if(parent.tray_category_id == parentCategory.tray_category_parent_id 
                && unitaryDetails.related_categories.includes(parent.hub_category_id)){
                    idsToDelete.push(parent.hub_category_id)
                    if(parent.tray_category_parent_id != 0){
                        parentMap(parent)
                    } 
                }
            })
            return
        }

        list.map(hubId => {
            if(!idsToDelete.includes(hubId)){
                newList.push(hubId)
            }
        })

        idsToDelete.map(hubId => {
            if(hubId == unitaryDetails.main_category_id){
                mainCategoryId = 0
            }
        })

        setUnitaryDetails({
            ...unitaryDetails,
            related_categories: newList,
            main_category_id: mainCategoryId
        })
    }


    return (
        <div
        className={styles.wrapper}
        >
            <div
            className={styles.header}
            >
                relacionadas
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
                            if(unitaryDetails.related_categories.includes(category.hub_category_id)){
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
                                            onMouseEnter={() => setHoverCategory(category.hub_category_id)}
                                            onMouseLeave={() => setHoverCategory(-1)}
                                            >
                                                <span
                                                className={styles.categoryName}
                                                style={categoryStyles[index]?.categoryName}
                                                onClick={() => {
                                                    if(index != unitaryDetails.main_category_id){
                                                        setUnitaryDetails({
                                                            ...unitaryDetails,
                                                            main_category_id: category.hub_category_id
                                                        })
                                                    } else {
                                                        setUnitaryDetails({
                                                            ...unitaryDetails,
                                                            main_category_id: 0
                                                        })
                                                    }
                                                }}
                                                >
                                                    {category.category_name}
                                                </span>
                                                <HandleCategoryButton
                                                text='remover'
                                                onClickFunction={() => {
                                                    removeRelatedCategory(category)
                                                }}
                                                display={categoryStyles[index]?.showButton}
                                                />
                                                <MainCategoryButton
                                                text={'categoria principal'}
                                                hubId={category.hub_category_id}
                                                hoverCategory={hoverCategory}
                                                setHoverCategory={setHoverCategory}
                                                />
                                            </div>
                                            {category.children.map( (children, i) => {
                                                if(unitaryDetails.related_categories.includes(children.hub_category_id)){
                                                    return (
                                                        <Subcategory
                                                        key={i}
                                                        subcategory={children}
                                                        removeRelatedCategory={removeRelatedCategory}
                                                        hoverCategory={hoverCategory}
                                                        setHoverCategory={setHoverCategory}
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
                                            onMouseEnter={() => setHoverCategory(category.hub_category_id)}
                                            onMouseLeave={() => setHoverCategory(-1)}
                                            >
                                                <span
                                                className={styles.categoryName}
                                                style={categoryStyles[index]?.categoryName}
                                                onClick={() => {
                                                    if(index != unitaryDetails.main_category_id){
                                                        setUnitaryDetails({
                                                            ...unitaryDetails,
                                                            main_category_id: category.hub_category_id
                                                        })
                                                    } else {
                                                        setUnitaryDetails({
                                                            ...unitaryDetails,
                                                            main_category_id: 0
                                                        })
                                                    }
                                                }}
                                                >
                                                    {category.category_name}
                                                </span>
                                                <HandleCategoryButton
                                                text='remover'
                                                onClickFunction={() => {
                                                    removeRelatedCategory(category)
                                                }}
                                                display={categoryStyles[index].showButton}
                                                />
                                                <MainCategoryButton
                                                text={'categoria principal'}
                                                hubId={category.hub_category_id}
                                                hoverCategory={hoverCategory}
                                                setHoverCategory={setHoverCategory}
                                                />
                                            </div>
                                        </div>
                                    )
                                }
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