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

type ContainerProps = {
    providerId: number;
    products: ProductsState;
    countProducts: CountProducts;
    loading: Loading;
}

export default function Container(props: ContainerProps){
    
    const [ placeholderList, setPlaceholderList ] = useState<any[]>([])
    const [ noResultsDisplay, setNoResultsDisplay ] = useState<string>('none')

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
                        product={product}
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