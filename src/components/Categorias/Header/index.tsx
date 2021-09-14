import styles from './styles.module.scss'

import BackButton from '../../Buttons/BackButton/Index'
import LinkBlueButton from '../../Buttons/LinkBlueButton'
import BlueButton from '../../Buttons/BlueButton'
import BlueButtonAction from '../../Buttons/BlueButtonAction'
import { api } from '../../../services/api'
import { useState } from 'react'

export default function Header(props){

    const [ getCategories, setGetCategories ] = useState('atualizar da Tray')

    function getCategoriesTray(){
        api.get('/tray.categorias')
        .then(response => console.log(response.data))
        .catch(erro => console.log(erro))
    }

    return(
        <div
        className={styles.wrapper}
        >
            <div
            className={styles.rowButtons}
            >
                <BackButton
                href={props.hrefBackButton}
                />
                {/* <BlueButtonAction
                text={getCategories}
                action={getCategoriesTray}
                /> */}
                <LinkBlueButton
                href={props.hrefButton}
                text={props.textButton}
                />
            </div>
            <span
            className={styles.title}
            >
                Categorias
            </span>
        </div>
    )
}