import Link from 'next/link'
import router from 'next/router'
import { useState } from 'react'
import { api } from '../../../../services/api'
import styles from './styles.module.scss'

export default function PopUp(props){

    const [ display, setDisplay ] = useState("none")

    function deleteCategory(category_id){
        const idToDelete = [category_id]

        function findChildrens(category){
            if(category.children != null){
                category.children.map(children => {
                    idToDelete.push(children.hub_category_id)
                    if(children.children != null){
                        children.children.map(childrenChild => {
                            findChildrens(childrenChild)
                            idToDelete.push(childrenChild.hub_category_id)
                        })
                    }
                })
            }
        }
        findChildrens(props.category)

        api.delete(`/categorias/`, {params: {
            idsToDelete: idToDelete
        }})
        .then(() => {
          alert(`categoria id=${category_id} excluida com sucesso`)
          router.push('/categorias')
        }).catch((error) => {
          alert(error)
        })
    }
    

    function handleDisplay(){
        if(display == "none"){ //ativa
            setDisplay("block")
        } else { // desativa
            setDisplay("none")
        }
    }

    return(
        <div
        className={styles.wrapper}
        onClick={() => handleDisplay()}
        >
            <div
            className={styles.container}
            style={{display: `${display}`}}
            >
                <Link href={`/categorias/nova-subcategoria/${props.categoryId}`}>
                    <div
                    className={styles.newSubcategory}
                    >
                        incluir subcategoria
                    </div>
                </Link>
                <Link href={`/categorias/${props.categoryId}`}>
                    <div
                    className={styles.newSubcategory}
                    >
                        editar
                    </div>
                </Link>
                <h1
                className={styles.delete}
                onClick={() => deleteCategory(props.categoryId)}
                >
                    excluir
                </h1>
            </div>
            <div className={styles.more}>
                    <span>
                        ...
                    </span>
            </div>
            
        </div>
    )
}