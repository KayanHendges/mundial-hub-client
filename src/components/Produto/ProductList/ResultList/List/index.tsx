import styles from './styles.module.scss'
import PriceContainer from '../PriceContainer'
import PopUp from '../PopUp'
import { useState } from 'react'

export default function List(props){

    console.log(props)

    return (
        <tbody
        className={styles.bodyList}
        >
            {props.resultados.map(produto => {
                return (
                    <tr
                    key={produto.hubId}
                    className={styles.rowItem}
                    style={{
                        height: "4rem"
                    }}
                    >
                        <td
                        className={styles.tdItem}
                        style={{width: "1rem"}}
                        >
                            {produto.reference}
                        </td>
                        <td
                        className={styles.tdItem}
                        style={{width: "3rem", padding: ".75rem 0rem"}}
                        >
                            <img 
                            src={`${produto.imageUrl}`}
                            alt="imagem" 
                            style={{
                                width: "3rem",
                                height: "3rem",
                                borderRadius: ".4rem",
                                whiteSpace: "nowrap"
                            }}
                            />
                        </td>
                        <td
                        className={styles.tdItem}
                        style={{textAlign: "start"}}
                        >
                            {produto.name}
                        </td>
                        <td
                        className={styles.tdItem}>
                            {produto.stockTray}
                        </td>
                        <td
                        className={styles.tdItem}>
                            <PriceContainer 
                            price={produto.price}
                            promotionalPrice={produto.promotionalPrice}
                            startPromotion={produto.startPromotion}
                            endPromotion={produto.endPromotion}
                            />
                        </td>
                        <td
                        className={styles.tdItem}
                        style={{
                            position: "relative"
                        }}
                        >
                            <PopUp 
                            hubId={produto.hubId}
                            trayId={produto.trayId}
                            />
                        </td>
                    </tr>
                )                
            })}
        </tbody>
    )
}