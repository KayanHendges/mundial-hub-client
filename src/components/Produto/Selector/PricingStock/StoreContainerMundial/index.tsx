import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import DefaultPriceInput from '../../../../Inputs/DefaultPriceInput'
import UnitInput from '../../../../Inputs/UnitInput'
import PriceInput from '../../Kits/KitWrapper/PriceInput'
import SelectorInput from '../../Kits/KitWrapper/SelectorInput'
import DateInput from '../DateInput'
import styles from './styles.module.scss'

export default function StoreContainerMundial (props) {

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
        
        const promotionalPrice = (cost*((profit/100)+1))

        if(props.autoPrice.active){
            const ScPromotionalPrice = props.autoPrice.priceRule == 'igual' ? props.values.pricing.mundial.promotionalPrice :
            props.autoPrice.priceRule == 'acrécimo' ? (promotionalPrice * ((parseFloat(props.autoPrice.value)/100) + 1)).toFixed(2) :
            (promotionalPrice * (1 - (parseFloat(props.autoPrice.value)/100))).toFixed(2)
            props.setValues({...props.values, pricing: {
                mundial: {
                    ...props.values.pricing.mundial, 
                    promotionalPrice: promotionalPrice.toFixed(2).replace('.', ',')
                },
                scpneus: {
                    ...props.values.pricing.scpneus, 
                    promotionalPrice: ScPromotionalPrice
                }
            }})
        } else {
            props.setValues({...props.values, pricing: {
                ...props.values.pricing, mundial: {
                    ...props.values.pricing.mundial, 
                    promotionalPrice: promotionalPrice.toFixed(2).replace('.', ',')
                }
            }})
        }

    }

    function handlePromotionDate(){

        if(props.pricingValues.promotionalPrice.length == 0){
            console.log('zerar datas')
            props.setValues({...props.values, pricing: {
                ...props.values.pricing, mundial: {
                    ...props.values.pricing.mundial, 
                    startPromotion: '',
                    endPromotion: '',
                    promotionalPrice: '0,00'
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

        props.leavePromotionInput()
    
    }

    function setZeroCost(){
        if(props.values.pricing.mundial.cost.length == 0 && props.autoPrice.active){
            props.setValues({...props.values, pricing: {
                ...props.values.pricing, mundial: {
                    ...props.values.pricing.mundial, 
                    cost: '0,00',
                },
                scpneus: {
                    ...props.values.pricing.scpneus, 
                    cost: '0,00',
                }
            }})
        }
        if(props.values.pricing.mundial.cost.length == 0 && !props.autoPrice.active){
            props.setValues({...props.values, pricing: {
                ...props.values.pricing, mundial: {
                    ...props.values.pricing.mundial, 
                    cost: '0,00',
                },
            }})
        }
    }

    function setZeroProfit(){
        if(props.values.pricing.mundial.profit.length == 0 && props.autoPrice.active){
            props.setValues({...props.values, pricing: {
                ...props.values.pricing, mundial: {
                    ...props.values.pricing.mundial, 
                    profit: '0',
                },
                scpneus: {
                    ...props.values.pricing.scpneus, 
                    profit: '0',
                }
            }})
        }
        if(props.values.pricing.mundial.profit.length == 0 && !props.autoPrice.active){
            props.setValues({...props.values, pricing: {
                ...props.values.pricing, mundial: {
                    ...props.values.pricing.mundial, 
                    profit: '0',
                },
            }})
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
                >
                    <UnitInput
                    width="100%"
                    label="lucro promoção"
                    name="promotionalProfit"
                    unit="%"
                    value={promotionalProfit}
                    onChange={handlePromotionalProfit}
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