import { GetStaticProps } from 'next';
import styles from './styles.module.scss'
import Header from '../../../components/Produto/Header';
import Selector from '../../../components/Produto/Selector';
import { useState } from 'react';



export default function produtos(){
    
    const startValues = {
        name: "teste",
        estoque: "0"
    }
    
    const [ values, setValues ] = useState(startValues)
    
    function setValue(chave, valor) {
        setValues({
          ...values,
          [chave]: valor,
        })
      }

    function handleChange(e){
        setValue(
            e.target.getAttribute('name'),
            e.target.value
        )
    }

    return (
        <div className={styles.Wrapper}>
            <Header 
            submit={"Salvar Produto"}
            strong={"Novo Produto"}
            title={"Insira as informações do produto que deseja cadastrar"}
            />
            <Selector
            values={values}
            onChange={handleChange}
            />
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {


    return {
        props: {
            
        }
    }
}