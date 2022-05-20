import { useContext, useEffect, useState } from 'react'
import { IKitDetails, IKitRules, NewProductContext } from '../../../../../../contexts/NewProductContext'
import DefaultTextAreaInput from '../../../../../Inputs/DefaultTextAreaInput'
import DefaultTextInput from '../../../../../Inputs/DefaultTextInput'
import ImageGallery from '../../../ImagesGallery'
import DefaultSelectorInput from '../../../../../Inputs/DefaultSelectorInput'
import styles from './styles.module.scss'
import floatToPrice from '../../../../../../services/floatToPrice'
import priceToFloat from '../../../../../../services/priceToFloat'
import { titleize } from '../../../../../../services/Titleize'

type Props = {
    kitDetails: IKitDetails;
    setKitDetails(kitDetails: IKitDetails): void;
    kitRules: IKitRules;
    setKitRules(kitRules: IKitRules): void;
    header: string;
    index: number;
    selectedContainer: number;
    setSelectedContainer(selectedContainer: number): void;
}

type ContainerStyle = {
    kitContainer: {
        backgroundColor: string,
        border: string,
    },
    container: {
        height: string,
        padding: string,
    },
}

export default function KitContainer(props: Props){

    const { 
        unitaryDetails, setUnitaryDetails,
        mundialPricing, errorsList,
        verifyErrorInput
    } = useContext(NewProductContext)
    
    const closedContainerStyle: ContainerStyle = {
        kitContainer: {
            backgroundColor: 'var(--gray-2)',
            border: '1px solid transparent',
        },
        container: {
            height: '0rem',
            padding: '0 .5rem 0rem',
        },
    }

    const hoverContainerStyle: ContainerStyle = {
        kitContainer: {
            backgroundColor: 'var(--gray-2)',
            border: '1px solid var(--complementar-text)',
        },
        container: {
            height: '0rem',
            padding: '0 .5rem 0rem',
        },
    }

    const openContainerStyle: ContainerStyle = {
        kitContainer: {
            backgroundColor: 'var(--gray-2)',
            border: '1px solid var(--complementar-text)',
        },
        container: {
            height: '17rem',
            padding: '0 .5rem .5rem',
        },
    }

    const [ containerStyle, setContainerStyle ] = useState<ContainerStyle>(closedContainerStyle)
    const [ totalPrice, setTotalPrice ] = useState<number>(0)
    const [ stock, setStock ] = useState<number>(0)
    const [ calculating, setCalculating ] = useState<boolean>(false)
    function onHoverContainer(enter: boolean){
        if(props.selectedContainer != props.index){
            if(enter){
                setContainerStyle(hoverContainerStyle)
            } else {
                setContainerStyle(closedContainerStyle)
            }
        }
    }

    function handlePriceRule(value: string){
        if(value == 'igual da loja'){
            props.setKitRules({...props.kitRules, price_rule: 1})
        }

        if(value == 'desconto'){
            props.setKitRules({...props.kitRules, price_rule: 2})
        }
    }

    function handleDiscountType(type: string){
        if(type == 'porcentagem'){
            props.setKitRules({...props.kitRules, discount_type: '%'})
        }

        if(type == 'reais'){
            props.setKitRules({...props.kitRules, discount_type: '$'})
        }
    }

    useEffect(() => {

        if(props.selectedContainer == props.index){
            setContainerStyle(openContainerStyle)
        } else {
            setContainerStyle(closedContainerStyle)
        }

    }, [props.selectedContainer])

    useEffect(() => {

        if(verifyErrorInput(`kit${props.kitRules.quantity}Name`) ||
           verifyErrorInput(`kit${props.kitRules.quantity}Description`)
        ){
            props.setSelectedContainer(props.index)            
        }

    }, [errorsList])

    useEffect(() => {
        
        setCalculating(true)

        const price = mundialPricing.promotionalPrice > 0? mundialPricing.promotionalPrice : mundialPricing.price
        const quantity = props.kitRules.quantity

        if (props.kitRules.price_rule == 1) {
            setTotalPrice( price * quantity )
        }

        if (props.kitRules.price_rule == 2) {

            if (props.kitRules.discount_type == '%') {
                setTotalPrice(( price * quantity) * ( 1 - (props.kitRules.discount_value / 100 )))
            }

            if (props.kitRules.discount_type == '$') {
                setTotalPrice(( price * quantity ) - props.kitRules.discount_value)
            }
        }

        setStock(Math.floor(mundialPricing.stock/quantity))

        setTimeout(() => {
            setCalculating(false)
        }, 450)

    }, [props.kitRules, mundialPricing])

    useEffect(() => {
        const kitName = unitaryDetails.name.toUpperCase().replace("PNEU", `KIT ${props.kitRules.quantity} PNEUS`)
        props.setKitDetails({
            ...props.kitDetails,
            name: kitName,
            description: titleize(kitName)
        })

    }, [unitaryDetails.name, unitaryDetails.description])

    return (
        <div
        className={styles.wrapper}
        style={containerStyle.kitContainer}
        onMouseEnter={() => onHoverContainer(true)}
        onMouseLeave={() => onHoverContainer(false)}
        >
            <span
            className={styles.header}
            onClick={() => {
                if (props.selectedContainer == props.index){
                    props.setSelectedContainer(-1)
                } else {
                    props.setSelectedContainer(props.index)
                }
            }}
            >
                {props.header}
            </span>
            <div
            className={styles.container}
            style={containerStyle.container}
            >
                <div
                className={styles.containerInfo}
                >
                    <DefaultTextInput
                    label='nome'
                    name='name'
                    value={props.kitDetails.name}
                    border={verifyErrorInput(`kit${props.kitRules.quantity}Name`)? '1px solid #E01D10' : undefined}
                    onChange={(e) => {
                        props.setKitDetails({
                            ...props.kitDetails,
                            name: e.target.value
                        })
                    }}
                    />
                    <div
                    className={styles.inputRow}
                    >
                        <DefaultSelectorInput
                        label='regra de preço'
                        optionList={['igual da loja','desconto']}
                        value={`${props.kitRules.price_rule == 1? 'igual da loja' : 'desconto' }`}
                        onChange={handlePriceRule}
                        hideSelectedOption={true}
                        />
                        <DefaultSelectorInput
                        label='desconto em'
                        optionList={['porcentagem','reais']}
                        value={`${props.kitRules.discount_type == '%'? 'porcentagem' : 'reais' }`}
                        onChange={handleDiscountType}
                        hideSelectedOption={true}
                        visibility={props.kitRules.price_rule == 1? 'hidden' : 'visible' }
                        />
                        <DefaultTextInput 
                        label='desconto'
                        name='discount_value'
                        value={floatToPrice(props.kitRules.discount_value)}
                        onChange={(e) => {
                            props.setKitRules({
                                ...props.kitRules, discount_value: priceToFloat(e.target.value)
                            })
                        }}
                        visibility={props.kitRules.price_rule == 1? 'hidden' : 'visible' }
                        />
                    </div>
                    <div
                    className={styles.inputRow}
                    >
                        <DefaultTextInput 
                        readOnly={true}
                        loading={calculating}
                        label='preço do kit'
                        name='kitPrice'
                        value={floatToPrice(totalPrice)}
                        textAlign='center'
                        />
                        <DefaultTextInput 
                        readOnly={true}
                        loading={calculating}
                        label='estoque do kit'
                        name='kitStock'
                        value={stock.toString()}
                        textAlign='center'
                        />
                    </div>
                    <DefaultTextAreaInput
                    label='descrição'
                    name='description'
                    value={props.kitDetails.description}
                    height='4rem'
                    border={verifyErrorInput(`kit${props.kitRules.quantity}Description`)? '1px solid #E01D10' : undefined}
                    onChange={(e) => {
                        props.setKitDetails({
                            ...props.kitDetails,
                            description: e.target.value
                        })
                    }}
                    />
                    <ImageGallery
                    values={props.kitDetails}
                    setValues={props.setKitDetails}
                    />
                </div>
            </div>
        </div>
    )
}