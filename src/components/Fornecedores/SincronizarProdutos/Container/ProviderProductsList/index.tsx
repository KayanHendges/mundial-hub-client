import { useEffect, useState } from 'react'
import { api } from '../../../../../services/api'
import styles from './styles.module.scss'

type ProviderProduct = {
    providerReference: number;
    providerName: string;
}

type ProductsCount = {
    productsCount: number;
    setProductsCount(count: number): void;
}

type MatchProducts = {
    providerReference: number;
    hubId: number;
}

type MatchProductsState = {
    matchProducts: MatchProducts;
    setMatchProducts(matchProducts: MatchProducts): void;
}

type RequestState = {
    request: boolean;
    setRequest(boolean: boolean): void;
}

type SearchState = {
    search: string;
    setSearch(search: string): void;
}

type ListProps = {
    providerProductsList: ProviderProduct[];
    productsCount: ProductsCount;
    loading: boolean;
    matchProducts: MatchProductsState;
    param: string;
    request: RequestState;
    search: SearchState;
    getProviderProducts(): void;
}

type ProductStyle = {
    backgroundColor: string,
    color: string,
    borderBottom: string,
    borderRadius: string,
}

type SearchIcon = {
    color: string;
    left: string;
}

export default function ProviderProductsList(props: ListProps){

    const [ searchIcon, setSearchIcon ] = useState<SearchIcon>({
        color: 'var(--complementar-text)',
        left: '3.5%'
    })
    const [ placeholder, setPlaceholder ] = useState<string>('   pesquise o produto a ser vinculado')

    const [ productsStyle, setProductsStyle ] = useState<ProductStyle[]>([])

    const [ placeholderList, setPlaceholderList ] = useState<any[]>([])
    const [ noResultsDisplay, setNoResultsDisplay ] = useState<string>('none')

    const productStyle: ProductStyle = {
        backgroundColor: 'var(--gray-2)',
        color: 'var(--complementar-text)',
        borderBottom: '1px solid var(--complementar-text)',
        borderRadius: '0rem',
    }

    useEffect(() => {
        const list = props.providerProductsList.map(product => {
            return productStyle
        })
        setProductsStyle(list)
    }, [props.providerProductsList])

    useEffect(() => {
        const list = props.providerProductsList.map((product, i) => {
            if(product.providerReference == props.matchProducts.matchProducts.providerReference){
                return {
                    backgroundColor: 'var(--blue-button)',
                    color: 'var(--white-text)',
                    borderBottom: '1px solid var(--blue-button)',
                    borderRadius: '.4rem',
                }
            }
            if(props.providerProductsList.length-1 > i){
                if(props.providerProductsList[(i+1)].providerReference == props.matchProducts.matchProducts.providerReference){
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
        if(placeholderList.length == 0){
            for (let index = 0; index < 10; index++) {
                placeholderList.push(index)
            }
        }
    }, [])
    
    useEffect(() => {
        if(!props.loading && props.providerProductsList.length == 0){
            setNoResultsDisplay('flex')
        } else {
            setNoResultsDisplay('none')
        }
    }, [props.loading])

    function hoverContainerStyle(enter: boolean, index): void{
        if(enter){
            const list = props.providerProductsList.map((product, i) => {
                if(product.providerReference == props.matchProducts.matchProducts.providerReference){
                    return {
                        backgroundColor: 'var(--blue-button)',
                        color: 'var(--white-text)',
                        borderBottom: '1px solid var(--blue-button)',
                        borderRadius: '.4rem',
                    }
                }
                if(props.providerProductsList.length-1 > i){
                    if(props.providerProductsList[(i+1)].providerReference == props.matchProducts.matchProducts.providerReference){
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
            const list = props.providerProductsList.map((product, i) => {
                if(product.providerReference == props.matchProducts.matchProducts.providerReference){
                    return {
                        backgroundColor: 'var(--blue-button)',
                        color: 'var(--white-text)',
                        borderBottom: '1px solid var(--blue-button)',
                        borderRadius: '.4rem',
                    }
                }
                if(props.providerProductsList.length-1 > i){
                    if(props.providerProductsList[(i+1)].providerReference == props.matchProducts.matchProducts.providerReference){
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

    function sendFunction(handleFunction: string): void{
        api.post(`/providers/link-products`, {
            ids: props.matchProducts.matchProducts,
            handleFunction: handleFunction
        }).then(response => {
            if(response.data.code == 200){
                console.log(response.data.message)
                props.request.setRequest(!props.request.request)
            }
        }).catch(erro => {
            console.log(erro.response.data)
            alert(erro.response.data.message)
        })
    }

    function handleSearchStyle(boolean: boolean): void{
        if(boolean){
            setSearchIcon({
                color: 'var(--gray-line)',
                left: '93%'
            })
            setPlaceholder('')
        } else {
            if(props.search.search.length < 1){
                setSearchIcon({
                    color: 'var(--complementar-text)',
                    left: '3.5%'
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
                value={props.search.search}
                onChange={(e) => props.search.setSearch(e.target.value)}
                onKeyPress={(e) => {
                    if(e.key == 'Enter'){
                        props.getProviderProducts()
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
                {props.providerProductsList.map((product, index) => {
                    return (
                        <div
                        className={styles.productContainer}
                        key={index}
                        style={productsStyle[index]}
                        onMouseEnter={() => hoverContainerStyle(true, index)}
                        onClick={() => {
                            if(product.providerReference == props.matchProducts.matchProducts.providerReference){
                                props.matchProducts.setMatchProducts({
                                    providerReference: 0,
                                    hubId: props.matchProducts.matchProducts.hubId
                                })
                            } else {
                                props.matchProducts.setMatchProducts({
                                    providerReference: product.providerReference,
                                    hubId: props.matchProducts.matchProducts.hubId
                                })
                            }
                        }}
                        >
                            <div
                            className={styles.providerName}
                            >
                                {product.providerName}
                            </div>
                        </div>
                    )
                })}
                {placeholderList.map(index => {
                    if(props.loading){
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
            <div
            className={styles.footer}
            >
                <span
                className={styles.productsCount}
                >
                    {`${props.productsCount.productsCount > 0 ? props.productsCount.productsCount: 'nenhum'} 
                    ${props.productsCount.productsCount > 1 ? 'itens' : 'item'} 
                    não ${props.productsCount.productsCount > 1 ? 'vinculados' : 'vinculado'}`}
                </span>
                <div
                className={styles.buttonsRow}
                >
                    <span
                    className={styles.buttonIgnore}
                    style={{ display: `${
                        props.matchProducts.matchProducts.providerReference > 0 ?
                        'flex' : 'none'
                    }`}}
                    onClick={() => sendFunction('ignore')}
                    >
                        ignorar
                    </span>
                    <span
                    className={styles.buttonCreate}
                    style={{ display: `${
                        props.matchProducts.matchProducts.providerReference > 0
                        && props.param == 'link' ?
                        'flex' : 'none'
                    }`}}
                    onClick={() => sendFunction('needCreate')}
                    >
                        não cadastrado
                    </span>
                    <span
                    className={styles.buttonLink}
                    style={{ display: `${
                        props.matchProducts.matchProducts.providerReference > 0 
                        && props.matchProducts.matchProducts.hubId > 0?
                        'flex' : 'none'
                    }`}}
                    onClick={() => sendFunction('link')}
                    >
                        vincular
                    </span>
                </div>
            </div>
        </div>
    )
}