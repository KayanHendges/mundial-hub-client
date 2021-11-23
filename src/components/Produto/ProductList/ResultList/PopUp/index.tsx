import Link from 'next/link'
import router from 'next/router'
import { useState } from 'react'
import { api } from '../../../../../services/api'
import styles from './styles.module.scss'

export default function PopUp(props){

    const [ updateImagesSpan, setUpdateImagesSpan ] = useState('atualizar imagens')

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

    function updateImages(reference){
        setUpdateImagesSpan('atualizando...')
        api.post(`/client.productList.updateImages/${reference}`)
        .then(response => {
            if(response.data.code == 200){
                setUpdateImagesSpan('atualizado')
                router.reload()
            } else {
                console.log(response.data)
            }
        })
        .catch(erro => {
            alert(erro.response.data.message)
            console.log(erro)
        })
    }

    function deleteProduct(reference){
        api.delete(`produtos?reference=${reference}`)
        .then(response => {
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
                <Link href={`/produtos/${props.reference}`}>
                    <span
                    className={styles.container}
                    >
                        editar
                    </span>
                </Link>
                <span
                className={styles.container}
                onClick={() => updateImages(props.reference)}
                >
                    {updateImagesSpan}
                </span>
                <span
                className={styles.delete}
                onClick={() => deleteProduct(props.reference)}
                >
                    excluir
                </span>
            </div>
        </div>
    )
}