import { CSSProperties, useContext, useEffect, useState } from "react"
import useWindowSize from "../../../../../../services/windowSize/useWindowSize"

export function useWrapperStyles(openImportOrders: boolean){ 

    const { width, height } = useWindowSize()
    const [ windowWidth, setWindowWidth ] = useState<number>(width)

    const closedWrapperStyles: CSSProperties = {
        opacity: '0%',
        // padding: '0rem',
        ...setOrientation()
    }
    
    const [ wrapperStyles, setWrapperStyles ] = useState<CSSProperties>(closedWrapperStyles)

    const [ headerStyles, setHeaderStyles ] = useState<CSSProperties>({})

    useEffect(() => {
    
        if(openImportOrders){
            setWrapperStyles(setDimenstions())
        }
        
        if(!openImportOrders){
            setWrapperStyles({...closedWrapperStyles, transition: closeTransition(windowWidth)})
        }

    }, [openImportOrders])

    useEffect(() => {

        if(width){
            setWindowWidth(width)
        }

    }, [width])

    function setDimenstions(): CSSProperties{

        const maxWidth = 700
        const transition = '.4s'

        if(width > 900){

            const css = {
                height: '100%',
                transition: `width ${transition}`,
            }
            
            const wrapperWidth = width * 0.8

            if(wrapperWidth > maxWidth){
                return {...css, width: `calc(${maxWidth}px - 3rem)`}
            }

            return {...css, width: `calc(${wrapperWidth}px - 3rem)`}
        
        }

        if(width <= 900){

            const css = {
                width: '100%',
                transition: `height ${transition}`,
            }

            const wrapperHeight = height * .9

            return {...css, height: `calc(${wrapperHeight}px - 4rem)`}

        }

        
    }

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

    function closeTransition(windowWidth: number): string{

        if(windowWidth > 900){
            return 'width .2s, opacity .2s'
        }

        if(windowWidth <= 900){
            return ''
        }

    }
    
    return { wrapperStyles, headerStyles }
}