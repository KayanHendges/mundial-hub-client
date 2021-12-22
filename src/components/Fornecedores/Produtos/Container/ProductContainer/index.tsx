import styles from './styles.module.scss'

type Product = {
    providerReference: number,
    reference: string,
    productName: string,
    stock: number;
    cost: number,
    additionalCost: string,
    totalCost: number;
}

type ContainerProps = {
    product: Product;
}

export default function ProductContainer(props: ContainerProps){

    return (
        <div
        key={props.product.reference}
        className={styles.wrapper}
        >
            <span>
                {props.product.reference}
            </span>
            <span
            style={{ justifyContent: 'flex-start' }}
            >
                {props.product.productName}
            </span>
            <span>
                {props.product.stock}
            </span>
            <span>
                {`R$${(props.product.cost.toString()).replace('.', ',')}`}
            </span>
            <span>
                {props.product.additionalCost}
            </span>
            <span>
                {`R$${(props.product.totalCost.toString()).replace('.', ',')}`}
            </span>
        </div>
    )
}