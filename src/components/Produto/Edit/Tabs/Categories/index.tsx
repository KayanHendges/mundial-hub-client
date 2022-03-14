import { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../../../../contexts/ProductContext'
import { api } from '../../../../../services/api'
import List from './List'
import RelatedCategories from './RelatedCategories'
import styles from './styles.module.scss'

type Styles = {
    left: string
}

type Props = {
    styles: Styles;
}

export interface Category {
    hub_category_id: number;
    tray_category_id: number;
    tray_category_parent_id: number;
    category_name: string;
    order_list: number
}

export interface CategoryTree extends Category {
    children?: CategoryTree[]
}

export default function Categories(props: Props){

    const { unitaryDetails, errorsList, verifyErrorInput } = useContext(ProductContext)
    
    const [ fetchingCategories, setFetchingCategories ] = useState(true)
    const [ categoriesList, setCategoriesList ] = useState<Category[]>([]) 
    const [ categories, setCategories ] = useState<CategoryTree[]>([]) 

    const [ errorBorder, setErrorBorder ] = useState<string>('none')

    useEffect(() => {
        setFetchingCategories(true)
        api.get('/products/page/categories/list')
        .then(response => {
            if(response.data.code == 200){
                setCategoriesList(response.data.categoriesList)
                setCategories(response.data.categoriesTree)
            } else {
                console.log(response.data)
            }
            setFetchingCategories(false)
        })
        .catch(error => {
            alert(error.response.data.message)
            setFetchingCategories(false)
        })
    }, [])

    useEffect(() => {

        if(verifyErrorInput('mainCategory') || verifyErrorInput('relatedCategories')){
            if(unitaryDetails.related_categories.length > 0 && unitaryDetails.main_category_id > 0){
                setErrorBorder('none')
            } else {
                setErrorBorder('2px solid #E01D10')
            }
        } else {
            setErrorBorder('none')
        }

    }, [errorsList, unitaryDetails.related_categories, unitaryDetails.main_category_id])

    return (
        <div
        className={styles.wrapper}
        style={{ 
            ...props.styles,
            border: errorBorder,
            margin: `${errorBorder != 'none'? '.3rem' : '0' }`
        }}
        >
            <List
            categories={categories}
            categoriesList={categoriesList}
            fetchingCategories={fetchingCategories}
            />
            <RelatedCategories
            categories={categories}
            categoriesList={categoriesList}
            fetchingCategories={fetchingCategories}
            />
        </div>
    )
}