import Link from 'next/link';
import styles from './styles.module.scss';


export default function SideBar (){
    return (
        <div className={styles.sideBar}>
            <div className={styles.itemBar}>
                <div className={styles.itemContainer}>
                    <Link href="/products">
                        <a>
                            <img src="/tag1.png" alt="tag" />
                        </a>
                    </Link>
                </div>
            </div>
        </div>
    )
}