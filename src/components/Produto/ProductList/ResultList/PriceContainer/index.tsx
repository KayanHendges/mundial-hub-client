import styles from './styles.module.scss'

export default function PriceContainer(props){

    if(parseFloat(props.promotionalPrice) > 0){
        return(
            <div
            className={styles.wrapper}
            >
                <div
                className={styles.priceRow}
                >
                    <span
                    className={styles.price}
                    >
                        {props.price}
                    </span>
                    <span
                    className={styles.promotionalPrice}
                    >
                        {props.promotionalPrice}
                    </span>
                </div>
                <div
                className={styles.dateRow}
                >
                    <span
                    className={styles.date}
                    >
                        {props.startPromotion}
                    </span>
                    <span
                    className={styles.date}
                    >
                        {props.endPromotion}
                    </span>
                </div>
            </div>
        )
    }
}