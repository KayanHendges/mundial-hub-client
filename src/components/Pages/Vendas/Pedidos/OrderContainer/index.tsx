import { CSSProperties, useContext, useEffect, useState } from 'react';
import { OrdersContext } from '../../../../../contexts/OrdersContext';
import styles from './styles.module.scss';

type Props = {

}

export default function OrderContainer(props: Props){

    const { expandOrderId } = useContext( OrdersContext )
    const [ wrapperStyles, setWrapperStyles ] = useState<CSSProperties>({})

    useEffect(() => {

        if(!expandOrderId){
            setWrapperStyles({ 
                flexGrow: 0,
                border: '0px solid var(--gray-3)',
            })
            return
        }

        setWrapperStyles({ 
            flexGrow: 12,
            border: '1px solid var(--white-text)',
         })

    }, [ expandOrderId ])

    return (
        <div
        className={styles.wrapper}
        style={wrapperStyles}
        >
            {expandOrderId}
        </div>
    )
}