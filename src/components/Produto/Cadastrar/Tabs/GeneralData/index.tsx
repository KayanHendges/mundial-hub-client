import { useContext } from 'react'
import { NewProductContext } from '../../../../../contexts/NewProductContext'
import DefaultInputLabel from '../../../../Inputs/DefaultInputLabel'
import styles from './styles.module.scss'

type Styles = {
    left: string
}

type Props = {
    styles: Styles;
}

export default function GeneralData(props: Props){

    const { 
        unitaryDetails, setUnitaryDetails,
        kit2Details , kit4Details
    } = useContext(NewProductContext)
    
    return (
        <div
        className={styles.wrapper}
        style={props.styles}
        >
            <DefaultInputLabel 
            label='nome'
            name='name'
            value={unitaryDetails.name}
            onChange={(e) => 
                setUnitaryDetails({...unitaryDetails, name: e.target.value})
            }
            />
        </div>
    )
}