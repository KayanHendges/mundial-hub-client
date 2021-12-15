import { useEffect, useState } from 'react'
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

type ListProps = {
    providerProductsList: ProviderProduct[];
    productsCount: ProductsCount;
    loading: boolean;
    matchProducts: MatchProductsState;
}

type ProductStyle = {
    backgroundColor: string,
    color: string,
    borderBottom: string,
    borderRadius: string,
}

export default function ProviderProductsList(props: ListProps){

    const [ productsStyle, setProductsStyle ] = useState<ProductStyle[]>([])

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

    return (
        <div
        className={styles.wrapper}
        >
            <div
            className={styles.list}
            onMouseLeave={() => hoverContainerStyle(false, 0)}
            >
                <span
                className={styles.loadingList}
                style={{ display: `${props.loading ? 'flex' : 'none'}` }}
                >
                    carregando produtos
                </span>
                {props.providerProductsList.map((product, index) => {
                    return (
                        <div
                        className={styles.productContainer}
                        key={index}
                        style={productsStyle[index]}
                        onMouseEnter={() => hoverContainerStyle(true, index)}
                        onClick={() => props.matchProducts.setMatchProducts({
                            providerReference: product.providerReference,
                            hubId: props.matchProducts.matchProducts.hubId
                        })}
                        >
                            {/* <span
                            className={styles.providerReference}
                            >
                                {product.providerReference}
                            </span> */}
                            <div
                            className={styles.providerName}
                            >
                                {product.providerName}
                            </div>
                        </div>
                    )
                })}
            </div>
            <div
            className={styles.footer}
            >
                {`${props.productsCount.productsCount > 0 ? props.productsCount.productsCount: 'nenhum'} 
                ${props.productsCount.productsCount > 1 ? 'itens' : 'item'} 
                não ${props.productsCount.productsCount > 1 ? 'vinculados' : 'vinculado'}`}
            </div>
        </div>
    )
}