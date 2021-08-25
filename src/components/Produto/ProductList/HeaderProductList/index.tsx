import styles from './styles.module.scss'

import LinkBlueButton from '../../../Buttons/LinkBlueButton'

export default function HeaderProductList(props){
    return (
        <div
        className={styles.wrapper}
        >
            <span
            className={styles.title}
            >
                Todos os produtos
            </span>
            <LinkBlueButton
            href={props.hrefButton}
            text={props.textButton}
            />
        </div>
    )
}