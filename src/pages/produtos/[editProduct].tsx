import Head from 'next/head';
import { parseCookies } from 'nookies';
import Header from '../../components/Produto/Edit/Header';
import OffersPopUp from '../../components/Produto/Edit/OffersPopUp';
import Tabs from '../../components/Produto/Edit/Tabs';
import TabSelector from '../../components/Produto/Edit/TabSelector';
import { ProductProvider } from '../../contexts/ProductContext';
import styles from './editProduct.module.scss'

export default function editProduct(props){
    
    return (
        <ProductProvider>
            <div
            className={styles.wrapper}
            >
                <Head>
                    <title>Cadastro</title>
                </Head>
                <Header
                textButton='cadastrar produto'
                title="Edite as informações do produto"
                href="/produtos"
                maxWidth='100rem'
                />
                <TabSelector />
                <Tabs />
                <OffersPopUp />
            </div>
        </ProductProvider>
    )
}

export const getServerSideProps = async (ctx) => {

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

    const id = ctx.params.editProduct
     
    return {
        props: {
            reference: id,
        }
    }
}