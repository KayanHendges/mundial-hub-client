import { useState } from 'react'
import styles from './styles.module.scss'

import DadosGerais from './DadosGerais'
import Categorias from './Categorias'


export default function Selector(props){

    const [ option0, setOption0 ] = useState({
        color: "var(--white-text)",
        underlineColor: "2px solid var(--white-text)",
        underlinePadding: "0.5rem",
        display: "flex"
    })
    const [ option1, setOption1 ] = useState({
        color: "var(--complementar-text)",
        underlineColor: "none",
        underlinePadding: "0.7rem",
        display: "none"
    })
    const [ option2, setOption2 ] = useState({
        color: "var(--complementar-text)",
        underlineColor: "none",
        underlinePadding: "0.7rem",
        display: "flex"
    })
    const [ option3, setOption3 ] = useState({
        color: "var(--complementar-text)",
        underlineColor: "none",
        underlinePadding: "0.7rem",
        display: "none"
    })

    function seletor(option){
        if(option == 0) {
            setOption0({
                color: "var(--white-text)",
                underlineColor: "2px solid var(--white-text)",
                underlinePadding: "0.5rem",
                display: "flex"
            })
            setOption1({
                color: "var(--complementar-text)",
                underlineColor: "none",
                underlinePadding: "0.7rem",
                display: "none"
            })
            setOption2({
                color: "var(--complementar-text)",
                underlineColor: "none",
                underlinePadding: "0.7rem",
                display: "none"
            })
            setOption3({
                color: "var(--complementar-text)",
                underlineColor: "none",
                underlinePadding: "0.7rem",
                display: "none"
            })
        }
        if(option == 1) {
            setOption0({
                color: "var(--complementar-text)",
                underlineColor: "none",
                underlinePadding: "0.7rem",
                display: "none"
            })
            setOption1({
                color: "var(--white-text)",
                underlineColor: "2px solid var(--white-text)",
                underlinePadding: "0.5rem",
                display: "flex"
            })
            setOption2({
                color: "var(--complementar-text)",
                underlineColor: "none",
                underlinePadding: "0.7rem",
                display: "none"
            })
            setOption3({
                color: "var(--complementar-text)",
                underlineColor: "none",
                underlinePadding: "0.7rem",
                display: "none"
            })
        }
        if(option == 2) {
            setOption0({
                color: "var(--complementar-text)",
                underlineColor: "none",
                underlinePadding: "0.7rem",
                display: "none"
            })
            setOption1({
                color: "var(--complementar-text)",
                underlineColor: "none",
                underlinePadding: "0.7rem",
                display: "none"
            })
            setOption2({
                color: "var(--white-text)",
                underlineColor: "2px solid var(--white-text)",
                underlinePadding: "0.5rem",
                display: "flex"
            })
            setOption3({
                color: "var(--complementar-text)",
                underlineColor: "none",
                underlinePadding: "0.7rem",
                display: "none"
            })
        }
        if(option == 3) {
            setOption0({
                color: "var(--complementar-text)",
                underlineColor: "none",
                underlinePadding: "0.7rem",
                display: "none"
            })
            setOption1({
                color: "var(--complementar-text)",
                underlineColor: "none",
                underlinePadding: "0.7rem",
                display: "none"
            })
            setOption2({
                color: "var(--complementar-text)",
                underlineColor: "none",
                underlinePadding: "0.7rem",
                display: "none"
            })
            setOption3({
                color: "var(--white-text)",
                underlineColor: "2px solid var(--white-text)",
                underlinePadding: "0.5rem",
                display: "flex"
            })
        }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <span 
                onClick={() => seletor(0)}
                style={{
                    color: `${option0.color}`,
                    borderBottom: `${option0.underlineColor}`,
                    paddingBottom: `${option0.underlinePadding}`
                }}
                >
                    dados gerais
                </span>
                <span
                onClick={() => seletor(1)} 
                style={{
                    color: `${option1.color}`,
                    borderBottom: `${option1.underlineColor}`,
                    paddingBottom: `${option1.underlinePadding}`
                }}
                >
                    dategorias
                </span>
                <span 
                onClick={() => seletor(2)} 
                style={{
                    color: `${option2.color}`,
                    borderBottom: `${option2.underlineColor}`,
                    paddingBottom: `${option2.underlinePadding}`
                }}
                >
                    dados gerais
                </span>
                <span
                onClick={() => seletor(3)} 
                style={{
                    color: `${option3.color}`,
                    borderBottom: `${option3.underlineColor}`,
                    paddingBottom: `${option3.underlinePadding}`
                }}
                >
                    dategorias
                </span>
            </div>
            <DadosGerais
            display={{display: `${option0.display}`}}
            values={props.values}
            onChange={props.onChange}
            />
            <Categorias display={{display: `${option1.display}`}}/>
        </div>
    )
}