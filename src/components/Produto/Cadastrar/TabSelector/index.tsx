import { useContext, useEffect, useState } from 'react'
import { NewProductContext } from '../../../../contexts/NewProductContext'
import styles from './styles.module.scss'

type OptionStyle = {
    color: string
}

export default function TabSelector(props){

    const { selectedTab, setSelectedTab } = useContext(NewProductContext)

    const standartOptionStyle: OptionStyle = {
        color: 'var(--complementar-text)'
    }

    const hoverOptionStyle: OptionStyle = {
        color: 'var(--white-text)'
    }

    const selectedOptionStyle: OptionStyle = {
        color: 'var(--white-text)'
    }

    const startOptionStyles: OptionStyle[] = []

    const [ optionStyle, setOptionStyle ] = useState<OptionStyle[]>(startOptionStyles)

    const [ underlineStyle, setUnderlineStyle ] = useState({
        left: `${selectedTab * 20}%`
    }) 

    useEffect(() => {
        for (let index = 0; index < 5; index++) {
            if (index == selectedTab) {
                startOptionStyles.push(selectedOptionStyle)
            } else {
                startOptionStyles.push(standartOptionStyle)
            }
        }
        setOptionStyle(startOptionStyles)
        setUnderlineStyle({
            left: `${selectedTab * 20}%`
        })
    }, [])

    useEffect(() => {
        setUnderlineStyle({
            left: `${selectedTab * 20}%`,
        })

        const list: OptionStyle[] = []

        optionStyle.map((option, index) => {
            if(index == selectedTab){
                list.push(selectedOptionStyle)
            } else {
                list.push(standartOptionStyle)
            }
        })

        setOptionStyle(list)

    }, [selectedTab])
    

    function handleTabStyles(hover: boolean, index: number){
        if(index != selectedTab) {
            const list: OptionStyle[] = []

            optionStyle.map((style, i) => {
                if(i == selectedTab){
                    list.push(selectedOptionStyle)
                } else {
                    if(i == index && hover){
                        list.push(hoverOptionStyle)
                    } else {
                        list.push(standartOptionStyle)
                    }
                }
            })

            setOptionStyle(list)
        }
        return
    }

    return (
        <div
        className={styles.wrapper}
        >
            <div
            className={styles.options}
            >
                <div
                className={styles.underline}
                style={underlineStyle}
                >
                    <div
                    className={styles.bar}
                    >
                    </div>
                </div>
                <div
                className={styles.option}
                >
                    <span
                    className={styles.title}
                    style={optionStyle[0]}
                    onClick={() => setSelectedTab(0)}
                    onMouseEnter={() => handleTabStyles(true, 0)}
                    onMouseLeave={() => handleTabStyles(false, 0)}
                    >
                        dados gerais
                    </span>
                </div>
                <div
                className={styles.option}
                >
                    <span
                    className={styles.title}
                    style={optionStyle[1]}
                    onClick={() => setSelectedTab(1)}
                    onMouseEnter={() => handleTabStyles(true, 1)}
                    onMouseLeave={() => handleTabStyles(false, 1)}
                    >
                        categorias
                    </span>
                </div>
                <div
                className={styles.option}
                >
                    <span
                    className={styles.title}
                    style={optionStyle[2]}
                    onClick={() => setSelectedTab(2)}
                    onMouseEnter={() => handleTabStyles(true, 2)}
                    onMouseLeave={() => handleTabStyles(false, 2)}
                    >
                        pre??o e estoque
                    </span>
                </div>
                <div
                className={styles.option}
                >
                    <span
                    className={styles.title}
                    style={optionStyle[3]}
                    onClick={() => setSelectedTab(3)}
                    onMouseEnter={() => handleTabStyles(true, 3)}
                    onMouseLeave={() => handleTabStyles(false, 3)}
                    >
                        dados complementares
                    </span>
                </div>
                <div
                className={styles.option}
                >
                    <span
                    className={styles.title}
                    style={optionStyle[4]}
                    onClick={() => setSelectedTab(4)}
                    onMouseEnter={() => handleTabStyles(true, 4)}
                    onMouseLeave={() => handleTabStyles(false, 4)}
                    >
                        kits
                    </span>
                </div>
            </div>
        </div>
    )
}