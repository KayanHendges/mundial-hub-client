import Link from 'next/link'
import router from 'next/router'
import { useState } from 'react'
import { api } from '../../../../services/api2'
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
            setDisplay("flex")
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
                <Link href={`/categorias/${props.categoryId}`}>
                    <h1
                    className={styles.newSubcategory}
                    >
                        incluir subcategoria
                    </h1>
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