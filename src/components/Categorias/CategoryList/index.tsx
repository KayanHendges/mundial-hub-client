import { useEffect, useState } from 'react'
import styles from './styles.module.scss'

import { api } from '../../../services/api'
import CategoriesList from './CategoriesList'

export default function CategoryList(props){

    const [ resultado, setResultado ] = useState(<div>carregando...</div>)

    useEffect(() => {
        getCategories()
    }, [])

    async function getCategories(){
        await api.get('categorias/arvore')
        .then(response => {
            setResultado(<CategoriesList categories={response.data}/>)
        })
        .catch(erro => {
            console.log(erro)
        })
    }
    
    return(
        <div
        className={styles.wrapper}
        >
            {resultado}
        </div>
    )
}