import { parseCookies } from 'nookies'
import styles from './styles.module.scss'

export default function SincronizarProdutos(props){
    return (
        <div
        className={styles.wrapper}
        >
            
        </div>
    )
}

export const getServerSideProps = async (ctx) => {

    const { ['mundialhub.token']: token } = parseCookies(ctx)

    if(!token){
        return {
            redirect: {
            destination: '/login',
            permanent: false
            }
        }
    }

    const query = ctx.query.search ?  ctx.query.search : ''

    return {
        props: {
            query: query
        }
    }
}