import { useEffect, useState } from 'react'
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
            order: 'asc',
            display: 'none',
            rotate: '0deg'
        },
        {
            order: 'asc',
            display: 'flex',
            rotate: '0deg'
        },
        {
            order: 'desc',
            display: 'flex',
            rotate: '180deg'
        },
    ]
    
    const [ placeholderList, setPlaceholderList ] = useState<any[]>([])
    const [ noResultsDisplay, setNoResultsDisplay ] = useState<string>('none')
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

    return (
        <div
        className={styles.wrapper}
        >
            <div
            className={styles.header}
            >
                <span>
                    referencia
                </span>
                <span
                style={{ justifyContent: 'flex-start' }}
                >
                    nome
                </span>
                <span>
                    estoque
                    <span 
                    className="material-icons-round"
                    id={styles.arrow}
                    style={{ display: `${arrowStyles[orderByStockIndex]}` }}
                    >
                    expand_more
                    </span>
                </span>
                <span>
                    custo fornecedor
                </span>
                <span>
                    custos adicionais
                </span>
                <span>
                    custo final
                </span>
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