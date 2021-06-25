import Link from 'next/link';
import styles from './styles.module.scss';



export default function SideBar (){

    return (
        <div className={styles.sideBar}>
            <div className={styles.itemContainer} onChange={this}>
                <div className={styles.iconBox}>
                    <Link href="/products">
                        <a>
                            <img src="/tag1.png" alt="tag" />
                        </a>
                    </Link>
                </div>
                <div className={styles.itemTextContainer}>
                    <p>Produtos</p>
                </div>
            </div>
        </div>
    )
}