import { format } from 'date-fns'
import { useState } from 'react'
import DefaultPriceInput from '../../../../Inputs/DefaultPriceInput'
import UnitInput from '../../../../Inputs/UnitInput'
import PriceInput from '../../Kits/KitWrapper/PriceInput'
import SelectorInput from '../../Kits/KitWrapper/SelectorInput'
import DateInput from '../DateInput'
import styles from './styles.module.scss'

export default function StoreContainer (props) {

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

    function handleAutoPrice(boolean){
        if(boolean && props.storeName == "SC Pneus"){
            props.setAutoPrice({
                ...props.autoPrice,
                active: true,
                label: 'automático',
                position: '0%'
            })
        } 
        if(!boolean && props.storeName == "SC Pneus"){
            props.setAutoPrice({
                ...props.autoPrice,
                active: false,
                label: 'manual',
                position: '50%'
            })
        }
    }

    function handleAutoPriceRules(option){
        props.setAutoPrice({
            ...props.autoPrice,
            priceRule: option
        })
        var value = parseFloat(props.values.pricing.mundial.promotionalPrice.replace(',', '.'))
        if(option == 'acrécimo'){
            value = value + (value * parseFloat(props.autoPrice.value) / 100)
        }
        if(option == 'desconto'){
            value = value - (value * parseFloat(props.autoPrice.value) / 100)
        }
        handlePromotionalPrice(value.toFixed(2).replace('.', ','))
    }

    function handleAutoPriceValue(value){
        
        var value = value == '' ? '0' : value

        props.setAutoPrice({
            ...props.autoPrice,
            value: value
        })

        var price = parseFloat(props.values.pricing.mundial.promotionalPrice.replace(',', '.'))
        if(props.autoPrice.priceRule == 'acrécimo'){
            price = price + (price * parseFloat(value) / 100)
        }
        if(props.autoPrice.priceRule == 'desconto'){
            price = price - (price * parseFloat(value) / 100)
        }

        handlePromotionalPrice(price.toFixed(2).replace('.', ','))
    }

    function handlePromotionalPrice(value){
        props.setValues({...props.values, pricing: {
            ...props.values.pricing, scpneus: {
                ...props.values.pricing.scpneus, 
                promotionalPrice: value
            }
        }})
        handlePromotionDate()
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
                <div
                className={styles.autoPriceSwitch}
                style={{
                    display: `${props.storeName == 'SC Pneus' ? 'flex' : 'none'}`
                }}
                >
                    <div
                    className={styles.placeholder}
                    onClick={() => handleAutoPrice(true)}
                    >
                        automático
                    </div>
                    <div
                    className={styles.placeholder}
                    onClick={() => handleAutoPrice(false)}
                    >
                        manual
                    </div>
                    <div
                    className={styles.selected}
                    style={{ left: `${props.autoPrice.position}` }}
                    >
                        {props.autoPrice.label}
                    </div>
                </div>
            </div>
            <div
            className={styles.container}
            >
                <div
                className={styles.inputContainer}
                style= {{ height: `${props.autoPrice.active ? '4.5rem' : '0'}`, overflow: `${props.autoPrice.active ? 'visible' : 'hidden'}` }}
                >
                    <SelectorInput
                    display="flex"
                    width="100%"
                    label="regra de preço"
                    value={props.autoPrice.priceRule}
                    optionList={["igual", "acrécimo", "desconto"]}
                    onChange={handleAutoPriceRules}
                    />
                    <PriceInput
                    display={`${props.autoPrice.priceRule == 'igual' ? 'none' : 'flex'}`}
                    width="100%"
                    label={`${props.autoPrice.priceRule}`}
                    value={props.autoPrice.value}
                    onChange={handleAutoPriceValue}
                    />
                    <PriceInput
                    display="flex"
                    width="100%"
                    label={`preço promocional`}
                    value={props.pricingValues.promotionalPrice}
                    onChange={handlePromotionalPrice}
                    />
                </div>
                <div
                className={styles.inputContainer}
                style= {{ height: `${props.autoPrice.active ? '0rem' : '4.5rem'}`, overflow: `${props.autoPrice.active ? 'hidden' : 'visible'}` }}
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
                style= {{ height: `${props.autoPrice.active ? '0rem' : '4.5rem'}`, overflow: `${props.autoPrice.active ? 'hidden' : 'visible'}` }}
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