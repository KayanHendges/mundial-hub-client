import styles from './styles.module.scss'
import BackButton from '../../Buttons/BackButton/Index'
import BlueButton from '../../Buttons/BlueButton'

type HeaderProps = {
    maxWidth: string;
    href: string;
    textButton: string;
}

export default function Header(props) {
    return (
        <div 
        className={styles.header}
        style={{ maxWidth: `${props.maxWidth}` }}
        >
            <div className={styles.toolsBar}>
                <BackButton href={props.href} />
                <BlueButton text={props.textButton} submitButton={props.submitButton}/>
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