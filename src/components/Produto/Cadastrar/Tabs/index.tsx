import { useContext, useEffect, useState } from 'react'
import { NewProductContext } from '../../../../contexts/NewProductContext'
import GeneralData from './GeneralData'
import styles from './styles.module.scss'

type TabStyle = {
    left: string;
}

export default function Tabs(){

    const { selectedTab } = useContext(NewProductContext)

    const selectedTabStyle: TabStyle = {
        left: '0%'
    }

    // const previousTabStyle: TabStyle = {
    //     left: '-100%'
    // }

    // const nextTabStyle: TabStyle = {
    //     left: '100%'
    // }

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
            <GeneralData 
            styles={tabStyles[0]}
            />
        </div>
    )
}