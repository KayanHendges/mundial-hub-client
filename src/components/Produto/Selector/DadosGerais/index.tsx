import styles from './styles.module.scss'

export default function DadosGerais(props){
    return(
        <div className={styles.wrapper} style={{display:`${props.display.display}`}}>
            Dados Gerais
        </div>
    )
}