import { useContext, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { apiV2 } from '../../../../../../services/api/apiAxiosConfig'
import { ListOrdersProductsSoldParams, ListOrdersProductsSoldResponse, Order } from '../../../../../../services/api/types/Orders/Orders'
import floatToPrice from '../../../../../../services/floatToPrice'
import handleStyles from './handleStyles'
import styles from './styles.module.scss'

type Props = {
    orderId: number | null
}

export default function OrderProductsSold(props: Props){

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

    const products = data?.ordersProductsSold

    function totalProducts(): string{
        var somaProdutos = 0

        products.map(product => {
            somaProdutos += product.paidPrice
        })

        return `R$${floatToPrice(somaProdutos)}`
    }

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
                    {data?.ordersProductsSold.map(product => {
                        return (
                            <div
                            className={styles.productContainer}
                            >
                                <span>{ product?.reference } - { product?.name }</span>
                                <span>{ product?.quantity }un</span>
                                <span>{ `R$${floatToPrice(product?.paidPrice)}` }</span>
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
            </div>
        </div>
    )
}