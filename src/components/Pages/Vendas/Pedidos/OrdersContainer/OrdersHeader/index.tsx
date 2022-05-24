import { useContext } from 'react'
import { OrdersContext } from '../../../../../../contexts/OrdersContext'
import useWindowSize from '../../../../../../services/windowSize/useWindowSize'
import BackButton from '../../../../../Buttons/BackButton/Index'
import BlueButtonAction from '../../../../../Buttons/BlueButtonAction'
import styles from './styles.module.scss'

export default function OrdersHeader(){

    const { setOpenImportOrders, hasOpenImportOrders, setHasOpenImportOrders } = useContext(OrdersContext)
    const { width } = useWindowSize()
    const { expandOrderId } = useContext(OrdersContext)
    
    if(expandOrderId){
        return (
            <div
            className={styles.wrapper}
            >
                <BackButton />
                <h1
                className={styles.header}
                >
                    Pedidos
                </h1>
            </div>
        )
    }
    
    if(width > 900){
        return (
            <div
            className={styles.wrapper}
            >
                <BackButton />
                <h1
                className={styles.header}
                >
                    Pedidos
                </h1>
                <BlueButtonAction
                text='importar pedidos'
                action={() => setOpenImportOrders(true)}
                />
            </div>
        )  
    } else {
        return (
            <div
            className={styles.wrapper}
            >
                <div
                className={styles.row}
                >
                    <BackButton />
                    <BlueButtonAction
                    text='importar pedidos'
                    action={() => {
                        setOpenImportOrders(true)
                    }}
                    />
                </div>
                <h1
                className={styles.header}
                >
                    Pedidos
                </h1>
            </div>
        )
    }

}