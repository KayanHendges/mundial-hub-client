import Link from 'next/link'
import router from 'next/router'
import { useState } from 'react'
import { api } from '../../../../../services/api'
import styles from './styles.module.scss'

export default function PopUp(props){

    const [ popUp, setPopUp ] = useState({
        display: "none"
    })

    function handlePopUp(){
        if(popUp.display == "none"){
            setPopUp({
                display: "flex"
            })
        } else {
            setPopUp({
                display: "none"
            })
        }
    }

    function deleteProduct(hubId){
        api.delete('produtos/', {
            params: {
                hub_id: hubId
            }
        })
        .then(() => {
            router.reload()
            alert('produto excluído com sucesso')
        })
        .catch(erro => {
            alert(erro)
            console.log(erro)
        })
    }

    return(
        <div
        className={styles.wrapper}
        >
            <button
            className={styles.popUpButton}
            type="button"
            onClick={handlePopUp}
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
                <Link href={`/produtos/${props.hubId}`}>
                    <span
                    className={styles.container}
                    >
                        editar
                    </span>
                </Link>
                <span
                className={styles.delete}
                onClick={() => deleteProduct(props.hubId)}
                >
                    excluir
                </span>
            </div>
        </div>
    )
}