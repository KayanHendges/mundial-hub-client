import { GetStaticProps } from 'next';
import styles from './styles.module.scss'
import Header from '../../../components/Produto/Header';
import Selector from '../../../components/Produto/Selector';
import { useState } from 'react';



export default function produtos(){
    
    const startValues = {
        name: "teste",
        reference: "0001",
        ean: "12345678910",
        idTray: 1,
        brand: "Goodyear",
        model: "EfficientGrip",
        description: "teste"
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

    function onlyNumber(evt) {
        var theEvent = evt || window.event;
        var key = theEvent.keyCode || theEvent.which;
        key = String.fromCharCode( key );
        //var regex = /^[0-9.,]+$/;
        var regex = /^[0-9.]+$/;
        if( !regex.test(key) ) {
           theEvent.returnValue = false;
           if(theEvent.preventDefault) theEvent.preventDefault();
        }
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