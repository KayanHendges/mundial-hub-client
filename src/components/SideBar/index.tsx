import Link from 'next/link';
import { useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import styles from './styles.module.scss';



export default function SideBar (){
    return (
        <div
        className={styles.sideBar}
        >
            <div className={styles.itemContainer} onChange={this}>
                <div className={styles.iconBox}>
                    <a>
                        <img src="/tag1.png" alt="tag" />
                    </a>
                </div>
                <div className={styles.itemTextContainer}>
                    <span>Catalogo</span>
                </div>
            </div>
            <div className={styles.subItemContainer}>
                <Link href={"/produtos"}>
                    <p>Produtos</p>
                </Link>
                <Link href={"/categorias"}>
                    <p>Categorias</p>
                </Link>
            </div>
        </div>
    )
}