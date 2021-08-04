import { GetStaticProps } from 'next';
import styles from './styles.module.scss'
import Header from '../../../components/Produto/Header';
import Selector from '../../../components/Produto/Selector';
import { useState } from 'react';
import titleize from '../../../services/Titleize'
import onlyNumber from '../../../services/onlyNumber'


export default function produtos(){
    
    const startValues = {
        name: "teste",
        reference: "0001",
        ean: "12345678910",
        idTray: 1,
        brand: "Goodyear",
        model: "EfficientGrip",
        description: "",
        images: [
            {imageUrl: "https://images.tcdn.com.br/img/img_prod/668385/pneu_285_75r16_catchfors_a_t_lb_122_119s_lanvigator_6673_1_7efd5805c3cd1ae58dc6beebd6ab9e95.jpg"},
            {imageUrl: ""},
            {imageUrl: ""},
            {imageUrl: ""},
            {imageUrl: ""},
            {imageUrl: ""}
        ]
    }
    
    const [ values, setValues ] = useState(startValues)
    
    function setValue(chave, valor) {
        setValues({
          ...values,
          [chave]: valor,
        })
      }

    function handleDescription(boolean){ // ativa/desativa a descrição automatica
        if(boolean == true){ // desativa
            setValues({
                ...values,
                description: values.description 
            })
        } else {
            setValues({ // ativa
                ...values,
                description: titleize(values.name)
            })
        }
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
            onlyNumber={onlyNumber}
            handleDescription={handleDescription}
            setValue={setValue}
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