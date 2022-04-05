import { differenceInDays, format, getDay, parseISO } from 'date-fns'
import { useContext, useEffect, useState } from 'react'
import { IPricing, NewProductContext } from '../../../../../../contexts/NewProductContext'
import { ProductContext } from '../../../../../../contexts/ProductContext'
import convertDate from '../../../../../../services/ConvertDate/convertDate'
import floatToPrice from '../../../../../../services/floatToPrice'
import priceToFloat from '../../../../../../services/priceToFloat'
import DefaultDateInput from '../../../../../Inputs/DefaultDateInput'
import DefaultTextInput from '../../../../../Inputs/DefaultTextInput'
import styles from './styles.module.scss'

type Props = {
    pricing: IPricing;
    setPricing(pricing: IPricing): void;
    header: string;
}

export default function StorePricing(props: Props){

    const { unitaryDetails } = useContext(ProductContext)

    const { errorsList, verifyErrorInput } = useContext(ProductContext)

    const [ promotionalProfit, setPromotionalProfit ] = useState<number>(0)

    const [ startPromotion, setStartPromotion ] = useState<string>(format(props.pricing.startPromotion, 'yyyy-MM-dd'))
    const [ endPromotion, setEndPromotion ] = useState<string>(format(props.pricing.endPromotion, 'yyyy-MM-dd'))
    const [ promotionDateError, setPromotionDateError ] = useState<boolean>(false)

    const [ visibility, setVisibility] = useState<'visible' | 'hidden'>('visible')

    useEffect(() => {
        setStartPromotion(format(props.pricing.startPromotion, 'dd/MM/yyyy'))
        setEndPromotion(format(props.pricing.endPromotion, 'dd/MM/yyyy'))
    }, [props.pricing.startPromotion, props.pricing.endPromotion])

    useEffect(() => {
        if(props.pricing.promotionalPrice == 0){
            setVisibility('hidden')
            setTimeout(() => {
                setStartPromotion('')
                setEndPromotion('')
                props.setPricing({
                    ...props.pricing,
                    startPromotion: parseISO('0001-01-01'),
                    endPromotion: parseISO('0001-01-01')
                })
            }, 100)
        }

        if(props.pricing.promotionalPrice != 0 && visibility == 'hidden'){
            setVisibility('visible')
            if(format(props.pricing.startPromotion, 'yyyy-MM-dd') == '0001-01-01'){
                const today = new Date()
                setStartPromotion(format(today, 'dd/MM/yyyy'))
                setEndPromotion(format(today, 'dd/MM/yyyy'))
                props.setPricing({
                    ...props.pricing,
                    startPromotion: today,
                    endPromotion: today
                })
            }
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
                    loading={unitaryDetails.hub_id? false : true }
                    label='custo'
                    name='cost_price'
                    value={floatToPrice(props.pricing.cost_price)}
                    onChange={(e) => {
                        onChangeCost(priceToFloat(e.target.value))
                    }}
                    />
                    <DefaultTextInput
                    loading={unitaryDetails.hub_id? false : true }
                    label='lucro tabela'
                    name='profit'
                    value={floatToPrice(props.pricing.profit)}
                    onChange={(e) => {
                        onChangeProfit(priceToFloat(e.target.value))
                    }}
                    />
                    <DefaultTextInput
                    loading={unitaryDetails.hub_id? false : true }
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
                    loading={unitaryDetails.hub_id? false : true }
                    label='lucro promoção'
                    name='promotionalProfit'
                    value={floatToPrice(promotionalProfit)}
                    onChange={(e) => {
                        onChangePromotionalProfit(priceToFloat(e.target.value))
                    }}
                    />
                    <DefaultTextInput
                    loading={unitaryDetails.hub_id? false : true }
                    label='preço promocional'
                    name='promotionalPrice'
                    value={floatToPrice(props.pricing.promotionalPrice)}
                    onChange={(e) => {
                        onChangePromotionalPrice(priceToFloat(e.target.value))
                    }}
                    />
                    <DefaultDateInput
                    loading={unitaryDetails.hub_id? false : true }
                    label={`inicio`}
                    name='startPromotion'
                    value={startPromotion}
                    visibility={visibility}
                    onChange={(e) => {
                        setStartPromotion(e)
                    }}
                    leaveInput={(date) => {
                        const newDate = parseISO(convertDate(date))
                        
                        if(newDate.toString() == 'Invalid Date'){
                            console.log('data invalida')
                            props.setPricing({
                                ...props.pricing,
                                startPromotion: new Date()
                            })
                            setStartPromotion(format(new Date(), 'dd/MM/yyyy'))
                        } else {
                            props.setPricing({
                                ...props.pricing,
                                startPromotion: newDate
                            })
                        }
                    }}
                    />
                    <DefaultDateInput
                    loading={unitaryDetails.hub_id? false : true }
                    label='fim'
                    name='endPromotion'
                    value={endPromotion}
                    visibility={visibility}
                    border={promotionDateError? '1px solid #E01D10' : undefined}
                    onChange={(e) => {
                        setEndPromotion(e)
                    }}
                    leaveInput={(date) => {
                        const newDate = parseISO(convertDate(date))
                        
                        if(newDate.toString() == 'Invalid Date'){
                            console.log('data invalida')
                            props.setPricing({
                                ...props.pricing,
                                endPromotion: new Date()
                            })
                            setEndPromotion(format(new Date(), 'dd/MM/yyyy'))
                        } else {
                            props.setPricing({
                                ...props.pricing,
                                endPromotion: newDate
                            })
                        }
                    }}
                    />
                </div>
            </div>
        </div>
    )
}