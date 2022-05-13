import { MouseEvent, useContext, useEffect, useState } from 'react'
import { OrdersContext } from '../../../../../contexts/OrdersContext'
import useWindowSize from '../../../../../services/windowSize/useWindowSize'
import { useWrapperStyles } from './componentStyles'
import ImportOrdersWrapper from './ImportOrdersWrapper'
import styles from './styles.module.scss'

export default function ImportOrders(){

    const { openImportOrders, setOpenImportOrders, hasOpenImportOrders } = useContext(OrdersContext)
    const [ openStyles, setOpenStyles ] = useState<boolean>(false)
    const { wrapperStyles } = useWrapperStyles(openStyles)
    const { width, height } = useWindowSize()

    function clickOutside(e: MouseEvent): boolean{
        const wrapper = window.document.querySelector('#wrapper')

        if(!wrapper){
            return false
        }

        const outsideX = width - wrapper.clientWidth
        const outsideY = height - wrapper.clientHeight

        if(e.clientX <= outsideX || e.clientY <= outsideY){
            return true
        }    

        return false
    }


    useEffect(() => {

        if(openImportOrders){
            setOpenStyles(true)
        }

    }, [openImportOrders])

    useEffect(() => {

        if(!openStyles && openImportOrders){
            setTimeout(() => {
                setOpenImportOrders(false)
            }, 200)
        }

    }, [openStyles])

    if(openImportOrders || hasOpenImportOrders){

        return (
            <div
            className={styles.wrapper}
            style={wrapperStyles}
            onClick={e => {
                if(clickOutside(e)){
                    setOpenStyles(false)
                }
            }}
            >
                <ImportOrdersWrapper 
                openStyles={openStyles}
                setOpenStyles={setOpenStyles}
                />
            </div>
        )
    } else {
        return <></>
    }
}