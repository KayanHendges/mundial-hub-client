import styles from './styles.module.scss'

import LinkBlueButton from '../../../Buttons/LinkBlueButton'
import BlueButton from '../../../Buttons/BlueButton'
import { api } from '../../../../services/api'

export default function HeaderProductList(props){

    function updateTiny(){
        console.log("update chamado")
        api.get('/produtos/', {
            params: {
                function: "updateTiny"
            }
        })
        .then(response => {
            console.log(response.data)
        })
        .catch(erro => {
            console.log(erro)
        })
    }

    return (
        <div
        className={styles.wrapper}
        >
            <span
            className={styles.title}
            >
                Todos os produtos
            </span>
            <BlueButton 
            text={"receber produtos da Tiny"}
            onClick={updateTiny}
            />
            <LinkBlueButton
            href={props.hrefButton}
            text={props.textButton}
            />
        </div>
    )
}