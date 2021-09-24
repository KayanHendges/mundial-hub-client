import styles from './styles.module.scss'

import LinkBlueButton from '../../../Buttons/LinkBlueButton'
import BlueButton from '../../../Buttons/BlueButton'
import { api } from '../../../../services/api'
import BlueButtonAction from '../../../Buttons/BlueButtonAction'

export default function HeaderProductList(props){

    function getTrayProducts(){
        api.get('/tray.atualizar_produtos')
        .then(response => {
            console.log(response.data)
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
            {/* <BlueButtonAction
            text='getTrayProducts'
            action={getTrayProducts}
            /> */}
            <LinkBlueButton
            href={props.hrefButton}
            text={props.textButton}
            />
        </div>
    )
}