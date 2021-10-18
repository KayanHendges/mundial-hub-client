import styles from './styles.module.scss'

export default function KitContainer(props){

    if(props.kits.length > 0){
        return (
            <div
            className={styles.wrapper}
            >
                {props.kits.map(kit => {
                    console.log(kit)
                    return (
                        <div
                        className={styles.kitContainer}
                        >
                            <img
                            src={kit.picture_source_1_90}
                            alt="kit imagem"
                            className={styles.kitImg}
                            />
                            <div
                            className={styles.kitInfo}
                            >
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