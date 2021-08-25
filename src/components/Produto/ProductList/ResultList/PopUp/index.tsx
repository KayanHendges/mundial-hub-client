import Link from 'next/link'
import { useState } from 'react'
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
                >
                    excluir
                </span>
            </div>
        </div>
    )
}