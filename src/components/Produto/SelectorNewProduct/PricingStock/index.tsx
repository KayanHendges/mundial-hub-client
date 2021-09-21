import styles from './styles.module.scss'

import DefaultNumberInput from '../../../Inputs/DefaultNumberInput'
import UnitInput from '../../../Inputs/UnitInput'
import DateInput from './DateInput'
import { useState } from 'react'
import AvailableInput from './AvailableInput'
import { format } from 'date-fns'

export default function PricingStock(props){
    const [ checkBox, setCheckBox ] = useState({
        available: "disponível",
        check: true,
        color: "#207567"
    })

    function handleCheckBox(){
        if(checkBox.check){ // desativa
            setCheckBox({
                available: "indisponível",
                check: false,
                color: "#E01D10"
            })
        } else { // ativa
            setCheckBox({
                available: "disponível",
                check: true,
                color: "#207567"
            })
        }
    }

    function handlePromotionDate(){
        if(props.values.promotionalPrice.length == 0){
            props.setValues({...props.values, startPromotion: "", endPromotion: ""})
        }
        if(props.values.promotionalPrice.length > 0 && props.values.startPromotion.length == 0){
            const date = format(new Date(), "yyyy-MM-dd")
            props.setValues({...props.values, startPromotion: date})
        }
    }

    function setZeroStock(){
        const stock = props.values.stock.toString()
        if(props.values.stock.length == 0){
            props.setValues({...props.values, stock: "0"})
        }
    }

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
                name="promotionalPrice"
                placeholder=""
                required=""
                value={props.values.promotionalPrice}
                onChange={props.onChange}
                onlyNumber={props.onlyNumber}
                leaveInput={handlePromotionDate}
                />
                <DateInput 
                width="100%"
                visibility={props.values.promotionalPrice}
                label="inicio da promoção"
                name="startPromotion"
                value={props.values.startPromotion}
                onChange={props.onChange}
                />
                <DateInput 
                width="100%"
                visibility={props.values.promotionalPrice}
                label="fim da promoção"
                name="endPromotion"
                value={props.values.endPromotion}
                onChange={props.onChange}
                />
            </div>
            <div className={styles.inputContainer}>
                <UnitInput
                width="10rem"
                label="estoque"
                name="stock"
                unit="un"
                value={props.values.stock}
                onChange={props.onChange}
                onlyNumber={props.onlyNumber}
                leaveInput={setZeroStock}
                />
            </div>
            <div
            className={styles.switch}
            onClick={handleCheckBox}
            >
                <div 
                className={styles.switchColor}
                style={{
                    color: `${checkBox.color}`,
                    border: `2px solid ${checkBox.color}`
                }}
                >
                </div>
                <p>
                    {checkBox.available}
                </p>
            </div>
            <AvailableInput 
            width="50%"
            label="disponibilidade"
            value={props.values}
            onChange={props.onChange}
            onlyNumber={props.onlyNumber}
            />        
        </div>
    )
}