import { format, parseISO } from 'date-fns'
import { useEffect, useState } from 'react'
import { api } from '../../../../services/api'
import List from './List'
import styles from './styles.module.scss'

export default function ResultList(props){

    const [ resultado, setResultado ] = useState(<div>sem resultados</div>)
    const [ produtos, setProdutos ] = useState([])

    useEffect(() => {
        console.log('pesquisou')
        setProdutos([])
        setResultado(<div>carregando...</div>)
        api
          .get("produtos", {
              params: {
                  search: props.search.searchInput,
                  page: props.pages.page,
                  perPage: props.pages.perPage,
                  showKits: props.search.showKits
              }
          })
          .then((response) => {
            console.log('encontrou')
            props.setPages({
                perPage: response.data.limite_pagina,
                pages: response.data.numero_paginas,
                page: response.data.pagina,
                resultsLength: response.data.numero_produtos
            })
            console.log('depois')
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
                  kits: produto.kits
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
            <div
            className={styles.header}
            >
                <div
                className={styles.headerCell}
                style={{ width: '10%' }}
                >
                    referencia
                </div>
                <div
                className={styles.headerCell}
                style={{ width: '7%' }}
                >
                    {/* imagem */}
                </div>
                <div
                className={styles.headerCell}
                style={{ width: '63%', justifyContent: 'flex-start', paddingLeft: '1rem' }}
                >
                    descrição
                </div>
                <div
                className={styles.headerCell}
                style={{ width: '10%' }}
                >
                    estoque
                </div>
                <div
                className={styles.headerCell}
                style={{ width: '15%' }}
                >
                    preço
                </div>
                <div
                className={styles.headerCell}
                style={{ width: '5%' }}
                >
                    {/* buttons */}
                </div>
            </div>
            <div
            className={styles.resultContainer}
            >
                <List
                resultados={produtos}
                search={props.search}
                onChangeSearch={props.search.onChangeSearch}
                >
                </List>
            </div>
        </div>
    )
}