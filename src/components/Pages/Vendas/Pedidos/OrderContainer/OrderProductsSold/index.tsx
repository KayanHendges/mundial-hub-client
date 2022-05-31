import { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { OrdersContext } from '../../../../../../contexts/OrdersContext'
import { apiV2 } from '../../../../../../services/api/apiAxiosConfig'
import { ListOrdersProductsSoldParams, ListOrdersProductsSoldResponse, Order } from '../../../../../../services/api/types/Orders/Orders'
import floatToPrice from '../../../../../../services/floatToPrice'
import handleStyles from './handleStyles'
import styles from './styles.module.scss'

type Props = {
    orderId: number | null
}

export default function OrderProductsSold(props: Props){

    const { expandOrderId } = useContext(OrdersContext)
    const [ open, setOpen ] = useState<boolean>(true)
    const { containerStyles } = handleStyles({ open })

    const { data, isFetching } = useQuery<ListOrdersProductsSoldResponse>(`products_sold_order_id_${props.orderId}`,
    async() => {
        if(!props.orderId){
            return null
        }

        const body: ListOrdersProductsSoldParams = { productsSold: { orderId: props.orderId } }
        const response = await apiV2.post('/orders/products-sold/list', body)

        return response.data

    }, {
        refetchOnWindowFocus: true,
        enabled: true
    })

    const products = data?.ordersProductsSold? data.ordersProductsSold : []

    function totalProducts(): string{
        var somaProdutos = 0

        products.map(product => {
            somaProdutos += product.paidPrice * product.quantity
        })

        return `R$${floatToPrice(somaProdutos)}`
    }

    useEffect(() => {
        if(!expandOrderId){
            setOpen(false)
        }

        if(expandOrderId){
            setTimeout(() => {
                setOpen(true)
            }, 300)
        }

    }, [expandOrderId])

    return (
        <div
        className={styles.wrapper}
        >
            <span
            className={styles.header}
            onClick={() => { setOpen(!open) }}
            >
                produtos
            </span>
            <div
            className={styles.container}
            style={containerStyles}
            >
                <div
                className={styles.productsList}
                >
                    {data?.ordersProductsSold.map((product, index) => {
                        return (
                            <div
                            key={index}
                            className={styles.productContainer}
                            >
                                <span>
                                    { product?.reference } - { product?.name }
                                    { product?.kitId? ` (relacionado ao kit id ${product.kitId})` : '' }
                                </span>
                                <span>{ product?.quantity }un</span>
                                <span style={{ textAlign: 'end' }} >
                                    { `R$${floatToPrice(product?.paidPrice)}` }
                                </span>
                            </div>
                        )
                    })}
                </div>
                {data?.ordersProductsSold.length > 0? 
                <span
                className={styles.totalProducts}
                >
                    total em produtos {totalProducts()}
                </span>
                : <></>}
                {products?.length == 0 && !isFetching?
                <span className={styles.noResults}>nenhum produto vendido nesse pedido</span>
                : <></> }
            </div>
        </div>
    )
}