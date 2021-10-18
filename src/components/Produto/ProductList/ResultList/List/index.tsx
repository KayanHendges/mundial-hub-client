import styles from './styles.module.scss'
import PriceContainer from '../PriceContainer'
import PopUp from '../PopUp'
import { useState } from 'react'
import KitContainer from './KitContainer'

export default function List(props){

    return (
        <div
        className={styles.wrapper}
        >
            {props.resultados.map(produto => {
                console.log(produto)
                return (
                    <div
                    key={produto.reference}
                    className={styles.productContainer}
                    >
                        <div
                        className={styles.unitaryRow}
                        >
                            <div
                            className={styles.bodyCell}
                            style={{ width: '10%' }}
                            >
                                {produto.reference}
                            </div>
                            <div
                            className={styles.bodyCell}
                            style={{width: "7%" }}
                            >
                                <img 
                                src={`${produto.imageUrl}`}
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
                                {produto.name}
                            </div>
                            <div
                            className={styles.bodyCell}
                            style={{ width: '10%' }}
                            >
                                {produto.stockTray}
                            </div>
                            <div
                            className={styles.bodyCell}
                            style={{ width: '15%' }}
                            >
                                <PriceContainer 
                                price={produto.price}
                                promotionalPrice={produto.promotionalPrice}
                                startPromotion={produto.startPromotion}
                                endPromotion={produto.endPromotion}
                                />
                            </div><div
                            className={styles.bodyCell}
                            style={{ width: '5%', position: 'relative' }}
                            >
                                <PopUp 
                                hubId={produto.hubId}
                                reference={produto.reference}
                                />
                            </div>
                        </div>
                        <KitContainer
                        kits={produto.kits}
                        />
                    </div>
                )
            })}
        </div>
        // <tbody
        // className={styles.bodyList}
        // >
        //     {props.resultados.map(produto => {
        //         return (
        //             <div
        //             className={styles.productContainer}
        //             >
        //                 <tr
        //                 key={produto.hubId}
        //                 className={styles.rowItem}
        //                 style={{
        //                     height: "4rem"
        //                 }}
        //                 >
        //                     <td
        //                     className={styles.tdItem}
        //                     style={{width: "1rem"}}
        //                     >
        //                         {produto.reference}
        //                     </td>
        //                     <td
        //                     className={styles.tdItem}
        //                     style={{width: "3rem", padding: ".75rem 0rem"}}
        //                     >
        //                         <img 
        //                         src={`${produto.imageUrl}`}
        //                         alt="imagem" 
        //                         style={{
        //                             width: "3rem",
        //                             height: "3rem",
        //                             borderRadius: ".4rem",
        //                             whiteSpace: "nowrap"
        //                         }}
        //                         />
        //                     </td>
        //                     <td
        //                     className={styles.tdItem}
        //                     style={{textAlign: "start"}}
        //                     >
        //                         {produto.name}
        //                     </td>
        //                     <td
        //                     className={styles.tdItem}>
        //                         {produto.stockTray}
        //                     </td>
        //                     <td
        //                     className={styles.tdItem}>
        //                         <PriceContainer 
        //                         price={produto.price}
        //                         promotionalPrice={produto.promotionalPrice}
        //                         startPromotion={produto.startPromotion}
        //                         endPromotion={produto.endPromotion}
        //                         />
        //                     </td>
        //                     <td
        //                     className={styles.tdItem}
        //                     style={{
        //                         position: "relative"
        //                     }}
        //                     >
        //                         <PopUp 
        //                         hubId={produto.hubId}
        //                         reference={produto.reference}
        //                         />
        //                     </td>
        //                 </tr>
        //             </div>
        //         )                
        //     })}
        // </tbody>
    )
}