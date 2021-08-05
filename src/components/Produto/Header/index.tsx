import styles from './styles.module.scss'
import BackButton from '../../Buttons/BackButton/Index'
import BlueButton from '../../Buttons/BlueButton'

export default function Header(props) {
    return (
        <div className={styles.header}>
            <div className={styles.toolsBar}>
                <BackButton href={props.href} />
                <BlueButton text={props.submit}/>
            </div>
            <div className={styles.title}>
                <strong>
                    {props.strong}
                </strong>
                <span>
                    {props.title}
                </span>
            </div>
        </div>
    )
}