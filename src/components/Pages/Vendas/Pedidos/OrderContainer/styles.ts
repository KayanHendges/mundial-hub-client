import { CSSProperties, useContext, useEffect, useState } from "react"
import { OrdersContext } from "../../../../../contexts/OrdersContext"
import useWindowSize from "../../../../../services/windowSize/useWindowSize"

function handleStyles(){

    const { expandOrderId } = useContext(OrdersContext)
    const { width } = useWindowSize()
    const [ wrapperStyles, setWrapperStyles ] = useState<CSSProperties>({})
    
    useEffect(() => {

        if(expandOrderId == null){
            setWrapperStyles({
                width: '0px',
                border: '1px solid var(--gray-3)',
            })
            return
        }

        setWrapperStyles({
            width: `${width * 0.8}px`,
            border: '1px solid var(--white-text)',
        })

    }, [expandOrderId])

    return { wrapperStyles }
}

export default handleStyles