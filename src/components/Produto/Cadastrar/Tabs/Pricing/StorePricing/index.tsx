import { differenceInDays, format, parseISO } from 'date-fns'
import { useContext, useEffect, useState } from 'react'
import { IPricing, NewProductContext } from '../../../../../../contexts/NewProductContext'
import floatToPrice from '../../../../../../services/floatToPrice'
import priceToFloat from '../../../../../../services/priceToFloat'
import DefaultDataInput from '../../../../../Inputs/DefaultDataInput'
import DefaultTextInput from '../../../../../Inputs/DefaultTextInput'
import styles from './styles.module.scss'

type Props = {
    pricing: IPricing;
    setPricing(pricing: IPricing): void;
    header: string;
}

export default function StorePricing(props: Props){

    const { errorsList, verifyErrorInput } = useContext(NewProductContext)

    const [ promotionalProfit, setPromotionalProfit ] = useState<number>(0)

    const [ startPromotion, setStartPromotion ] = useState<string>(format(props.pricing.startPromotion, 'yyyy-MM-dd'))
    const [ endPromotion, setEndPromotion ] = useState<string>(format(props.pricing.endPromotion, 'yyyy-MM-dd'))
    const [ promotionDateError, setPromotionDateError ] = useState<boolean>(false)

    const [ visibility, setVisibility] = useState<boolean>(true)

    useEffect(() => {
        if(props.pricing.promotionalPrice == 0){
            setVisibility(false)
            setTimeout(() => {
                setStartPromotion('0001-01-01')
                setEndPromotion('0001-01-01')
                props.setPricing({
                    ...props.pricing,
                    startPromotion: parseISO(startPromotion),
                    endPromotion: parseISO(endPromotion)
                })
            }, 100)
        }

        if(props.pricing.promotionalPrice != 0 && !visibility){
            setVisibility(true)
            const today = new Date()
            setStartPromotion(format(today, 'yyyy-MM-dd'))
            setEndPromotion(format(today, 'yyyy-MM-dd'))
            props.setPricing({
                ...props.pricing,
                startPromotion: today,
                endPromotion: today
            })
        }
    }, [props.pricing.promotionalPrice])

    useEffect(() => {
        const cost = props.pricing.cost_price
        const promotion = props.pricing.promotionalPrice

        if(cost == 0 || promotion == 0){
            setPromotionalProfit(0)
            return
        } 
        
        const profit = (promotion-cost)*100/cost

        setPromotionalProfit(profit)
        
    }, [props.pricing.cost_price] )

    useEffect(() => {
    
        if( differenceInDays(props.pricing.startPromotion, props.pricing.endPromotion) > 0 ){
            setPromotionDateError(true)
        } else {
            setPromotionDateError(false)
        }

    }, [errorsList, props.pricing.startPromotion, props.pricing.endPromotion])

    function onChangeCost(value: number){

        const profit = props.pricing.profit
        
        if(profit == 0){
            props.setPricing({
                ...props.pricing,
                cost_price: value
            })
            return
        }

        const newPrice = value*((profit/100)+1)

        props.setPricing({
            ...props.pricing,
            cost_price: value,
            price: newPrice 
        })
    }

    function onChangeProfit(value: number){

        const cost = props.pricing.cost_price

        if(cost == 0){
            props.setPricing({
                ...props.pricing,
                profit: value
            })
            return
        } 

        const newPrice = cost*((value/100)+1)
        
        props.setPricing({
            ...props.pricing,
            profit: value,
            price: newPrice 
        })
    }

    function onChangePromotionalPrice(value: number){

        const cost = props.pricing.cost_price

        props.setPricing({
            ...props.pricing,
            promotionalPrice: value
        })

        if(cost == 0 || value == 0){
            setPromotionalProfit(0)
            return
        }

        const profit = (value-cost)*100/cost
        setPromotionalProfit(profit)

    }

    function onChangePromotionalProfit(value: number){
        setPromotionalProfit(value)

        const cost = props.pricing.cost_price

        if(cost == 0){
            setPromotionalProfit(0)
            return
        } 

        const newPrice = cost*((value/100)+1)
        
        props.setPricing({
            ...props.pricing,
            promotionalPrice: newPrice 
        })
    }

    return (
        <div
        className={styles.wrapper}
        >
            <span
            className={styles.header}
            >
                {props.header}
            </span>
            <div
            className={styles.container}
            >
                <div
                className={styles.rowInput}
                >
                    <DefaultTextInput
                    label='custo'
                    name='cost_price'
                    value={floatToPrice(props.pricing.cost_price)}
                    onChange={(e) => {
                        onChangeCost(priceToFloat(e.target.value))
                    }}
                    />
                    <DefaultTextInput
                    label='lucro tabela'
                    name='profit'
                    value={floatToPrice(props.pricing.profit)}
                    onChange={(e) => {
                        onChangeProfit(priceToFloat(e.target.value))
                    }}
                    />
                    <DefaultTextInput
                    label='preço'
                    name='price'
                    value={floatToPrice(props.pricing.price)}
                    border={verifyErrorInput(`${props.header}Price`)? '1px solid #E01D10' : undefined}
                    onChange={(e) => {
                        props.setPricing({
                            ...props.pricing,
                            price: priceToFloat(e.target.value)
                        })
                    }}
                    />
                </div>
                <div
                className={styles.rowInput}
                >
                    <DefaultTextInput
                    label='lucro promoção'
                    name='promotionalProfit'
                    value={floatToPrice(promotionalProfit)}
                    onChange={(e) => {
                        onChangePromotionalProfit(priceToFloat(e.target.value))
                    }}
                    />
                    <DefaultTextInput
                    label='preço promocional'
                    name='promotionalPrice'
                    value={floatToPrice(props.pricing.promotionalPrice)}
                    onChange={(e) => {
                        onChangePromotionalPrice(priceToFloat(e.target.value))
                    }}
                    />
                    <DefaultDataInput
                    label={`inicio`}
                    name='startPromotion'
                    value={startPromotion}
                    visibility={visibility}
                    onChange={(e) => {
                        setStartPromotion(e.target.value)
                    }}
                    leaveInput={() => {
                        props.setPricing({
                            ...props.pricing,
                            startPromotion: parseISO(startPromotion)
                        })
                    }}
                    />
                    <DefaultDataInput
                    label='fim'
                    name='endPromotion'
                    value={endPromotion}
                    visibility={visibility}
                    border={promotionDateError? '1px solid #E01D10' : undefined}
                    onChange={(e) => {
                        setEndPromotion(e.target.value)
                    }}
                    leaveInput={() => {
                        props.setPricing({
                            ...props.pricing,
                            endPromotion: parseISO(endPromotion)
                        })
                    }}
                    />
                </div>
            </div>
        </div>
    )
}