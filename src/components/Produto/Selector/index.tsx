import { useState } from 'react'
import styles from './styles.module.scss'

import DadosGerais from './DadosGerais'
import Categorias from './Categorias'
import PricingStock from './PricingStock'
import DadosComplementares from './DadosComplementares'
import Kits from './Kits'

export default function Selector(props){

    const [ options, setOptions ] = useState([true, false, false, false, false])
    const [ optionStyle, setOptionStyles ] = useState([
        {
            color: "var(--white-text)",
            underlineColor: "2px solid var(--white-text)",
            underlinePadding: "0.5rem",
        },
        {
            color: "var(--complementar-text)",
            underlineColor: "none",
            underlinePadding: "0.7rem",
        }
    ])

    function whatDisplay(option){
        if(options[option]){
            return "flex"
        } else {
            return "none"
        }
    }

    function handleDisplay(option){
        const optionList = []
        options.map((opt, index) => {
            if(index == option){
                optionList.push(true)
            } else {
                optionList.push(false)
            }
        })
        setOptions(optionList)
    }

    function whatStyle(option, key){
        if(options[option]){
            if(key == "color"){
                return optionStyle[0].color
            }
            if(key == "underlineColor"){
                return optionStyle[0].underlineColor
            }
            if(key == "underlinePadding"){
                return optionStyle[0].underlinePadding
            }
        } else {
            if(key == "color"){
                return optionStyle[1].color
            }
            if(key == "underlineColor"){
                return optionStyle[1].underlineColor
            }
            if(key == "underlinePadding"){
                return optionStyle[1].underlinePadding
            }
        }
    }
    
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <span 
                onClick={() => handleDisplay(0)}
                style={{
                    color: `${whatStyle(0, "color")}`,
                    borderBottom: `${whatStyle(0, "underlineColor")}`,
                    paddingBottom: `${whatStyle(0, "underlinePadding")}`
                }}
                >
                    dados gerais
                </span>
                <span
                onClick={() => handleDisplay(1)} 
                style={{
                    color: `${whatStyle(1, "color")}`,
                    borderBottom: `${whatStyle(1, "underlineColor")}`,
                    paddingBottom: `${whatStyle(1, "underlinePadding")}`
                }}
                >
                    categorias
                </span>
                <span 
                onClick={() => handleDisplay(2)} 
                style={{
                    color: `${whatStyle(2, "color")}`,
                    borderBottom: `${whatStyle(2, "underlineColor")}`,
                    paddingBottom: `${whatStyle(2, "underlinePadding")}`
                }}
                >
                    preço e estoque
                </span>
                <span
                onClick={() => handleDisplay(3)} 
                style={{
                    color: `${whatStyle(3, "color")}`,
                    borderBottom: `${whatStyle(3, "underlineColor")}`,
                    paddingBottom: `${whatStyle(3, "underlinePadding")}`
                }}
                >
                    dados complementares
                </span>
                <span
                onClick={() => handleDisplay(4)} 
                style={{
                    color: `${whatStyle(4, "color")}`,
                    borderBottom: `${whatStyle(4, "underlineColor")}`,
                    paddingBottom: `${whatStyle(4, "underlinePadding")}`
                }}
                >
                    kits
                </span>
            </div>
            <DadosGerais
            display={{display: `${whatDisplay(0)}`}}
            values={props.values}
            setValues={props.setValues}
            onChange={props.onChange}
            onlyNumber={props.onlyNumber}
            handleDescription={props.handleDescription}
            setValue={props.setValue}
            />
            <Categorias
            values={props.values}
            setValue={props.setValue}
            categories={props.categories}
            categoriesList={props.categoriesList}
            display={{display: `${whatDisplay(1)}`}}
            handleCategories={props.handleCategories}
            />
            {/* <PricingStock 
            display={{display: `${whatDisplay(2)}`}}
            values={props.values}
            setValues={props.setValues}
            setValue={props.setValue}
            onChange={props.onChange}
            onlyNumber={props.onlyNumber}
            /> */}
            <DadosComplementares
            display={{display: `${whatDisplay(3)}`}}
            values={props.values}
            setValue={props.setValue}
            onChange={props.onChange}
            onlyNumber={props.onlyNumber}
            />
            <Kits 
            display={{display: `${whatDisplay(4)}`}}
            values={props.values}
            kitValues={props.kitValues}
            setKitValues={props.setKitValues}
            setKit2Values={props.setKit2Values}
            setKit4Values={props.setKit4Values}
            requestKits={props.requestKits}
            createKit={props.createKit}
            setCreateKit={props.setCreateKit}
            onChange={props.onChange}
            fillKits={props.fillKits}
            />            
        </div>
    )
}