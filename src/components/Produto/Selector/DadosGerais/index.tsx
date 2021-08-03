import styles from './styles.module.scss'
import DefaultInput from '../../../Inputs/DefaultInput'
import DefaultTextArea from '../../../Inputs/DefaultTextArea'

export default function DadosGerais(props){
    return(
        <div className={styles.wrapper} style={{display:`${props.display.display}`}}>
            <DefaultInput
            width="100%"
            label="nome"
            name="name"
            placeholder="escreva o nome do produto..."
            required="required"
            value={props.values.name}
            onChange={props.onChange}
            />
            <div className={styles.inputContainer}>
                <DefaultInput
                width="100%"
                label="referencia"
                name="reference"
                placeholder=""
                required="required"
                value={props.values.reference}
                onChange={props.onChange}
                />
                <DefaultInput
                width="100%"
                label="ean"
                name="ean"
                placeholder="código de barras"
                required=""
                value={props.values.ean}
                onChange={props.onChange}
                onlyNumber={props.onlyNumber}
                />
                <DefaultInput
                width="100%"
                label="id da tray"
                name="idTray"
                placeholder="id gerado pela tray..."
                required=""
                value={props.values.idTray}
                onChange={props.onChange}
                onlyNumber={props.onlyNumber}
                />
            </div>
            <div className={styles.inputContainer}>
                <DefaultInput
                width="100%"
                label="marca"
                name="brand"
                placeholder=""
                required=""
                value={props.values.brand}
                onChange={props.onChange}
                />
                <DefaultInput
                width="100%"
                label="modelo"
                name="model"
                placeholder=""
                required=""
                value={props.values.model}
                onChange={props.onChange}
                />
            </div>
            <DefaultTextArea
            rows={3}
            type="textarea"
            width="100%"
            label="descrição"
            name="description"
            placeholder=""
            required=""
            value={props.values.description}
            onChange={props.onChange}
            />
        </div>
    )
}