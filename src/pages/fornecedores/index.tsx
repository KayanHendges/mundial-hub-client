import { GetServerSideProps } from 'next'
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

    const query = ctx.query.search ?  ctx.query.search : ''

    return {
        props: {
            query: query
        }
    }
}