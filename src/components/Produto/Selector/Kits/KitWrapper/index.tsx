import { useState } from 'react'
import DefaultInput from '../../../../Inputs/DefaultInput'
import DefaultTextArea from '../../../../Inputs/DefaultTextArea'
import ImageGallery from '../../DadosGerais/ImagesGallery'
import PriceInput from './PriceInput'
import SelectorInput from './SelectorInput'
import styles from './styles.module.scss'

export default function KitWrapper(props){

    function priceRuleFunction(value){
        if(value == 1){
            return "preço igual da loja"
        }
        if(value == 2){
            return "preço com desconto"
        }
    }

    function changePriceRule(value){
        if(value == "preço igual da loja"){
            props.setKitValues({
                ...props.kitValues,
                rules: {
                    ...props.kitValues.rules,
                    priceRule: 1
                }
            })
        }
        if(value == "preço com desconto"){
            props.setKitValues({
                ...props.kitValues,
                rules: {
                    ...props.kitValues.rules,
                    priceRule: 2
                }
            })
        }
    }

    function discountTypeFunction(value){
        if(value == "%"){
            return "porcentagem"
        }
        if(value == "$"){
            return "reais"
        }
    }

    function changeDiscountType(value){
        if(value == "reais"){
            props.setKitValues({
                ...props.kitValues,
                rules: {
                    ...props.kitValues.rules,
                    discountType: "$"
                }
            })
        }
        if(value == "porcentagem"){
            props.setKitValues({
                ...props.kitValues,
                rules: {
                    ...props.kitValues.rules,
                    discountType: "%"
                }
            })
        }
    }

    const [ optionStyle, setOptionStyle ] = useState({
        show: false,
        display: "none",
        height: "0rem"
    })

    function handleKitContainer(boolean){
        if(boolean){
            setOptionStyle({
                show: true,
                display: "flex",
                height: "auto"
            })
        } else {
            setOptionStyle({
                show: false,
                display: "none",
                height: "0rem"
            })
        }
    }

    function handleDiscount(value){
        console.log(value)
        props.setKitValues({
            ...props.kitValues,
            rules: {
                ...props.kitValues.rules,
                discountValue: value
            }
        })
    }

    return(
        <div
            className={styles.kitWrapper}
            >
                <div
                className={styles.header}
                onClick={() => handleKitContainer(!optionStyle.show)}
                >
                    {props.kitHeader}
                </div>
                <div
                className={styles.kitContainer}
                style={{
                    display: `${optionStyle.display}`,
                    height: `${optionStyle.height}`
                }}
                >
                    <DefaultInput
                    label="nome do kit"
                    width="100%"
                    value={props.kitValues.name}
                    onChange={props.onChange}
                    />
                    <div
                    className={styles.inputContainer}
                    >
                        <SelectorInput
                        width="13rem"
                        label="regra de preço"
                        value={priceRuleFunction(props.kitValues.rules.priceRule)}
                        optionList={["preço igual da loja", "preço com desconto"]}
                        onChange={changePriceRule}
                        />
                        <SelectorInput
                        width="9rem"
                        label="desconto em"
                        value={discountTypeFunction(props.kitValues.rules.discountType)}
                        optionList={["porcentagem", "reais"]}
                        onChange={changeDiscountType}
                        />
                        <PriceInput
                        width="8rem"
                        label="desconto"
                        value={props.kitValues.rules.discountValue.replace(".", ",")}
                        onChange={handleDiscount}
                        />
                    </div>
                    <DefaultTextArea
                    rows={3}
                    type="textarea"
                    width="100%"
                    label="descrição"
                    required=""
                    value={props.kitValues.description}
                    onChange={props.onChange}
                    />
                    <ImageGallery
                    values={props.kitValues}
                    setValues={props.setKitValues}
                    />
                </div>
            </div>
    )
}