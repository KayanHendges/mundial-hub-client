import { useEffect, useState } from 'react'
import { api } from '../../../../../services/api'
import styles from './styles.module.scss'

type SearchIcon = {
    color: string;
    left: string;
}

type Product = {
    hubId: number;
    productName: string;
}

export default function ProductsList(props){

    const [ searchIcon, setSearchIcon ] = useState<SearchIcon>({
        color: 'var(--complementar-text)',
        left: '1.8%'
    })
    const [ placeholder, setPlaceholder ] = useState<string>('   pesquise o produto a ser vinculado')
    const [ search, setSearch ] = useState<string>('')
    const [ products, setProducts ] = useState<Product[]>([])

    async function getProducts(){
        console.log('request')
        api.get(`/providers/link-products/?query=${search}`)
        .then(response => {
            if(response.data.code == 200){
                setProducts(response.data.products)
            } else {
                setProducts([])
            }
        })
        .catch(erro => {
            console.log(erro.response.data.message)
            setProducts([])
        })
    }

    function handleSearchStyle(boolean: boolean): void{
        if(boolean){
            setSearchIcon({
                color: 'var(--gray-line)',
                left: '94%'
            })
            setPlaceholder('')
        } else {
            if(search.length < 1){
                setSearchIcon({
                    color: 'var(--complementar-text)',
                    left: '1.8%'
                })
                setPlaceholder('   pesquise o produto a ser vinculado')
            }
        }
    }

    return (
        <div
        className={styles.wrapper}
        >
            <div
            className={styles.header}
            >
                <input 
                className={styles.search}
                type="text"
                onFocus={() => handleSearchStyle(true)}
                onBlur={() => {
                    handleSearchStyle(false)
                    getProducts()
                }}
                placeholder={placeholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                />
                <span
                className="material-icons"
                id={styles.searchIcon}
                style={searchIcon}
                >
                    search
                </span>
            </div>
            <div
            className={styles.list}
            >
                {products.map(product => {
                    return (
                        <div
                        className={styles.productContainer}
                        key={product.hubId}
                        >
                            <span
                            className={styles.productName}
                            >
                                {product.productName}
                            </span>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}