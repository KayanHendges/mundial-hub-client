import Link from 'next/link';
import styles from './styles.module.scss';



export default function SideBar (){

    return (
        <div className={styles.sideBar}>
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
                <Link href={"/products"}>
                    <p>Produtos</p>
                </Link>
                <Link href={"/categories"}>
                    <p>Categorias</p>
                </Link>
            </div>
        </div>
    )
}