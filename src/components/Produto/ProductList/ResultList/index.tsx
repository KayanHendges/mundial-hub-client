import { useEffect, useState } from 'react'
import { api } from '../../../../services/api'
import List from './List'
import styles from './styles.module.scss'

export default function ResultList(props){

    const [ resultado, setResultado ] = useState(<div>sem resultados</div>)
    const [ produtos, setProdutos ] = useState([])

    useEffect(() => {
        setResultado(<div>carregando...</div>)
        api
          .get("produtos", {
              params: {
                  search: props.search.searchInput
              }
          })
          .then((response) => {
            const resultados = response.data.produtos.map(produto => {
                function isPromotion(){
                    if(produto.promotional_price > 0 ){
                          return {
                              startPromotion: '03/09/2021',
                              endPromotion: '31/09/2021'
                          }
                    } else {
                        return {
                          startPromotion: '03/09/2021',
                          endPromotion: '31/09/2021'
                        }
                    }
                }
                const promotion = isPromotion()
        
                return {
                  hubId: produto.hub_id,
                  reference: produto.reference,
                  name: produto.product_name,
                  imageUrl: produto.picture_source_1,
                  stock: produto.stock,
                  price: produto.price.toFixed(2).replace(".", ","),
                  promotionalPrice: produto.promotional_price.toFixed(2).replace(".", ","),
                  startPromotion: promotion.startPromotion,
                  endPromotion: promotion.endPromotion,
              }
            })
            setProdutos(resultados)
            setResultado(<></>)
            
          })
          .catch((err) => {
            console.log(err)
            setResultado(<div>não foi possível se comunictar com o banco de dados</div>);
          });
      }, [props.search.onChangeSearch]);

    return(
        <div
        className={styles.wrapper}
        >   
            {resultado}
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
                <List
                resultados={produtos}
                >
                </List>
            </table>
        </div>
    )
}