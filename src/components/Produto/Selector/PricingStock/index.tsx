import styles from './styles.module.scss'

import StoreContainer from './StoreContainer'
import UnitInput from '../../../Inputs/UnitInput'
import { useEffect, useState } from 'react'
import AvailableInput from './AvailableInput'
import StoreContainerMundial from './StoreContainerMundial'

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

    const [ autoPrice, setAutoPrice ] = useState({
        active: true,
        label: 'automático',
        priceRule: 'desconto',
        value: `${100 - ((parseFloat(props.values.pricing.scpneus.promotionalPrice)/100)*parseFloat(props.values.pricing.mundial.promotionalPrice))}`,
        position: '0%',
    })

    function handlePricing(e){

        const key = e.target.getAttribute('name')
        const value = e.target.value

        props.setValues({...props.values, pricing: {
             mundial: {
                ...props.values.pricing.mundial, [key]: value
            },
            scpneus: {
                ...props.values.pricing.scpneus, [key]: value
            }
        }})
    }

    function handlePricingMundial(e){

        const key = e.target.getAttribute('name')
        const value = e.target.value

        if(autoPrice.active && key != 'promotionalPrice'){
            props.setValues({...props.values, pricing: {
                mundial: {
                    ...props.values.pricing.mundial, [key]: value
                },
                scpneus: {
                    ...props.values.pricing.scpneus, [key]: value
                }
            }})
        } else {
            props.setValues({...props.values, pricing: {
                ...props.values.pricing,
                mundial: {
                    ...props.values.pricing.mundial, [key]: value
                }
            }})
        }
    }

    function handlePricingSCpneus(e){

        const key = e.target.getAttribute('name')
        const value = e.target.value

        props.setValues({...props.values, pricing: {
            ...props.values.pricing,
            scpneus: {
                ...props.values.pricing.scpneus, [key]: value
            }
        }})
    }

    function setZeroStock(){
        const stock = props.values.pricing.mundial.stock.toString()
        if(props.values.pricing.mundial.stock.length == 0){
            props.setValues({...props.values, pricing: {
                ...props.values.pricing,
                 mundial: {
                    ...props.values.pricing.mundial, stock: "0"
                }
            }})
        }
    }

    function leavePromotionInput(){
        console.log('leaveInput')
        console.log(props.values.pricing.mundial.promotionalPrice)
        
        const promotionalPriceMundial = props.values.pricing.mundial.promotionalPrice.length == 0 ? 0 : parseFloat(props.values.pricing.mundial.promotionalPrice.replace(',', '.'))

        if(promotionalPriceMundial == 0 && autoPrice){
            setAutoPrice({
                ...autoPrice,
                priceRule: 'igual',
                value: '0',
            })
            props.setValues({...props.values, pricing: {
                ...props.values.pricing,
                mundial: {
                    ...props.values.pricing.mundial, 
                    startPromotion: '',
                    endPromotion: '',
                    promotionalPrice: '0,00'
                },
                scpneus: {
                    ...props.values.pricing.scpneus,
                    promotionalPrice: '0,00',
                    startPromotion: '',
                    endPromotion: '',
                }
            }})
        }
        if(promotionalPriceMundial > 0 && autoPrice){           
            props.setValues({...props.values, pricing: {
                ...props.values.pricing,
                scpneus: {
                    ...props.values.pricing.scpneus,
                    promotionalPrice: autoPrice.priceRule == 'igual' ? props.values.pricing.mundial.promotionalPrice :
                    autoPrice.priceRule == 'acrécimo' ? (promotionalPriceMundial * ((parseFloat(autoPrice.value)/100) + 1)).toFixed(2) :
                    (promotionalPriceMundial * (1 - (parseFloat(autoPrice.value)/100))).toFixed(2),
                    startPromotion: props.values.pricing.mundial.startPromotion,
                    endPromotion: props.values.pricing.mundial.endPromotion,
                }
            }})
        }
    }

    useEffect(() => {
        console.log('useEffct')

        const promotionalPriceMundial = props.values.pricing.mundial.promotionalPrice.length == 0 ? 0 : parseFloat(props.values.pricing.mundial.promotionalPrice.replace(',', '.'))
        const promotionalPriceScPneus = props.values.pricing.scpneus.promotionalPrice.length == 0 ? 0 : parseFloat(props.values.pricing.scpneus.promotionalPrice.replace(',', '.'))

        if(promotionalPriceScPneus < promotionalPriceMundial){
            setAutoPrice({
                ...autoPrice,
                priceRule: 'desconto',
                value: (100 - ((promotionalPriceScPneus*100)/promotionalPriceMundial)).toFixed(2).replace('.', ','),
            })
        }
        if(promotionalPriceScPneus > promotionalPriceMundial){
            setAutoPrice({
                ...autoPrice,
                priceRule: 'acrécimo',
                value: (((promotionalPriceScPneus*100)/promotionalPriceMundial) - 100).toFixed(2).replace('.', ','),
            })
        }
        if(promotionalPriceScPneus == promotionalPriceMundial){
            setAutoPrice({
                ...autoPrice,
                priceRule: 'igual',
                value: '0',
            })
        }

    }, [props.values.hubId, props.values.pricing.scpneus.promotionalPrice])

    return(
        <div
        className={styles.wrapper}
        style={{display:`${props.display.display}`}}
        >
            <StoreContainerMundial 
            storeName='Mundial'
            pricingValues={props.values.pricing.mundial}
            autoPrice={autoPrice}
            setAutoPrice={setAutoPrice}
            values={props.values}
            setValues={props.setValues}
            onChange={handlePricingMundial}
            onlyNumber={props.onlyNumber}
            leavePromotionInput={leavePromotionInput}
            />
            <StoreContainer 
            storeName='SC Pneus'
            pricingValues={props.values.pricing.scpneus}
            autoPrice={autoPrice}
            setAutoPrice={setAutoPrice}
            values={props.values}
            setValues={props.setValues}
            onChange={handlePricingSCpneus}
            onlyNumber={props.onlyNumber}
            />
            <div className={styles.inputContainer}>
                <UnitInput
                width="10rem"
                label="estoque"
                name="stock"
                unit="un"
                value={props.values.pricing.mundial.stock}
                onChange={handlePricing}
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