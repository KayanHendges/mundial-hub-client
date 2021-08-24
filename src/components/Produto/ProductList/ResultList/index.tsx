import { useEffect, useState } from 'react'
import { api } from '../../../../services/api'
import PopUp from './PopUp'
import PriceContainer from './PriceContainer'
import styles from './styles.module.scss'

export default function ResultList(props){

    const [ produtos, setProdutos ] = useState(<div>sem resultados</div>)

    useEffect(() => {
        api
          .get("produtos")
          .then((response) => {
            const resultados = response.data.map(produto => {
                return {
                    hubId: produto.hub_id,
                    reference: produto.reference,
                    name: produto.product_name,
                    imageUrl: produto.picture_source_1,
                    stock: produto.stock,
                    price: produto.price.toFixed(2).replace(".", ","),
                    promotionalPrice: produto.promotional_price.toFixed(2).replace(".", ","),
                    startPromotion: produto.start_promotion,
                    endPromotion: produto.end_promotion,
                }
            })
            
            const resultado = 

            <div
            className={styles.wrapper}
            >
                <table
                className={styles.productTable}
                cellSpacing={0}
                >
                    <thead
                    className={styles.headerList}
                    >
                        <tr>
                            <th>referencia</th>
                            <th style={{width: "4rem", padding: ".75rem 0rem"}}></th>
                            <th
                            style={{textAlign: "start"}}
                            >
                                nome
                            </th>
                            <th>estoque</th>
                            <th>preço</th>
                            <th></th>
                        </tr>    
                    </thead>
                    <tbody
                    className={styles.bodyList}
                    >
                        {props.resultados.map((item, index) => {
                            return(
                                <tr
                                key={index}
                                className={styles.rowItem}
                                >
                                    <td
                                    style={{width: "1rem"}}
                                    >
                                        {item.reference}
                                    </td>
                                    <td
                                    style={{width: "3rem", padding: ".75rem 0rem"}}
                                    >
                                        <img 
                                        src={`${item.imageUrl}`}
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
                                    style={{textAlign: "start"}}
                                    >
                                        {item.name}
                                    </td>
                                    <td>
                                        {item.stock}
                                    </td>
                                    <td>
                                        <PriceContainer 
                                        price={item.price}
                                        promotionalPrice={item.promotionalPrice}
                                        startPromotion={item.startPromotion}
                                        endPromotion={item.endPromotion}
                                        />
                                    </td>
                                    <td
                                    style={{
                                        position: "relative"
                                    }}
                                    >
                                        <PopUp 
                                        
                                        />
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            setProdutos(resultado)
          })
          .catch((err) => {
            setProdutos(<div>não foi possível se comunictar com o banco de dados</div>);
          });
      }, []);

    return produtos
}