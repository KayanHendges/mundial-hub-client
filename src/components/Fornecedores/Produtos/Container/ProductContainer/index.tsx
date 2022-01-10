import { useState } from 'react'
import { api } from '../../../../../services/api'
import onlyNumberText from '../../../../../services/onlyNumberText'
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
    providerId: number;
}

type ProductDetails = {
    request: boolean;
    providerReference: number;
    productName: string;
    hubId: number;
}

export default function ProductContainer(props: ContainerProps){

    const openDetailsStyle = {
        openContainer: true,
        height: '3.5rem',
        borderTop: '1px solid var(--gray-line)'
    }

    const closeDetailsStyle = {
        openContainer: false,
        height: '0rem',
        borderTop: 'none'
    }

    const [ productDetails, setProductDetails ] = useState<ProductDetails>({
        request: false,
        providerReference: 0,
        productName: '',
        hubId: 0,
    })

    const [ detailContainer, setDetailContainer ] = useState(closeDetailsStyle)
    
    const [ editStockStyles, setEditStockStyles ] = useState({
        display: 'none'
    })
    const [ editStockValue, setEditStockValue ] = useState(props.product.stock)

    const [ loading, setLoading ] = useState(false)

    async function handleDetailsContainer(open: boolean): Promise<void>{
        return new Promise(async(resolve) => {
            if(open){
                setDetailContainer(openDetailsStyle)
                if(!productDetails.request){
                    setLoading(true)
                    await requestDetails()
                    setLoading(false)
                }
                resolve()
            } else {
                setDetailContainer(closeDetailsStyle)
                resolve()
            }
        })
    }

    function editStock(){
        api.post(`/providers/products/edit?providerId=${props.providerId}&productId=${props.product.providerReference}&field=product_stock&value=${editStockValue}`)
        .then(response => {
            if(response.data.code != 200){
                setEditStockValue(props.product.stock)
            }
        })
        .catch(erro => {
            console.log(erro.response.data.message)
            setEditStockValue(props.product.stock)
        })
    }

    async function requestDetails(): Promise<void>{
        return new Promise(async(resolve) => {
            if(!productDetails.request){
                setProductDetails({
                    ...productDetails,
                    request: true
                })
    
                await api.get(`/providers/products/?provider_id=${props.providerId}&product_reference=${props.product.providerReference}`)
                .then(response => {
                    if(response.data.code == 200){
                        const product = response.data.product
                        setProductDetails({
                            request: true,
                            providerReference: product.providerReference,
                            productName: product.productName,
                            hubId: product.hubId    
                        })
                    }
                })
                .catch(erro => {
                    console.log(erro)
                    alert(erro.response.data.message)
                    setProductDetails({
                        ...productDetails,
                        request: false
                    })
                })

                resolve()
            } else {
                resolve()
            }
        })
    }

    return (
        <div
        className={styles.wrapper}
        >
            <div
            className={styles.productRow}
            onClick={() => handleDetailsContainer(!detailContainer.openContainer)}
            >
                <span>
                    {props.product.reference}
                </span>
                <span
                style={{ justifyContent: 'flex-start' }}
                >
                    {props.product.productName}
                </span>
                <span
                onDoubleClick={() => {
                        setEditStockStyles({
                            display: 'flex'
                        })
                }}
                >
                    {`${editStockStyles.display == 'flex' ? '' : editStockValue}`}
                    <input 
                    className={styles.editStock}
                    style={editStockStyles}
                    type="text"
                    value={editStockValue}
                    onChange={(e) => {
                        setEditStockValue(onlyNumberText(e.target.value))
                    }}
                    onBlur={() => {
                        setEditStockStyles({
                            display: 'none'
                        })
                        editStock()
                        
                    }}
                    />
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
            <div
            className={styles.detailsContainer}
            style={detailContainer}
            >
                <span
                className={styles.labelProductName}
                >
                    {`${loading ? '' : 'nome no fornecedor: '}${productDetails.productName.toLowerCase()}`}
                    <div
                    className={styles.placeholder}
                    style={{ width: '40rem', display: `${loading ? 'flex' : 'none' }` }}
                    />
                </span>
                <div
                className={styles.row}
                >
                    <span
                    className={styles.labelId}
                    >
                        {`${loading ? '' : 'id fornecedor: '}${productDetails.providerReference > 0 ? productDetails.providerReference : ''}`}
                        <div
                        className={styles.placeholder}
                        style={{ width: '10rem', display: `${loading ? 'flex' : 'none' }` }}
                        />
                    </span>
                    <span
                    className={styles.labelId}
                    >
                        {`${loading ? '' : 'hubId: '}${productDetails.hubId > 0 ? productDetails.hubId : ''}`}
                        <div
                        className={styles.placeholder}
                        style={{ width: '10rem', display: `${loading ? 'flex' : 'none' }` }}
                        />
                    </span>
                </div>
            </div>
        </div>
    )
}