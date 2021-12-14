import styles from './styles.module.scss'

type ProviderProduct = {
    providerReference: number;
    providerName: string;
}

type ProductsCount = {
    productsCount: number;
    setProductsCount(count: number): void;
}

type ListProps = {
    providerProductsList: ProviderProduct[];
    productsCount: ProductsCount;
    loading: boolean;
}

export default function ProviderProductsList(props: ListProps){

    return (
        <div
        className={styles.wrapper}
        >
            <div
            className={styles.list}
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