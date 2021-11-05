import styles from './styles.module.scss'

export default function KitContainer(props){

    function hasPromotion(kit){
        if(kit.promotional_price){
            return kit.promotional_price
        } else {
            kit.price
        }
    }

    function has90Image(kit){
        if(kit.picture_source_1_90 != null && kit.picture_source_1_90.length > 0){
            return kit.picture_source_1_90
        } else {
            return kit.picture_source_1
        }
    }

    if(props.kits.length > 0){
        return (
            <div
            className={styles.wrapper}
            style={{ display: `${props.display}` }}
            >
                {props.kits.map((kit, index) => {
                    return (
                        <div
                        key={index}
                        className={styles.kitContainer}
                        >
                            <div
                            className={styles.imgContainer}
                            >
                                <div
                                className={styles.kitImg}
                                style={{
                                    backgroundImage: `url("${has90Image(kit)}")`
                                }}
                                >
                                </div>
                            </div>
                            <div
                            className={styles.kitInfo}
                            >
                                <div
                                className={styles.kitName}
                                >
                                    <p>
                                        {kit.product_name}
                                    </p>
                                </div>
                                <div
                                className={styles.priceContainer}
                                >
                                    <span>
                                        estoque: {kit.stock_tray}
                                    </span>
                                    <span>
                                        preço: {hasPromotion(kit)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        )  
    } else {
        return (<></>)
    }
}