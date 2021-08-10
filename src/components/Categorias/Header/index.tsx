import styles from './styles.module.scss'

import BackButton from '../../Buttons/BackButton/Index'
import LinkBlueButton from '../../Buttons/LinkBlueButton'

export default function Header(props){
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