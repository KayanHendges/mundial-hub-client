import styles from './styles.module.scss';


export default function SideBar (){
    return (
        <div className={styles.sideBar}>
            <div className={styles.itemBar}>
                <div className={styles.itemContainer}>
                    <a href="/products">
                        <img src="/tag.svg" alt="tag" />
                    </a>
                </div>
            </div>
        </div>
    )
}