import styles from './styles.module.scss'

export default function PriceContainer(props){

    function setStyles(promotionPrice){
        if(promotionPrice.length > 0){
            return {
                price: {
                    color: "var(--complementar-text)",
                    fontWeight: 400,
                    textDecoration: "line-through",
                    textDecorationColor: "var(--white-text)",
                },
                promotionPrice: {
                    display: "flex"
                },
                date: {
                    display: "flex"
                }
            }
        } else {
            return {
                price: {
                    color: "var(--white-text)",
                    fontWeight: 600,
                    textDecoderation: "none",
                    textDecorationColor: "var(--white-text)"
                },
                promotionPrice: {
                    display: "none"
                },
                date: {
                    display: "none"
                }
            }
        }
    }

    const priceStyles = setStyles(props.promotionalPrice)

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
                    style={priceStyles.price}
                    >
                        {props.price}
                    </span>
                    <span
                    className={styles.promotionalPrice}
                    style={priceStyles.promotionPrice}
                    >
                        {props.promotionalPrice}
                    </span>
                </div>
                <div
                className={styles.dateRow}
                >
                    <span
                    className={styles.date}
                    style={priceStyles.date}
                    >
                        {`${props.startPromotion} até ${props.endPromotion}`}
                    </span>
                </div>
            </div>
        )
    }
}