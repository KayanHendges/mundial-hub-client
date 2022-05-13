import Link from 'next/link';
import router, { useRouter } from 'next/router';
import styles from './styles.module.scss'

export default function BackButton(props){

    const Router = useRouter()

    return(
        <div className={styles.wrapper}
        onClick={() => {
            router.back()
        }}
        >
            <div className={styles.circle}>
                {"<"}
            </div>
            <span>
                voltar
            </span>
        </div>
    )
}