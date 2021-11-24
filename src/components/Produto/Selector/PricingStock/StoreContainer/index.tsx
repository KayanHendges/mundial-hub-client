import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import DefaultPriceInput from '../../../../Inputs/DefaultPriceInput'
import UnitInput from '../../../../Inputs/UnitInput'
import PriceInput from '../../Kits/KitWrapper/PriceInput'
import SelectorInput from '../../Kits/KitWrapper/SelectorInput'
import DateInput from '../DateInput'
import styles from './styles.module.scss'

export default function StoreContainer (props) {


    const [ promotionalProfit, setPromotionalProfit ] = useState('0,00')

    useEffect(() => {
        const promotionalPrice = parseFloat(props.pricingValues.promotionalPrice.replace(',', '.'))
        const cost = parseFloat(props.pricingValues.cost.replace(',', '.'))

        if(promotionalPrice > 0){
            const profit = ((promotionalPrice*100/cost)-100).toFixed(2).replace('.', ',')
            setPromotionalProfit(profit)
        }
    }, [props.pricingValues.cost, props.pricingValues.promotionalPrice])

    function handlePromotionalProfit(e){
        const value = e.target.value

        const cost = parseFloat(props.pricingValues.cost.replace(',', '.'))
        const profit = parseFloat(e.target.value.replace(',', '.'))

        setPromotionalProfit(value)
    }

    function calcPromotionByProfit(){
        const cost = parseFloat(props.pricingValues.cost.replace(',', '.'))
        const profit = parseFloat(promotionalProfit.replace(',', '.'))
        
        const promotionalPrice = (cost*((profit/100)+1)).toFixed(2).replace('.', ',')

        props.setValues({...props.values, pricing: {
            ...props.values.pricing, scpneus: {
                ...props.values.pricing.scpneus, 
                promotionalPrice: promotionalPrice
            }
        }})
    }

    function handlePromotionDate(){
        if(props.pricingValues.promotionalPrice.length == 0){
            props.setValues({...props.values, pricing: {
                ...props.values.pricing, scpneus: {
                    ...props.values.pricing.scpneus, 
                    startPromotion: '',
                    endPromotion: '',
                    promotionalPrice: '0,00'
                }
            }})
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

    function setZeroCost(){
        if(props.values.pricing.scpneus.cost.length == 0){
            props.setValues({...props.values, pricing: {
                ...props.values.pricing, scpneus: {
                    ...props.values.pricing.scpneus, 
                    cost: '0,00',
                }
            }})
        }
    }

    function setZeroProfit(){
        if(props.values.pricing.scpneus.profit.length == 0){
            props.setValues({...props.values, pricing: {
                ...props.values.pricing, scpneus: {
                    ...props.values.pricing.scpneus, 
                    profit: '0',
                }
            }})
        }
    }
    
    useEffect(() => {
        if((props.pricingValues.cost.length > 0 && props.pricingValues.cost.length != '0,00') &&
        props.pricingValues.profit.length > 0 && props.pricingValues.cost.length != '0'
        ){
            const cost = parseFloat(props.pricingValues.cost.replace(',', '.'))
            const profit = parseFloat(props.pricingValues.profit.replace(',', '.'))

            props.setValues({...props.values, pricing: {
                ...props.values.pricing, scpneus: {
                    ...props.values.pricing.scpneus, 
                    price: (cost*((profit/100) + 1)).toFixed(2),
                }
            }})
        }
    }, [props.pricingValues.cost, props.pricingValues.profit])

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
                    leaveInput={setZeroCost}
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
                    leaveInput={setZeroProfit}
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
                    <UnitInput
                    width="100%"
                    label="lucro promoção"
                    name="promotionalProfit"
                    unit="%"
                    value={promotionalProfit}
                    onChange={props.onChange}
                    onlyNumber={props.onlyNumber}
                    leaveInput={calcPromotionByProfit}
                    />
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