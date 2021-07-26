import Link from 'next/link';
import styles from './styles.module.scss';

export default function Header() {
    return (
        <div className={styles.header}>
            <Link href="/">
                <a>
                    <img src="/logo-branca.png" alt="logo-branca" />
                </a>
            </Link>
            <p>Hub</p>
            <span>/mundialpneumaticos</span>
        </div>
    )
}