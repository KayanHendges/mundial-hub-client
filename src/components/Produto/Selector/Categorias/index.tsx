import styles from './styles.module.scss'


export default function Categorias(props){

    return(
        <div
        className={styles.wrapper}
        style={{display:`${props.display.display}`}}
        >
        </div>
    )
}