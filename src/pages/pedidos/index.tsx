import styles from './styles.module.scss'
import { } from './componentStyles'
import { GetServerSideProps } from "next"
import { parseCookies } from "nookies"
import OrdersHeader from '../../components/Pages/Vendas/Pedidos/OrdersHeader'
import ImportOrders from '../../components/Pages/Vendas/Pedidos/ImportOrders'
import { OrdersProvider } from '../../contexts/OrdersContext'

export default function Orders(){

    return (
        <OrdersProvider>
            <div
            className={styles.wrapper}
            >
                <ImportOrders />
                <OrdersHeader />
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