import styles from './styles.module.scss'
import { useEffect, useState } from 'react'
import { api } from '../../../../../services/api'
import ProductContainer from './ProductContainer'

export default function List(props){

    const [ selectedIndex, setSelectedIndex ] = useState<number>(-1)

    return (
        <div
        className={styles.wrapper}
        >
            {props.resultados.map((produto, index) => {
                return (
                    <ProductContainer
                    key={index}
                    search={props.search}
                    setSearch={props.setSearch}
                    onChangeSearch={props.onChangeSearch}
                    produto={produto}
                    indexState={{ index, selectedIndex, setSelectedIndex }}
                    />
                )
            })}
        </div>
    )
}