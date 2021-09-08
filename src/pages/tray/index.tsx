import { GetStaticProps } from 'next'
import styles from './styles.module.scss'

export default function tray(props){
    console.log(props)
    return(
        <div>
            <h1>
                Mundial Hub
            </h1>
            <a href={`${props}/auth.php?response_type=code&consumer_key=de64a56c6cb078828acc0d62ad9ab08c16a89440edddc28dd26ab9788ebdd10d&callback=http://mundialhub.com.br/oAuth2Tray`}>
                <button>
                    Integrar
                </button>
            </a>
        </div>
    )
}

export const getInitialProps = async ({query}) => {

    return {
        props: {
            query: query
        }
    }
}