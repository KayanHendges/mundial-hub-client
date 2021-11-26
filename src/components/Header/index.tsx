import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './styles.module.scss';

export default function Header() {

    const { user } = useContext(AuthContext)

    return (
        <div
        className={styles.header}
        >
            <Link href="/">
                <a>
                    <img src="/logo-branca.png" alt="logo-branca" />
                </a>
            </Link>
            <p>Hub</p>
            <div
            className={styles.userContainer}
            >
                <span>
                    /{user?.name}
                </span>
            </div>
        </div>
    )
}