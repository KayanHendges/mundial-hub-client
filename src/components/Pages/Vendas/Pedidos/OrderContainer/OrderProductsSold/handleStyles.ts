import { useEffect, useState, CSSProperties } from 'react'

type Props = {
    open: boolean;
}

export default function handleStyles({ open }: Props){

    const [ containerStyles, setContainerStyles ] = useState<CSSProperties>({})
    
    const openContainerStyles: CSSProperties = ({
        flexGrow: 1,
    })

    const closeContainerStyles: CSSProperties = ({
        height: '0rem',
        padding: '0rem .5rem',
    })

    useEffect(() => {

        if(!open){
            setContainerStyles(closeContainerStyles)
            return
        }
        
        setContainerStyles(openContainerStyles)

    }, [open])

    return { containerStyles }
}