import styles from './styles.module.scss'
import KitContainer from '../KitContainer'
import PriceContainer from '../../PriceContainer'
import PopUp from '../../PopUp'
import { useEffect, useState } from 'react'
import { api } from '../../../../../../services/api'

export default function ProductContainer(props){

    const [ showKits, setShowKits ] = useState({
        individual: true,
        show: false,
        display: 'none',
        request: false,
        rotate: '0deg',
        border: '1px solid var(--complementar-text)'
    })

    const [ kits, setKits ] = useState([])

    function whichKits(seachKits){
        if(seachKits.length > 0){
            return seachKits
        } else {
            return kits
        }
    }

    useEffect(() => {
        showKitsParams(props.search.showKits)
    }, [props.onChangeSearch])

    function showKitsParams(showKits){
        if(showKits == true){
            setShowKits({
                ...showKits,
                display: 'flex',
                show: true,
                rotate: '-90deg',
                border: '1px solid var(--complementar-text)'
            })
        } else {
            setShowKits({
                ...showKits,
                display: 'none',
                show: false,
                rotate: '0deg',
                border: '1px solid var(--complementar-text)'
            })
        }
    }

    function dropKits(boolean, reference){
        if(boolean && props.search.showKits != true){
            if(showKits.request){
                setShowKits({
                    ...showKits,
                    display: 'flex',
                    show: true,
                    rotate: '-90deg',
                    border: '1px solid var(--complementar-text)'
                })
            } else {
                requestKits(reference)
            }
        } else {
            if(boolean){
                setShowKits({
                    ...showKits,
                    display: 'flex',
                    show: true,
                    rotate: '-90deg',
                    border: '1px solid var(--complementar-text)'
                })
            } else {
                setShowKits({
                    ...showKits,
                    display: 'none',
                    show: false,
                    rotate: '0deg',
                    border: '1px solid var(--complementar-text)'
                })
            }
        }
    }

    function requestKits(reference){
        if(props.search.showKits != true){
            console.log('e fiz uma request')
            setShowKits({...showKits, rotate: '-90deg'})
            api.get(`produtos.kits.resumo/${reference}`)
            .then(response => {
                if(response.data.kits.length > 0){
                    setKits(response.data.kits)
                    setShowKits({
                        ...showKits,
                        display: 'flex',
                        request: true,
                        show: true,
                        rotate: '-90deg',
                        border: '1px solid #207567'
                    })
                    setTimeout(() => {
                        setShowKits({
                            ...showKits,
                            display: 'flex',
                            request: true,
                            show: true,
                            rotate: '-90deg',
                            border: '1px solid var(--complementar-text)'
                        })
                    }, 1000);
                } else {
                    setShowKits({
                        ...showKits,
                        display: 'none',
                        show: false,
                        rotate: '0deg',
                        border: '1px solid #E01D10'
                    })
                }
            })
            .catch(erro => {
                setShowKits({
                    ...showKits,
                    display: 'none',
                    show: false,
                    rotate: '0deg',
                    border: '1px solid #E01D10'
                })
            })
        }
    }

    return (
        <div
        className={styles.productContainer}
        >
            <div
            className={styles.unitaryRow}
            >
                <div
                className={styles.bodyCell}
                style={{ width: '10%' }}
                >
                    {props.produto.reference}
                </div>
                <div
                className={styles.bodyCell}
                style={{width: "7%" }}
                >
                    <img 
                    src={`${props.produto.imageUrl}`}
                    alt="imagem" 
                    style={{
                        width: "3.5rem",
                        height: "3.5rem",
                        borderRadius: ".4rem",
                        whiteSpace: "nowrap"
                    }}
                    />
                </div>
                <div
                className={styles.bodyCell}
                style={{ width: '63%', justifyContent: 'flex-start', paddingLeft: '1rem' }}
                >
                    {props.produto.name}
                </div>
                <div
                className={styles.bodyCell}
                style={{ width: '10%' }}
                >
                    {props.produto.stockTray}
                </div>
                <div
                className={styles.bodyCell}
                style={{ width: '15%' }}
                >
                    <PriceContainer 
                    price={props.produto.price}
                    promotionalPrice={props.produto.promotionalPrice}
                    startPromotion={props.produto.startPromotion}
                    endPromotion={props.produto.endPromotion}
                    />
                </div>
                <div
                className={styles.bodyCell}
                style={{ width: '5%', position: 'relative', overflow: 'visible', gap: '.3rem' }}
                >
                    <div
                    className={styles.showKits}
                    onClick={() => dropKits(!showKits.show, props.produto.reference)}
                    style={{ border: `${showKits.border}`, transform: `rotate(${showKits.rotate})` }}
                    >
                        {'<'}
                    </div>
                    <PopUp 
                    hubId={props.produto.hubId}
                    reference={props.produto.reference}
                    />
                </div>
            </div>
            <KitContainer
            display={showKits.display}
            kits={whichKits(props.produto.kits)}
            />
        </div>
    )
}