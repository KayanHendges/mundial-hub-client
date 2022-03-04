import { GetServerSideProps } from 'next'
import { parseCookies } from 'nookies'
import styles from './styles.module.scss'

export default function Fornecedores(props){
    return (
        <div
        className={styles.wrapper}
        >
            
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { ['mundialhub.token']: token } = parseCookies(ctx)

    if(!token){
        const { url } = ctx.req
        return {
            redirect: {
            destination: `/login?redirect=${url}`,
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