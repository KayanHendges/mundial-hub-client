import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './styles.module.scss';

export default function Header() {

    const { user, isAuthenticated } = useContext(AuthContext)
    

    function display(boolean){
        if(boolean){
            return 'flex'
        } else {
            return 'none'
        }
    }

    return (
        <div
        className={styles.header}
        style={{ display: `${display(isAuthenticated)}` }}
        >
            <Link href="/">
                <a>
                    <img src="/logo-branca.png" alt="logo-branca" />
                </a>
            </Link>
            <p>Hub</p>
            <span>/{user?.name}</span>
        </div>
    )
}