import Link from 'next/link';
import router from 'next/router';
import styles from './styles.module.scss'

export default function BackButton(props){
    return(
        // <Link href={props.href}>
            <div className={styles.wrapper}
            onClick={() => router.back()}
            >
                <div className={styles.circle}>
                    {"<"}
                </div>
                <span>
                    voltar
                </span>
            </div>
        // </Link>
    )
}