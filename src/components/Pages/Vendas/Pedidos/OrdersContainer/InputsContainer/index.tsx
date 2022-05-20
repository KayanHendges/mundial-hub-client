import DefaultTextInput from '../../../../../Inputs/DefaultTextInput';
import styles from './styles.module.scss';

type Props = {

}

export default function InputsContainer(props: Props){
    
    return (
        <div
        className={styles.wrapper}
        >
            <DefaultTextInput
            value=''
            placeholder='pesquise pelo número do pedido, nome, cpf ou email...'
            readOnly={true}
            />
        </div>
    )
}