import { format, parseISO } from 'date-fns'
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
                  search: props.search.searchInput,
                  page: props.pages.page,
                  perPage: props.pages.perPage
              }
          })
          .then((response) => {
            console.log(response.data)

            props.setPages({
                perPage: response.data.limite_pagina,
                pages: response.data.numero_paginas,
                page: response.data.pagina,
                resultsLength: response.data.numero_produtos
            })
            const resultados = response.data.produtos.map(produto => {
                function isPromotion(){
                    if(produto.promotional_price > 0 ){
                          return {
                              startPromotion: format(parseISO(produto.start_promotion), "dd/MM/yyyy"),
                              endPromotion: format(parseISO(produto.end_promotion), "dd/MM/yyyy")
                          }
                    } else {
                        return {
                          startPromotion: '',
                          endPromotion: ''
                        }
                    }
                }
                const promotion = isPromotion()
                

                return {
                  hubId: produto.hub_id,
                  trayId: produto.tray_id,
                  reference: produto.reference,
                  name: produto.product_name,
                  imageUrl: produto.picture_source_1_90,
                  stockTray: produto.stock_tray,
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
      }, [props.search.onChangeSearch, props.search.page, props.search.perPage]);

      useEffect(() => {
          
      })

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