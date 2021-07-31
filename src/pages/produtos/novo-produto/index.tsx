import { GetStaticProps } from 'next';
import styles from './styles.module.scss'
import Header from '../../../components/Produto/Header';
import Selector from '../../../components/Produto/Selector';


export default function produtos(){
    return (
        <div className={styles.Wrapper}>
            <Header 
            submit={"Salvar Produto"}
            strong={"Novo Produto"}
            title={"Insira as informações do produto que deseja cadastrar"}
            />
            <Selector />
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {


    return {
        props: {
            
        }
    }
}