import { format, parseISO } from 'date-fns'
import router from 'next/router'
import { useEffect, useState } from 'react'
import { api } from '../../../../services/api'
import List from './List'
import styles from './styles.module.scss'

export default function ResultList(props){

    const [ loading, setLoading ] = useState<boolean>(false)
    const [ produtos, setProdutos ] = useState([])
    const [ placeholderList, setPlaceholderList ] = useState<number[]>([])

    useEffect(() => {
        setProdutos([])
        setLoading(true)
        router.push(`/produtos${props.search.searchInput.length > 0 ? '?search=' : ''}${props.search.searchInput}`)
        api
          .get("/products/list", {
              params: {
                  search: props.search.searchInput,
                  page: props.pages.page,
                  perPage: props.pages.perPage,
                  showKits: props.search.showKits,
                  store: props.search.store,
                  orderBy: props.search.orderBy,
                  order: props.search.order,
              }
          })
          .then((response) => {
            setLoading(false)
            props.setPages({
                perPage: response.data.limite_pagina,
                pages: response.data.numero_paginas,
                page: response.data.pagina,
                resultsLength: response.data.numero_produtos
            })
            const resultados = response.data.produtos.map(produto => {
                function isPromotion(){
                    if(produto.tray_promotional_price > 0 ){
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
                  trayId: produto.tray_product_id,
                  reference: produto.reference,
                  name: produto.product_name,
                  imageUrl: produto.picture_source_1,
                  thumbnail: produto.picture_source_1_90,
                  stockTray: produto.tray_stock,
                  price: produto.tray_price.toFixed(2).replace(".", ","),
                  promotionalPrice: produto.tray_promotional_price.toFixed(2).replace(".", ","),
                  startPromotion: promotion.startPromotion,
                  endPromotion: promotion.endPromotion,
                  kits: props.search.showKits == 1 ? produto.kits : []
              }
            })
            setProdutos(resultados)
            
          })
          .catch((err) => {
            setLoading(false)
            console.log(err.response.data)
            setProdutos([])
          });
    }, [props.search.onChangeSearch, props.search.page, props.search.perPage]);

    useEffect(() => {
        for (let index = 0; index < 20; index++) {
            placeholderList.push(index)
        }
    }, [])

    return(
        <div
        className={styles.wrapper}
        >
            <div
            className={styles.header}
            >
                <div
                className={styles.headerCell}
                >
                    código
                </div>
                <div
                className={styles.headerCell}
                >
                    {/* imagem */}
                </div>
                <div
                className={styles.headerCell}
                style={{justifyContent: 'flex-start', paddingLeft: '1rem' }}
                >
                    descrição
                </div>
                <div
                className={styles.headerCell}
                >
                    estoque
                </div>
                <div
                className={styles.headerCell}
                >
                    preço
                </div>
                <div
                className={styles.headerCell}
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
                setSearch={props.setSearch}
                onChangeSearch={props.search.onChangeSearch}
                />
                {placeholderList.map((placeholder, index) => {
                    return (
                        <div
                        key={index}
                        className={styles.placeholder}
                        style={{ display: `${loading ? 'flex' : 'none' }` }}
                        >
                        </div>
                    )
                })}
            </div>
        </div>
    )
}