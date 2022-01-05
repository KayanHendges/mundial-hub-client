import { useEffect, useState } from 'react'
import ImageZoom from '../ProductContainer/ImageZoom'
import styles from './styles.module.scss'

export default function KitContainer(props){

    const [ containerStyles, setContainerStyles ] = useState({
        height: '0rem',
        borderTop: 'none',
    })

    const [ imageZoomDisplay, setImageZoomDisplay ] = useState('none')
    const [ indexImage, setIndexImage ] = useState(0)

    useEffect(() => {
        if(props.display == 'flex'){
            setContainerStyles({
                height: '4rem',
                borderTop: '1px solid var(--gray-line)',
            })
        }
        if(props.display == 'none'){
            setContainerStyles({
                height: '0rem',
                borderTop: 'none',
            })
        }
    }, [props.display])

    function hasPromotion(kit){
        if(kit.tray_promotional_price > 0){
            return kit.tray_promotional_price
        } else {
            return kit.tray_price
        }
    }

    function has90Image(kit){
        if(kit.picture_source_1_90 != null && kit.picture_source_1_90.length > 0){
            return kit.picture_source_1_90
        } else {
            return kit.picture_source_1
        }
    }

    function linkStore(trayId){
        if(props.search.store == 668385){
            return `https://www.mundialpneumaticos.com.br/loja/produto.php?IdProd=${trayId}`
        }
        if(props.search.store == 1049898){
            return `https://www.scpneus.com.br/loja/produto.php?IdProd=${trayId}`
        }
    }

    if(props.kits.length > 0){
        return (
            <div
            className={styles.wrapper}
            style={containerStyles}
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
                                onClick={() => {
                                    setIndexImage(index)
                                    setImageZoomDisplay('flex')
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
                                    <a
                                    href={`${linkStore(kit.tray_product_id)}`}
                                    target="_blank"
                                    >
                                        <span 
                                        className='material-icons'
                                        id={styles.icon}
                                        >
                                            open_in_new
                                        </span>
                                    </a>
                                </div>
                                <div
                                className={styles.priceContainer}
                                >
                                    <span>
                                        estoque: {kit.tray_stock}
                                    </span>
                                    <span>
                                        preço: {hasPromotion(kit)}
                                    </span>
                                </div>
                            </div>
                            <ImageZoom 
                            imageUrl={props.kits[indexImage].picture_source_1}
                            display={imageZoomDisplay}
                            setDisplay={setImageZoomDisplay}
                            />
                        </div>
                    )
                })}
            </div>
        )  
    } else {
        return (<></>)
    }
}