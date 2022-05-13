import { CSSProperties, useContext, useEffect, useState } from "react"
import useWindowSize from "../../../../../services/windowSize/useWindowSize"

export function useWrapperStyles(openImportOrders: boolean){    
    
    const { width } = useWindowSize()

    const [ wrapperStyles, setWrapperStyles ] = useState<CSSProperties>({})
    
    const closedWrapperStyles: CSSProperties = {
        ...setOrientation(),
        backgroundColor: 'rgba(0, 0, 0, 0.005)',
    }

    const openWrapperStyles: CSSProperties = {
        backgroundColor: 'rgba(0, 0, 0, 0.500)',

    }
    
    useEffect(() => {

        setWrapperStyles(closedWrapperStyles)

    }, [])

    useEffect(() => {
    
        if(openImportOrders){
            setWrapperStyles(openWrapperStyles)
        } else {
            setWrapperStyles(closedWrapperStyles)
        }

    }, [openImportOrders])

    function setOrientation(): CSSProperties{
        if(width > 900) {
            return {
                height: '100%',
                width: '0%'
            }
        }

        return {
            height: '0%',
            width: '100%'
        }
    }

    return { wrapperStyles }
}