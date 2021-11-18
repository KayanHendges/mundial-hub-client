import { format } from 'date-fns'
import { useState } from 'react'
import DefaultPriceInput from '../../../../Inputs/DefaultPriceInput'
import UnitInput from '../../../../Inputs/UnitInput'
import PriceInput from '../../Kits/KitWrapper/PriceInput'
import SelectorInput from '../../Kits/KitWrapper/SelectorInput'
import DateInput from '../DateInput'
import styles from './styles.module.scss'

export default function StoreContainerMundial (props) {

    function handlePromotionDate(){
        if(props.storeName == 'Mundial'){
            
            if(props.pricingValues.promotionalPrice.length == 0){
                props.setValues({...props.values, pricing: {
                    ...props.values.pricing, mundial: {
                        ...props.values.pricing.mundial, 
                        startPromotion: '',
                        endPromotion: ''
                    }
                }})
            }
            if(props.pricingValues.promotionalPrice.length > 0 && props.pricingValues.startPromotion.length == 0){
                const date = format(new Date(), "yyyy-MM-dd")
                props.setValues({...props.values, pricing: {
                    ...props.values.pricing, mundial: {
                        ...props.values.pricing.mundial, 
                        startPromotion: date,
                    }
                }})
            }

        }

        if (props.storeName == 'SC Pneus') {

            if(props.pricingValues.promotionalPrice.length == 0){
                props.setValues({...props.values, pricing: {
                    ...props.values.pricing, scpneus: {
                        ...props.values.pricing.scpneus, 
                        startPromotion: '',
                        endPromotion: ''
                    }
                }})
            }
            if(props.pricingValues.promotionalPrice.length > 0 && props.pricingValues.startPromotion.length == 0){
                const date = format(new Date(), "yyyy-MM-dd")
                props.setValues({...props.values, pricing: {
                    ...props.values.pricing, scpneus: {
                        ...props.values.pricing.scpneus, 
                        startPromotion: date,
                    }
                }})
            }

        }
    }

    function setZeroValue(value){
        if(value.length == 0){
            
        }
    }

    return (
        <div
        className={styles.wrapper}
        >
            <div
            className={styles.header}
            >
                <span
                className={styles.storeName}
                >
                    {props.storeName}
                </span>

            </div>
            <div
            className={styles.container}
            >
                <div
                className={styles.inputContainer}
                >
                    <DefaultPriceInput
                    width="100%"
                    label="custo"
                    name="cost"
                    placeholder=""
                    required=""
                    value={props.pricingValues.cost}
                    onChange={props.onChange}
                    />
                    <UnitInput
                    width="100%"
                    label="lucro"
                    name="profit"
                    unit="%"
                    placeholder=""
                    value={props.pricingValues.profit}
                    onChange={props.onChange}
                    onlyNumber={props.onlyNumber}
                    />
                    <DefaultPriceInput
                    width="100%"
                    label="preço de venda"
                    name="price"
                    placeholder=""
                    required="required"
                    value={props.pricingValues.price}
                    onChange={props.onChange}
                    />
                </div>
                <div
                className={styles.inputContainer}
                >
                    <DefaultPriceInput
                    width="100%"
                    label="preço promocional"
                    name="promotionalPrice"
                    placeholder=""
                    required=""
                    value={props.pricingValues.promotionalPrice}
                    onChange={props.onChange}
                    onlyNumber={props.onlyNumber}
                    leaveInput={handlePromotionDate}
                    />
                    <DateInput 
                    width="100%"
                    visibility={props.pricingValues.promotionalPrice}
                    label="inicio da promoção"
                    name="startPromotion"
                    value={props.pricingValues.startPromotion}
                    onChange={props.onChange}
                    />
                    <DateInput 
                    width="100%"
                    visibility={props.pricingValues.promotionalPrice}
                    label="fim da promoção"
                    name="endPromotion"
                    value={props.pricingValues.endPromotion}
                    onChange={props.onChange}
                    />
                </div>
            </div>
        </div>
    )
}