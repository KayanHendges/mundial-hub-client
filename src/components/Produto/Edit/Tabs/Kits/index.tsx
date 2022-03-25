import { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../../../../contexts/ProductContext'
import KitContainer from './KitContainer'
import styles from './styles.module.scss'

type Styles = {
    left: string
}

type Props = {
    styles: Styles;
}

export default function Kits(props: Props){

    const { 
        kit2Details, setKit2Details,
        kit2Rules, setKit2Rules,
        kit4Details, setKit4Details,
        kit4Rules, setKit4Rules
    } = useContext(ProductContext)

    const [ selectedContainer, setSelectedContainer ] = useState<number>(-1)

    return (
        <div
        className={styles.wrapper}
        style={props.styles}
        >
            <KitContainer 
            key={0}
            header='Kit 2'
            kitDetails={kit2Details}
            setKitDetails={setKit2Details}
            kitRules={kit2Rules}
            setKitRules={setKit2Rules}
            index={0}
            selectedContainer={selectedContainer}
            setSelectedContainer={setSelectedContainer}
            />
            <KitContainer 
            key={1}
            header='Kit 4'
            kitDetails={kit4Details}
            setKitDetails={setKit4Details}
            kitRules={kit4Rules}
            setKitRules={setKit4Rules}
            index={1}
            selectedContainer={selectedContainer}
            setSelectedContainer={setSelectedContainer}
            />
        </div>
    )
}