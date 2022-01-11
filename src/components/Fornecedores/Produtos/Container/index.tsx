import { CSSProperties, useEffect, useState } from 'react'
import ProductContainer from './ProductContainer'
import styles from './styles.module.scss'

type Products = {
    providerReference: number,
    reference: string,
    productName: string,
    stock: number;
    cost: number,
    additionalCost: string,
    totalCost: number;
}

type ProductsState = {
    products: Products[];
    setProducts(products: Products[]): void;
}

type CountProducts = {
    countProducts: number;
    setCountProducts(countProducts: number): void;
}

type Loading = {
    loading: boolean;
    setLoading(loading: boolean): void;
}

type Param = {
    param: {
        collum: string;
        order: string;
    }
    setParam(param: {
        collum: string;
        order: string
    }): void;
}

type ContainerProps = {
    providerId: number;
    products: ProductsState;
    countProducts: CountProducts;
    loading: Loading;
    param: Param
}

export default function Container(props: ContainerProps){

    const arrowStyles = [
        {
            order: '',
            visibility: 'hidden',
            transform: 'rotate(-90deg)'
        },
        {
            order: 'asc',
            visibility: 'visible',
            transform: 'rotate(0deg)'
        },
        {
            order: 'desc',
            visibility: 'visible',
            transform: 'rotate(-180deg)'
        },
    ] as const;
    
    const [ placeholderList, setPlaceholderList ] = useState<any[]>([])
    const [ noResultsDisplay, setNoResultsDisplay ] = useState<string>('none')
    const [ collum, setCollum ] = useState<string>('')
    const [ orderByStockIndex, setOrderByStockIndex ] = useState(0)   

    useEffect(() => {
        for (let index = 0; index < 10; index++) {
            placeholderList.push(index)
        }
    }, [])

    useEffect(() => {
        if(!props.loading.loading && props.products.products.length == 0){
            setNoResultsDisplay('flex')
        } else {
            setNoResultsDisplay('none')
        }
    }, [props.loading])

    useEffect(() => {
        props.param.setParam({
            collum: collum,
            order: arrowStyles[orderByStockIndex].order
        })
    }, [orderByStockIndex, collum])

    return (
        <div
        className={styles.wrapper}
        >
            <div
            className={styles.header}
            >
                <div
                className={styles.headerCollum}
                >
                    <span
                    onClick={() => {
                        if(collum == 'reference'){
                            if(arrowStyles.length > orderByStockIndex+1){
                                setOrderByStockIndex(orderByStockIndex+1)
                                setCollum('reference')   
                            } else {
                                setOrderByStockIndex(0)
                                setCollum('')
                            }
                        } else {
                            setOrderByStockIndex(1)
                            setCollum('reference')
                        }
                    }}
                    >
                        referencia
                        <span 
                        className="material-icons-round"
                        id={styles.arrow}
                        style={{ 
                            visibility: `${collum == 'reference' ? arrowStyles[orderByStockIndex].visibility : 'hidden' }`,
                            transform: `${arrowStyles[orderByStockIndex].transform}`
                        }}
                        >
                        expand_more
                        </span>
                    </span>
                </div>
                <div
                className={styles.headerCollum}
                >
                    <span
                    style={{ 
                        justifyContent: 'flex-start',
                        margin: '0 auto 0 0'
                    }}
                    onClick={() => {
                        if(collum == 'name'){
                            if(arrowStyles.length > orderByStockIndex+1){
                                setOrderByStockIndex(orderByStockIndex+1)
                                setCollum('name')   
                            } else {
                                setOrderByStockIndex(0)
                                setCollum('')
                            }
                        } else {
                            setOrderByStockIndex(1)
                            setCollum('name')
                        }
                    }}
                    >
                        nome
                        <span 
                        className="material-icons-round"
                        id={styles.arrow}
                        style={{ 
                            visibility: `${collum == 'name' ? arrowStyles[orderByStockIndex].visibility : 'hidden' }`,
                            transform: `${arrowStyles[orderByStockIndex].transform}`
                        }}
                        >
                        expand_more
                        </span>
                    </span>
                </div>
                <div
                className={styles.headerCollum}
                >
                    <span
                    onClick={() => {
                        if(collum == 'stock'){
                            if(arrowStyles.length > orderByStockIndex+1){
                                setOrderByStockIndex(orderByStockIndex+1)
                                setCollum('stock')   
                            } else {
                                setOrderByStockIndex(0)
                                setCollum('')
                            }
                        } else {
                            setOrderByStockIndex(1)
                            setCollum('stock')
                        }
                    }}
                    >
                        estoque
                        <span 
                        className="material-icons-round"
                        id={styles.arrow}
                        style={{ 
                            visibility: `${collum == 'stock' ? arrowStyles[orderByStockIndex].visibility : 'hidden' }`,
                            transform: `${arrowStyles[orderByStockIndex].transform}`
                        }}
                        >
                        expand_more
                        </span>
                    </span>
                </div>
                <div
                className={styles.headerCollum}
                >
                    <span
                    onClick={() => {
                        if(collum == 'provider_cost'){
                            if(arrowStyles.length > orderByStockIndex+1){
                                setOrderByStockIndex(orderByStockIndex+1)
                                setCollum('provider_cost')   
                            } else {
                                setOrderByStockIndex(0)
                                setCollum('')
                            }
                        } else {
                            setOrderByStockIndex(1)
                            setCollum('provider_cost')
                        }
                    }}
                    >
                        custo fornecedor
                        <span 
                        className="material-icons-round"
                        id={styles.arrow}
                        style={{ 
                            visibility: `${collum == 'provider_cost' ? arrowStyles[orderByStockIndex].visibility : 'hidden' }`,
                            transform: `${arrowStyles[orderByStockIndex].transform}`
                        }}
                        >
                        expand_more
                        </span>
                    </span>
                </div>
                <div
                className={styles.headerCollum}
                >
                    <span>
                        custos adicionais
                    </span>
                </div>
                <div
                className={styles.headerCollum}
                >
                    <span>
                        custo final
                    </span>
                </div>
            </div>
            <div
            className={styles.containerList}
            >
                {props.products.products.map(product => {
                    return (
                        <ProductContainer
                        key={product.reference}
                        product={product}
                        providerId={props.providerId}
                        />
                    )
                })}
                {placeholderList.map((placeholder, index) => {
                    return (
                        <div
                        key={index}
                        className={styles.placeholderContainer}
                        style={{ display: `${props.loading.loading ? 'flex' : 'none' }` }}
                        >
                        </div>
                    )
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