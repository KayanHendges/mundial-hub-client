import styles from './styles.module.scss'
import DefaultInput from '../../../Inputs/DefaultInput'

export default function DadosGerais(props){
    return(
        <div className={styles.wrapper} style={{display:`${props.display.display}`}}>
            <DefaultInput
            width="100%"
            label="Nome"
            name="name"
            placeholder="Escreva o nome do produto..."
            required="required"
            value={props.values.name}
            onChange={props.onChange}
            />
        </div>
    )
}