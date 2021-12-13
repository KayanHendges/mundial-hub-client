import styles from './styles.module.scss'
import BackButton from '../../Buttons/BackButton/Index'
import BlueButton from '../../Buttons/BlueButton'

type HeaderProps = {
    maxWidth: string;
    href: string;
    textButton: string;
    strong: string;
    title: string;
}

export default function Header(props: HeaderProps) {
    return (
        <div 
        className={styles.header}
        style={{ maxWidth: `${props.maxWidth}` }}
        >
            <div className={styles.toolsBar}>
                <BackButton href={props.href} />
                <BlueButton text={props.textButton}/>
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