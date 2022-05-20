import styles from './styles.module.scss'
import { GetServerSideProps } from "next"
import { parseCookies } from "nookies"

import { OrdersProvider } from '../../contexts/OrdersContext'

import OrdersContainer from '../../components/Pages/Vendas/Pedidos/OrdersContainer'
import OrderContainer from '../../components/Pages/Vendas/Pedidos/OrderContainer'
import ImportOrders from '../../components/Pages/Vendas/Pedidos/ImportOrders'

export default function Orders(){

    return (
        <OrdersProvider>
            <div
            className={styles.wrapper}
            >
                <OrdersContainer />
                <OrderContainer />
                <ImportOrders />
            </div>
        </OrdersProvider>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { ['mundialhub.token']: token } = parseCookies(ctx)

    if(!token){
        const url = ctx.resolvedUrl
        return {
            redirect: {
            destination: `/login?redirect=${encodeURIComponent(url)}`,
            permanent: false
            }
        }
    }

    return {
        props: {
            
        }
    }
}