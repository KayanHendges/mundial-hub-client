import { GetStaticProps } from 'next';
import styles from './styles.module.scss'

import Header from '../../components/Categorias/Header';
import CategoryList from '../../components/Categorias/CategoryList';

export default function categorias(props){
    return (
        <div
        className={styles.wrapper}
        >
            <Header 
            hrefBackButton="/"
            hrefButton="/categorias/nova-categoria"
            textButton="incluir categoria"
            />
            <CategoryList
            />
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {

    return {
        props: {
        },
    }
}