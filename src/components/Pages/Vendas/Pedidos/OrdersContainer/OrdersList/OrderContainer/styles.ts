import { wrap } from "module"
import { CSSProperties, useContext, useEffect, useState } from "react"
import { OrdersContext } from "../../../../../../../contexts/OrdersContext"
import sleep from "../../../../../../../services/sleep"
import useWindowSize from "../../../../../../../services/windowSize/useWindowSize"

type Props = {
    resumeOrder: boolean,
    setResumeOrder(resumeOrder: boolean): void;
}

function handleStyles({ resumeOrder, setResumeOrder }: Props){

    const { expandOrderId } = useContext(OrdersContext)
    const { width } = useWindowSize()
    const [ wrapperStyles, setWrapperStyles ] = useState<CSSProperties>({})
    const [ infoStyles, setInfoStyles ] = useState<CSSProperties>({})
    
    const openWrapper: CSSProperties = {
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
    }

    const closeWrapper: CSSProperties = {
        display: 'flex',
    }

    useEffect(() => {

        if(expandOrderId == null){
            open()
            return
        }

        if(resumeOrder){
            return
        }

        close()
    }, [expandOrderId])

    async function open(){

        setInfoStyles({
            opacity: 0,
        })

        await sleep(500)
        
        setResumeOrder(false)
        setWrapperStyles(openWrapper)   
        
        setInfoStyles({
            opacity: 1,
        })  

    }

    async function close(){
        setInfoStyles({
            opacity: 0,
        })

        setWrapperStyles(closeWrapper)   
        setResumeOrder(true)

        await sleep(300)

        setInfoStyles({
            opacity: 1,
        })  
        
    }

    return { wrapperStyles, infoStyles }
}

export default handleStyles