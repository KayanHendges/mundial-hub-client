import router from 'next/router'
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
            api.post('/products/page/kit', {
                params: {
                    unitary: {
                        hubId: props.values.hubId,
                        ean: props.values.ean,
                        ncm: props.values.ncm,
                        name: props.values.name,
                        description: props.values.description,
                        pricing: {
                            mundial: {
                                tray_id: props.values.pricing.mundial.tray_id,
                                cost: props.values.pricing.mundial.cost,
                                profit: props.values.pricing.mundial.profit,
                                price: props.values.pricing.mundial.price,
                                promotionalPrice: props.values.pricing.mundial.promotionalPrice,
                                startPromotion: props.values.pricing.mundial.startPromotion,
                                endPromotion: props.values.pricing.mundial.endPromotion,
                                stock: props.values.pricing.mundial.stock
                            },
                            scpneus: {
                                tray_id: props.values.pricing.scpneus.tray_id,
                                cost: props.values.pricing.scpneus.cost,
                                profit: props.values.pricing.scpneus.profit,
                                price: props.values.pricing.scpneus.price,
                                promotionalPrice: props.values.pricing.scpneus.promotionalPrice,
                                startPromotion: props.values.pricing.scpneus.startPromotion,
                                endPromotion: props.values.pricing.scpneus.endPromotion,
                                stock: props.values.pricing.scpneus.stock
                            }
                        },
                        brand: props.values.brand,
                        model: props.values.model,
                        weight: props.values.weight,
                        length: props.values.length,
                        width: props.values.width,
                        height: props.values.height,
                        mainCategoryId: props.values.mainCategoryId,
                        related_categories: props.values.related_categories,
                        availability: props.values.availability,
                        availabilityDays: props.values.availabilityDays,
                        reference: props.values.reference,
                        images: [
                            {imageUrl: props.values.images[0].imageUrl},
                            {imageUrl: props.values.images[1].imageUrl},
                            {imageUrl: props.values.images[2].imageUrl},
                            {imageUrl: props.values.images[3].imageUrl},
                            {imageUrl: props.values.images[4].imageUrl},
                            {imageUrl: props.values.images[5].imageUrl}
                        ],
                        comments: props.values.comments,
                    },
                    kit: {
                        hubId: props.kitValues.hubId,
                        trayId: props.kitValues.trayId,
                        name: props.kitValues.name,
                        description: props.kitValues.description,
                        images: [
                            {imageUrl: props.kitValues.images[0].imageUrl},
                            {imageUrl: props.kitValues.images[1].imageUrl},
                            {imageUrl: props.kitValues.images[2].imageUrl},
                            {imageUrl: props.kitValues.images[3].imageUrl},
                            {imageUrl: props.kitValues.images[4].imageUrl},
                            {imageUrl: props.kitValues.images[5].imageUrl}
                        ],
                        rules: {
                            discountType: props.kitValues.rules.discountType,
                            discountValue: props.kitValues.rules.discountValue,
                            priceRule: props.kitValues.rules.priceRule,
                        }
                    },
                    quantity: props.quantity
                },
            }).then(response => {
                if(response.data.code == 201){
                    setCreateKit({
                        ...createKit,
                        span: 'kit criado',
                        border: '1px solid #207567',
                        requestSent: true
                    }),
                    props.setReload(props.reload+1)
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
                    updateImages={props.updateImages}
                    setUpdateImages={props.setUpdateImages}
                    />
                </div>
            </div>
    )
}