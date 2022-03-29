import { useEffect, useState } from 'react'
import styles from './styles.module.scss'

type Offer = {
    name: string;
    store: string;
    function: string | null;
    lock: boolean;
    id: number | null,
    success: boolean | null,
}

type Props = {
    offer: Offer
    setOffer(offer: Offer): void;
    creating: boolean;
    created: boolean;
}

type ContainerStyle = {
    backgroundColor: string,
    color: string,
    border: string
}

type OfferFunction = {
    name: string,
    label: string
}

export default function OfferContainer(props: Props){

    const selectedContainerStyle = {
        backgroundColor: 'var(--gray-5)',
        color: 'var(--complementar-text)',
        border: '1px solid transparent'
    }

    const deselectedContainerStyle = {
        backgroundColor: 'var(--gray-3)',
        color: 'var(--complementar-text)',
        border: '1px solid transparent'
    }

    const offersFunctions: OfferFunction[] = [
        { name: 'delete', label: 'excluir'},
        { name: 'edit', label: 'editar'},
        { name: 'create', label: 'criar'},
    ]

    const [ containerStyle, setContainerStyle ] = useState<ContainerStyle>(selectedContainerStyle)
    const [ functionList, setFunctionList ] = useState<OfferFunction[]>([])

    useEffect(() => {

        if(props.offer.function == null){
            setContainerStyle(deselectedContainerStyle)
        } else {
            setContainerStyle(selectedContainerStyle)
        }

        const availableFunctions: OfferFunction[] = []
        offersFunctions.map( offerFunction => {

        })

    }, [props.offer.function])

    useEffect(() => {

        if(!props.creating && props.offer.id != null){
            const availableFunctions: OfferFunction[] = []
            offersFunctions.map( offerFunction => {
                if(props.offer.lock){
                    if(offerFunction.name == props.offer.function){
                        availableFunctions.push(offerFunction)
                    }
                } else {
                    if(props.offer.id > 0){
                        if(offerFunction.name == 'delete'){
                            availableFunctions.push(offerFunction)
                        }
                        if(offerFunction.name == 'edit'){
                            availableFunctions.push(offerFunction)
                        }
                    } else {
                        if(offerFunction.name == 'create'){
                            availableFunctions.push(offerFunction)
                        }
                    }
                }
            })
            setFunctionList(availableFunctions)
        }

    }, [props.offer.id])

    function apiLoadingStyle(offer: Offer){
        if((props.creating && offer.function != null) || props.created){
            if(offer.success == false){
                return (
                    <span className="material-icons-round"
                    id={styles.successIcon}
                    style={{ color: '#E83C3C' }}
                    >
                        highlight_off
                    </span>
                )
            }

            if(offer.success == null){
                return (
                    <span
                    className="material-icons-round"
                    id={styles.loadingIcon}
                    >
                        autorenew
                    </span>
                )
            }

            if(offer.success){
                return (
                    <span className="material-icons-round"
                    id={styles.successIcon}
                    style={{ color: '#00D848' }}
                    >
                        task_alt
                    </span>
                )
            }


        } else {
            return <></>
        }
    }

    return (
        <div
        className={styles.wrapper}
        style={{...containerStyle, cursor: `${props.offer.lock? 'default' : 'pointer' }`}}
        >
            <span
            key={0}
            className={styles.name}
            style={{ color: `${containerStyle.color}` }}
            >
                {props.offer.name} - {props.offer.store} 
            </span>
            <div
            className={styles.functionSelector}
            >
                {functionList.map((offerFunction, index) => {
                    return (
                        <span
                        key={index}
                        style={{
                            color: `${props.offer.function == offerFunction.name?
                                'var(--complementar-text)' : 'var(--gray-line)'}`,
                            cursor: `${props.offer.lock? 'default' : 'pointer' }`
                        }}
                        onClick={() => {
                            if(props.offer.lock){
                                return
                            }
                            if(props.offer.function == offerFunction.name){
                                props.setOffer({
                                    ...props.offer, function: null
                                })
                            } else {
                                props.setOffer({
                                    ...props.offer, function: offerFunction.name
                                })
                            }
                        }}
                        >
                            {offerFunction.label}
                        </span>
                    )
                })}
            </div>
            <div
            className={styles.result}
            >
                {apiLoadingStyle(props.offer)}
            </div>
        </div>
    )
}