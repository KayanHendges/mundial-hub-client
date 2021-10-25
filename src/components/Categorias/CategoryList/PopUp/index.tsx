import Link from 'next/link'
import router from 'next/router'
import { useState } from 'react'
import { api } from '../../../../services/api'
import styles from './styles.module.scss'

export default function PopUp(props){


    const [ popUp, setPopUp ] = useState({
        display: "none"
    })

    function handlePopUp(boolean){
        if(!boolean){
            setPopUp({
                display: "flex"
            })
        } else {
            setPopUp({
                display: "none"
            })
        }
    }

    function deleteProduct(hubCategoryId){
        api.delete(`categorias/${hubCategoryId}`)
        .then(response => {
            alert(response.data.message)
            router.reload()
        })
        .catch(erro => {
            alert(erro)
            console.log(erro)
        })
    }

    return(
        <div
        className={styles.wrapper}
        onMouseLeave={() => handlePopUp(true)}
        >
            <button
            className={styles.popUpButton}
            type="button"
            onClick={() => handlePopUp(!popUp.display)}
            >
                <span>
                    ...
                </span>
            </button>
            <div
            className={styles.popUp}
            style={{
                display: `${popUp.display}`,
            }}
            >
                <Link href={`/categorias/nova-subcategoria/${props.hubCategoryId}`}>
                    <span
                    className={styles.container}
                    >
                        incluir subcategoria
                    </span>
                </Link>
                <Link href={`/categorias/${props.hubCategoryId}`}>
                    <span
                    className={styles.container}
                    >
                        editar
                    </span>
                </Link>
                <span
                className={styles.delete}
                onClick={() => deleteProduct(props.hubCategoryId)}
                >
                    excluir
                </span>
            </div>
        </div>
    )
}