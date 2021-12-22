import { useEffect, useState } from 'react'
import { api } from '../../../../../services/api'
import styles from './styles.module.scss'

type MatchProducts = {
    providerReference: number;
    hubId: number;
}

type MatchProductsState = {
    matchProducts: MatchProducts;
    setMatchProducts(matchProducts: MatchProducts): void;
}

type ProductListProps = {
    matchProducts: MatchProductsState;
}

type SearchIcon = {
    color: string;
    left: string;
}

type Product = {
    hubId: number;
    productName: string;
}

type ProductStyle = {
    backgroundColor: string,
    color: string,
    borderBottom: string,
    borderRadius: string,
}

export default function ProductsList(props: ProductListProps){

    const [ searchIcon, setSearchIcon ] = useState<SearchIcon>({
        color: 'var(--complementar-text)',
        left: '1.8%'
    })
    const [ placeholder, setPlaceholder ] = useState<string>('   pesquise o produto a ser vinculado')
    const [ search, setSearch ] = useState<string>('')

    const [ products, setProducts ] = useState<Product[]>([])
    const [ productsStyle, setProductsStyle ] = useState<ProductStyle[]>([])

    const [ loading, setLoading ] = useState<boolean>(false)
    const [ placeholderList, setPlaceholderList ] = useState<any[]>([])
    const [ noResultsDisplay, setNoResultsDisplay ] = useState<string>('none')


    const productStyle: ProductStyle = {
        backgroundColor: 'var(--gray-2)',
        color: 'var(--complementar-text)',
        borderBottom: '1px solid var(--complementar-text)',
        borderRadius: '0rem',
    }

    useEffect(() => {
        const list = products.map(product => {
            return productStyle
        })
        setProductsStyle(list)
    }, [products])

    useEffect(() => {
        if(placeholderList.length == 0){
            for (let index = 0; index < 10; index++) {
                placeholderList.push(index)
            }
        }
    }, [])

    useEffect(() => {
        const list = products.map((product, i) => {
            if(product.hubId == props.matchProducts.matchProducts.hubId){
                return {
                    backgroundColor: 'var(--blue-button)',
                    color: 'var(--white-text)',
                    borderBottom: '1px solid var(--blue-button)',
                    borderRadius: '.4rem',
                }
            }
            if(products.length-1 > i){
                if(products[(i+1)].hubId == props.matchProducts.matchProducts.hubId){
                    return {
                        backgroundColor: 'var(--gray-2)',
                        color: 'var(--complementar-text)',
                        borderBottom: '1px solid var(--gray-2)',
                        borderRadius: '0rem',
                    }
                }
            }
            return productStyle
            
        })
        setProductsStyle(list)
    }, [props.matchProducts.matchProducts])

    useEffect(() => {
        if(!loading && products.length == 0 && search.length > 0){
            setNoResultsDisplay('flex')
        } else {
            setNoResultsDisplay('none')
        }
    }, [products])


    function hoverContainerStyle(enter: boolean, index): void{
        if(enter){
            const list = products.map((product, i) => {
                if(product.hubId == props.matchProducts.matchProducts.hubId){
                    return {
                        backgroundColor: 'var(--blue-button)',
                        color: 'var(--white-text)',
                        borderBottom: '1px solid var(--blue-button)',
                        borderRadius: '.4rem',
                    }
                }
                if(products.length-1 > i){
                    if(products[(i+1)].hubId == props.matchProducts.matchProducts.hubId){
                        if(i == index){
                            return {
                                backgroundColor: 'var(--gray-5)',
                                color: 'var(--white-text)',
                                borderBottom: '1px solid var(--gray-5)',
                                borderRadius: '.4rem',
                            }
                        } else {
                            return {
                                backgroundColor: 'var(--gray-2)',
                                color: 'var(--complementar-text)',
                                borderBottom: '1px solid var(--gray-2)',
                                borderRadius: '0rem',
                            }
                        }
                    }
                }
                if(i == index){
                    return {
                        backgroundColor: 'var(--gray-5)',
                        color: 'var(--white-text)',
                        borderBottom: '1px solid var(--gray-5)',
                        borderRadius: '.4rem',
                    }
                } else {
                    if(i+1 == index){
                        return {
                            backgroundColor: 'var(--gray-2)',
                            color: 'var(--complementar-text)',
                            borderBottom: '1px solid var(--gray-2)',
                            borderRadius: '0rem',
                        }
                    } else {
                        return {
                            backgroundColor: 'var(--gray-2)',
                            color: 'var(--complementar-text)',
                            borderBottom: '1px solid var(--complementar-text)',
                            borderRadius: '0rem',
                        }
                    }
                }
            })
            setProductsStyle(list)
        } else {
            const list = products.map((product, i) => {
                if(product.hubId == props.matchProducts.matchProducts.hubId){
                    return {
                        backgroundColor: 'var(--blue-button)',
                        color: 'var(--white-text)',
                        borderBottom: '1px solid var(--blue-button)',
                        borderRadius: '.4rem',
                    }
                }
                if(products.length-1 > i){
                    if(products[(i+1)].hubId == props.matchProducts.matchProducts.hubId){
                        return {
                            backgroundColor: 'var(--gray-2)',
                            color: 'var(--complementar-text)',
                            borderBottom: '1px solid var(--gray-2)',
                            borderRadius: '0rem',
                        }
                    }
                }
                return productStyle
            })
            setProductsStyle(list)
        }
    }

    async function getProducts(){
        setProducts([])
        setLoading(true)
        props.matchProducts.setMatchProducts({
            providerReference: props.matchProducts.matchProducts.providerReference,
            hubId: 0
        })
        api.get(`/providers/link-products/?query=${search}`)
        .then(response => {
            if(response.data.code == 200){
                setLoading(false)
                setProducts(response.data.products)
            } else {
                setLoading(false)
                setProducts([])
            }
        })
        .catch(erro => {
            console.log(erro.response.data.message)
            setLoading(false)
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
                }}
                placeholder={placeholder}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                onKeyPress={(e) => {
                    if(e.key == 'Enter'){
                        getProducts()
                    }
                }}
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
            onMouseLeave={() => hoverContainerStyle(false, 0)}
            >
                {products.map((product, index) => {
                    return (
                        <div
                        className={styles.productContainer}
                        key={product.hubId}
                        style={productsStyle[index]}
                        onMouseEnter={() => hoverContainerStyle(true, index)}
                        onClick={() => {
                            if(product.hubId == props.matchProducts.matchProducts.hubId){
                                props.matchProducts.setMatchProducts({
                                    providerReference: props.matchProducts.matchProducts.providerReference,
                                    hubId: 0
                                })
                            } else {
                                props.matchProducts.setMatchProducts({
                                    providerReference: props.matchProducts.matchProducts.providerReference,
                                    hubId: product.hubId
                                })
                            }
                        }}
                        >
                            <div
                            className={styles.productName}
                            >
                                {product.productName}
                            </div>
                        </div>
                    )
                })}
                {placeholderList.map(index => {
                    if(loading){
                        return (
                            <div
                            key={index}
                            className={styles.placeholder}
                            >
                            </div>
                        )
                    }
                })}
                <div
                className={styles.noResults}
                style={{ display: `${noResultsDisplay}` }}
                >
                    <img 
                    src="/warehouse.png"
                    alt="sem resultados"
                    className={styles.warehouseIcon}
                    />
                    <span>
                        nenhum produto encontrado
                    </span>
                </div> 
            </div>
        </div>
    )
}