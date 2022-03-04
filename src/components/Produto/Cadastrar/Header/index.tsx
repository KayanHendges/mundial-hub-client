import { useContext } from 'react'
import { NewProductContext } from '../../../../contexts/NewProductContext'
import BackButton from '../../../Buttons/BackButton/Index'
import BlueButton from '../../../Buttons/BlueButton'
import styles from './styles.module.scss'

type HeaderProps = {
    maxWidth: string;
    href: string;
    textButton: string;
    strong: string;
    title: string;
}

export default function Header(props: HeaderProps) {
    
    const { submit, setSubmit } = useContext(NewProductContext)

    return (
        <div 
        className={styles.header}
        style={{ maxWidth: `${props.maxWidth}` }}
        >
            <div className={styles.toolsBar}>
                <BackButton href={props.href} />
                <div className={styles.title}>
                    <strong>
                        {props.strong}
                    </strong>
                    <span>
                        {props.title}
                    </span>
                </div>
                <div
                className={styles.submitButton}
                onClick={() => {
                    if(!submit){
                        setSubmit(true)
                    }
                }}
                >
                    cadastrar
                </div>
            </div>
        </div>
    )
}