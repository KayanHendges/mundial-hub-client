import styles from './styles.module.scss'

import DefaultNumberInput from '../../../Inputs/DefaultNumberInput'
import UnitInput from '../../../Inputs/UnitInput'
import DateInput from './DateInput'

export default function PricingStock(props){
    return(
        <div
        className={styles.wrapper}
        style={{display:`${props.display.display}`}}
        >
            <div className={styles.inputContainer}>
                <DefaultNumberInput
                width="100%"
                label="custo"
                name="cost"
                placeholder=""
                required=""
                value={props.values.cost}
                onChange={props.onChange}
                onlyNumber={props.onlyNumber}
                />
                <UnitInput
                width="100%"
                label="lucro"
                name="profit"
                unit="%"
                placeholder=""
                value={props.values.profit}
                onChange={props.onChange}
                onlyNumber={props.onlyNumber}
                />
                <DefaultNumberInput
                width="100%"
                label="preço de venda"
                name="price"
                placeholder=""
                required="required"
                value={props.values.price}
                onChange={props.onChange}
                onlyNumber={props.onlyNumber}
                />
            </div>
            <div className={styles.inputContainer}>
                <DefaultNumberInput
                width="100%"
                label="preço promocional"
                name="promotional_price"
                placeholder=""
                required=""
                value={props.values.promotional_price}
                onChange={props.onChange}
                onlyNumber={props.onlyNumber}
                />
                <DateInput 
                width="100%"
                visibility={props.values.promotional_price}
                label="inicio da promoção"
                name="start_promotion"
                value={props.values.start_promotion}
                onChange={props.onChange}
                />
                <DateInput 
                width="100%"
                visibility={props.values.promotional_price}
                label="fim da promoção"
                name="end_promotion"
                value={props.values.end_promotion}
                onChange={props.onChange}
                />
            </div>
        </div>
    )
}