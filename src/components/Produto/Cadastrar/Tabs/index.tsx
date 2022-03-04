import { useContext, useEffect, useState } from 'react'
import { NewProductContext } from '../../../../contexts/NewProductContext'
import AdditionalData from './AdditionalData'
import Categories from './Categories'
import GeneralData from './GeneralData'
import Kits from './Kits'
import Pricing from './Pricing'
import styles from './styles.module.scss'

type TabStyle = {
    left: string;
}

export default function Tabs(){

    const { selectedTab } = useContext(NewProductContext)

    const selectedTabStyle: TabStyle = {
        left: '0%'
    }
    const [ tabStyles, setTabStyles ] = useState<TabStyle[]>([])

    useEffect(() => {
        const initalStylesList: TabStyle[] = []

        for (let index = 0; index < 5; index++) {
            if(index == selectedTab){
                initalStylesList.push(selectedTabStyle)
            }
            if(index > selectedTab){
                initalStylesList.push(tabPositionCalc(index-selectedTab, 'next'))
            }
            if(index < selectedTab){
                initalStylesList.push(tabPositionCalc(selectedTab-index, 'previous'))

            }
        }

        setTabStyles(initalStylesList)
    }, [selectedTab])

    function tabPositionCalc(position: number, direction: string): TabStyle{
        if(direction == 'previous'){
            return {
                left: `-${position*100}%`
            }
        } else {
            return {
                left: `${position*100}%`
            }
        }
    }

    return (
        <div
        className={styles.wrapper}
        >
            <div
            className={styles.carousel}
            >
                <GeneralData 
                styles={tabStyles[0]}
                />
                <Categories
                styles={tabStyles[1]}
                />
                <Pricing
                styles={tabStyles[2]}
                />
                <AdditionalData
                styles={tabStyles[3]}
                />
                <Kits
                styles={tabStyles[4]}
                />
            </div>
            <div
            className={styles.curtain}
            />
        </div>
    )
}