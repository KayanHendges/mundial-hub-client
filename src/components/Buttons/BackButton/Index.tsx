import Link from 'next/link';
import styles from './styles.module.scss'

export default function BackButton(props){
    return(
        <Link href={props.href}>
            <div className={styles.wrapper}>
                <div className={styles.circle}>
                    {"<"}
                </div>
                <span>
                    voltar
                </span>
            </div>
        </Link>
    )
}