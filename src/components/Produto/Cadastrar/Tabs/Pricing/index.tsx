import { useContext, useEffect, useState } from 'react'
import { NewProductContext } from '../../../../../contexts/NewProductContext'
import floatToPrice from '../../../../../services/floatToPrice'
import priceToFloat from '../../../../../services/priceToFloat'
import DefaultSwitch from '../../../../Inputs/DefaultSwitch'
import DefaultTextInput from '../../../../Inputs/DefaultTextInput'
import DefaultSelectorInput from '../../../../Inputs/DefaultSelectorInput'
import AvailableInput from './AvailableInput'
import StorePricing from './StorePricing'
import styles from './styles.module.scss'

type Styles = {
    left: string
}

type Props = {
    styles: Styles;
}

export default function Pricing(props: Props){

    const { 
        unitaryDetails, setUnitaryDetails,
        mundialPricing, setMundialPricing,
        scpneusPricing, setScpneusPricing
    } = useContext(NewProductContext)

    const [ autoPrice, setAutoPrice ] = useState({
        active: true,
        label: 'automático',
        priceRule: 'desconto',
        value: 7,
        position: '0%',
    })

    useEffect(() => {
        if(autoPrice.active){
            setScpneusPricing({
                ...mundialPricing,
                promotionalPrice: autoPriceCalc(mundialPricing.promotionalPrice),
            })
        }
    }, [mundialPricing, autoPrice])

    function handleSelectValue(priceRule: string){
        setAutoPrice({
            ...autoPrice,
            priceRule: priceRule,
            active: true
        })
    }

    function onChangeAutoPrice(value: string){
        if(value == 'automática'){
            setAutoPrice({
                ...autoPrice,
                active: true
            })
        }

        if(value == 'manual'){
            setAutoPrice({
                ...autoPrice,
                active: false
            })
        }
    }

    function autoPriceCalc(promotionalPrice: number): number{
        if(autoPrice.priceRule == 'igual'){
            return promotionalPrice
        }

        if(autoPrice.priceRule == 'acrécimo'){
            return promotionalPrice*(1+(autoPrice.value/100))
        }

        if(autoPrice.priceRule == 'desconto'){
            return promotionalPrice*(1-(autoPrice.value/100))
        }
    }

    return (
        <div
        className={styles.wrapper}
        style={props.styles}
        >
            <StorePricing 
            key={0}
            header={'mundial'}
            pricing={mundialPricing}
            setPricing={setMundialPricing}
            />
            <div
            className={styles.autoPrice}
            >
                <div
                className={styles.autoPriceHeader}
                >
                    promoção
                </div>
                <div
                className={styles.autoPriceContainer}
                >
                    <DefaultSwitch
                    width='14rem'
                    selectedValue={autoPrice.active? 'automática' : 'manual'}
                    values={['automática', 'manual']}
                    onChange={onChangeAutoPrice}
                    />
                    <div
                    className={styles.autoPriceRow}
                    >
                        <DefaultSelectorInput 
                        display="flex"
                        width="100%"
                        label="regra de preço"
                        value={autoPrice.priceRule}
                        hideSelectedOption={true}
                        optionList={["igual", "acrécimo", "desconto"]}
                        onChange={handleSelectValue}
                        />
                        <DefaultTextInput
                        width='100%'
                        label={`${autoPrice.priceRule}`}
                        name='autoPriceValue'
                        display={autoPrice.priceRule == 'igual'? 'none' : 'flex'}
                        value={autoPrice.value == 100? '' : floatToPrice(autoPrice.value) }
                        textAlign={'center'}
                        onlyNumber={true}
                        onChange={(e) => {
                            setAutoPrice({...autoPrice, value: priceToFloat(e.target.value), active: true})
                        }}
                        />
                        <DefaultTextInput
                        width='100%'
                        label='resultado'
                        name='stock'
                        value={scpneusPricing.promotionalPrice == 0? '' : floatToPrice(scpneusPricing.promotionalPrice)}
                        textAlign={'center'}
                        onlyNumber={true}
                        onChange={(e) => {
                            setAutoPrice({...autoPrice, active: true, value: priceToFloat(e.target.value)})
                            setScpneusPricing({...scpneusPricing, promotionalPrice: priceToFloat(e.target.value)})
                        }}
                        />
                    </div>
                </div>
            </div>
            <StorePricing 
            key={1}
            header={'sc pneus'}
            pricing={scpneusPricing}
            setPricing={setScpneusPricing}
            />
            <DefaultTextInput
            width='10rem'
            label='estoque'
            name='stock'
            value={mundialPricing.stock.toString()}
            textAlign={'center'}
            onlyNumber={true}
            onChange={(e) => {
                setMundialPricing({...mundialPricing, stock: parseInt(e.target.value)})
                setScpneusPricing({...scpneusPricing, stock: parseInt(e.target.value)})
            }}
            />
            <AvailableInput 
            text={`${unitaryDetails.available > 0 ? 'diponível' : 'indiponível'}`}
            ballColor={`${unitaryDetails.available > 0? 'rgb(32, 117, 103)' : 'rgb(224, 29, 16)' }`}
            handleFunction={() => {
                const availability = unitaryDetails.available > 0? 0 : 1
                setUnitaryDetails({...unitaryDetails, available: availability })
            }}
            />
            <div
            className={styles.rowInput}
            >
                <DefaultTextInput
                width='20rem'
                label='disponibilidade'
                name='availability'
                value={unitaryDetails.availability}
                onChange={(e) => {
                    setUnitaryDetails({...unitaryDetails, availability: e.target.value})
                }}
                />
                <DefaultTextInput
                width='10rem'
                label='dias'
                name='availabilityDays'
                value={unitaryDetails.availabilityDays.toString()}
                textAlign={'center'}
                onChange={(e) => {
                    setUnitaryDetails({...unitaryDetails, availabilityDays: parseInt(e.target.value)})
                }}
                />
            </div>
        </div>
    )
}