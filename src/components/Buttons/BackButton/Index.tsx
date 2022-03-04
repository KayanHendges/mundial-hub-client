import Link from 'next/link';
import router, { useRouter } from 'next/router';
import styles from './styles.module.scss'

export default function BackButton(props){

    const Router = useRouter()

    return(
        <Link href={props.href}>
            <div className={styles.wrapper}
            // onClick={() => Router.back}
            >
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