import { useState } from 'react'
import { api } from '../../../../../services/api'
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
                    priceRule: 1,
                    discountValue: "0"
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
        height: "0rem",
        padding: "0 1rem 0"
    })

    const [ createKit, setCreateKit ] = useState({
        requestSent: false,
        span: 'criar kit',
        border: '1px solid var(--complementar-text)'
    })

    const [ fill, setFill ] = useState({
        borderColor: "1px solid var(--complementar-text)",
        color: "var(--complementar-text)",
        display: props.createKit ? "flex" : "none"
    })

    function handleFill(){
        setFill({
            borderColor: "1px solid #207567",
            color: "var(--white-text)",
            display: "flex"
        })

        props.fillKits()

        setTimeout(() => {
            setFill({
                borderColor: "1px solid var(--complementar-text)",
                color: "var(--complementar-text)",
                display: "none"
            })
        }, 1000)
    }

    function displayCreateKit(createKit){
        if(createKit){
            return 'flex'
        } else {
            return 'none'
        }
    }

    function hasPromotionPrice(date){
        if(props.values.promotionalPrice == ""){
            return ""
        } else {
            return date
        }
    }

    function requestCreateKit(){
        console.log(createKit.requestSent)
        if(!createKit.requestSent){
            api.post('/produtos.kit', {
                params: {
                    unitary: {
                        ean: props.values.ean,
                        tray_id: props.values.trayId,
                        is_kit: props.values.is_kit,
                        ncm: props.values.ncm,
                        product_name: props.values.name,
                        product_title: props.values.name,
                        product_description: props.values.description,
                        product_small_description: props.values.description,
                        price: props.values.price,
                        cost_price: props.values.cost,
                        profit: props.values.profit,
                        promotional_price: props.values.promotionalPrice,
                        start_promotion: hasPromotionPrice(props.values.startPromotion),
                        end_promotion: hasPromotionPrice(props.values.endPromotion),
                        brand: props.values.brand,
                        model: props.values.model,
                        weight: parseInt(props.values.weight),
                        length: parseInt(props.values.length),
                        width: parseInt(props.values.width),
                        height: parseInt(props.values.height),
                        stock_tray: parseInt(props.values.stock),
                        main_category_id: props.values.mainCategoryId,
                        tray_related_categories: props.values.related_categories,
                        available: props.values.available,
                        availability: props.values.availability,
                        availability_days: props.values.availabilityDays,
                        reference: props.values.reference,
                        picture_source_1: props.values.images[0].imageUrl,
                        picture_source_2: props.values.images[1].imageUrl,
                        picture_source_3: props.values.images[2].imageUrl,
                        picture_source_4: props.values.images[3].imageUrl,
                        picture_source_5: props.values.images[4].imageUrl,
                        picture_source_6: props.values.images[5].imageUrl,
                        comments: "",
                    },
                    kit: {
                        tray_id: props.kitValues.trayId,
                        is_kit: props.kitValues.is_kit,
                        product_name: props.kitValues.name,
                        product_title: props.kitValues.name,
                        product_description: props.kitValues.description,
                        product_small_description: props.kitValues.description,
                        reference: props.kitValues.reference,
                        picture_source_1: props.kitValues.images[0].imageUrl,
                        picture_source_2: props.kitValues.images[1].imageUrl,
                        picture_source_3: props.kitValues.images[2].imageUrl,
                        picture_source_4: props.kitValues.images[3].imageUrl,
                        picture_source_5: props.kitValues.images[4].imageUrl,
                        picture_source_6: props.kitValues.images[5].imageUrl,
                        rules: {
                            discount_type: props.kitValues.rules.discountType,
                            discount_value: parseFloat(props.kitValues.rules.discountValue.replace(",", ".")),
                            price: 0,
                            price_rule: props.kitValues.rules.priceRule,
                            product_id: props.kitValues.rules.productId,
                            product_parent_id: props.kitValues.rules.productParentId,
                            quantity: props.kitValues.rules.quantity,
                            tray_id: props.kitValues.rules.trayId,
                        }
                    }
                },
            }).then(response => {
                if(response.data.code == 201){
                    setCreateKit({
                        ...createKit,
                        span: 'kit criado',
                        border: '1px solid #207567',
                        requestSent: true
                    })
                } else {
                    setCreateKit({
                        ...createKit,
                        span: 'kit não criado',
                        border: '1px solid #E01D10',
                        requestSent: true
                    })
                }
            }).catch(erro => {
                alert(erro)
                setCreateKit({
                    ...createKit,
                    span: 'kit não criado',
                    border: '1px solid #E01D10',
                    requestSent: true
                })
            })
        }
    }

    function handleKitContainer(boolean){
        if(boolean){
            setOptionStyle({
                show: true,
                display: "flex",
                height: "34rem",
                padding: ".5rem 1rem 1rem"
            })
        } else {
            setOptionStyle({
                show: false,
                display: "none",
                height: "0rem",
                padding: "0 1rem 0"
            })
        }
    }

    function handleDiscount(value){
        props.setKitValues({
            ...props.kitValues,
            rules: {
                ...props.kitValues.rules,
                discountValue: value
            }
        })
    }

    function hasDisplay(){
        if(props.kitValues.rules.priceRule == 1){
            return "none"
        } else {
            return "flex"
        }
    }

    return(
        <div
            className={styles.kitWrapper}
            >
                <div
                className={styles.header}
                onClick={() => handleKitContainer(!optionStyle.show)}
                >
                    <span>
                        {props.kitHeader} {props.createKit ? '- ainda não foi criado' : ''}
                    </span>
                    <div
                    className={styles.createKit}
                    style={{ 
                        display: `${displayCreateKit(props.createKit)}`,
                        border: `${createKit.border}`
                    }}
                    onClick={() => {
                        requestCreateKit()
                    }}
                    >
                        <span>
                            {createKit.span}
                        </span>
                    </div>
                </div>
                <div
                className={styles.kitContainer}
                style={{
                    // display: `${optionStyle.display}`,
                    height: `${optionStyle.height}`,
                    padding: `${optionStyle.padding}`
                }}
                >
                    <div
                    className={styles.fillButton}
                    onClick={() => handleFill()}
                    style={{
                        border: `${fill.borderColor}`,
                        display: `${fill.display}`
                    }}
                    >
                        <span
                        style={{
                            color: `${fill.color}`  
                        }}
                        >
                            preencher
                        </span>
                    </div>
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
                        display="flex"
                        width="13rem"
                        label="regra de preço"
                        value={priceRuleFunction(props.kitValues.rules.priceRule)}
                        optionList={["preço igual da loja", "preço com desconto"]}
                        onChange={changePriceRule}
                        />
                        <SelectorInput
                        display={hasDisplay()}
                        width="9rem"
                        label="desconto em"
                        value={discountTypeFunction(props.kitValues.rules.discountType)}
                        optionList={["porcentagem", "reais"]}
                        onChange={changeDiscountType}
                        />
                        <PriceInput
                        display={hasDisplay()}
                        width="8rem"
                        label="desconto"
                        value={props.kitValues.rules.discountValue}
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