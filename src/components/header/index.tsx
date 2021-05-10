import styles from './styles.module.scss';

export default function Header() {
    return (
        <div className={styles.header}>
            <a href="/">
                <img src="/logo-branca.png" alt="logo-branca" />
            </a>
            <p>Hub</p>
            <span>/mundialpneumaticos</span>
        </div>
    )
}