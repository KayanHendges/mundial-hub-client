import { useContext, useEffect, useState } from 'react'
import { AlertContext } from '../../../../contexts/AlertContext'
import { NewProductContext } from '../../../../contexts/NewProductContext'
import { api } from '../../../../services/api'
import CreateFunction from '../CreateFunction'
import styles from './styles.module.scss'

type Props = {
}

type Styles = {
    wrapper: {
        display: string;
        backgroundColor: string;
    },
    container: {
        padding: string;
        height: string;
    }
}

type Offer = {
    name: string;
    store: string;
    create: boolean;
    lock: boolean;
    id: number,
    success: false,
}

type UnitaryPostApi = {
    is_kit: number;
    ean: string;
    ncm: string;
    product_name: string;
    description: string;
    brand: string;
    model: string;
    weight: number;
    length: number;
    width: number;
    height: number;
    main_category_id: number;
    related_categories: number[];
    available: number;
    release_date?: Date;
    availability: string;
    availabilityDays: number;
    reference: string;
    images: {imageUrl: string}[]
    warranty: string;
    comments: string;
}

type PricingPostApi = {
    tray_product_id: number;
    cost: number,
    profit: number,
    price: number,
    hub_id: number;
    promotional_price: number,
    start_promotion: Date | string,
    end_promotion: Date | string,
    stock: number,
    main_category_id: number;
    related_categories: number[];
}

export default function OffersPopUp(props: Props){

    const { 
        submit, setSubmit,
        validate, errorsList,
        setSelectedTab
    } = useContext(NewProductContext)

    const { setAddAlert } = useContext(AlertContext)

    const closeStyle = {
        wrapper: {
            display: 'none',
            backgroundColor: 'transparent'
        },
        container: {
            padding: '0rem',
            height: '0rem'
        }
    }

    const initStyle = {
        wrapper: {
            display: 'flex',
            backgroundColor: 'transparent'
        },
        container: {
            padding: '0rem',
            height: '0rem'
        }
    }
    
    const openStyle = {
        wrapper: {
            display: 'flex',
            backgroundColor: 'rgba(0, 0, 0, 0.377)',
        },
        container: {
            padding: '.5rem',
            height: '25rem'
        }
    }

    const gridList = '2rem 1fr 4rem'

    const [ popUpStyles, setPopUpStyles ] = useState<Styles>(closeStyle)

    const [ hubOffers, setHubOffers ] = useState<Offer[]>([
        {
            name: 'unitário',
            store: 'mundial',
            create: true,
            lock: true,
            id: -1,
            success: false,
        },
        {
            name: 'unitário',
            store: 'scpneus',
            create: true,
            lock: true,
            id: -1,
            success: false,
        },
        {
            name: 'kit 2',
            store: 'mundial',
            create: true,
            lock: false,
            id: -1,
            success: false,
        },
        {
            name: 'kit 4',
            store: 'mundial',
            create: true,
            lock: false,
            id: -1,
            success: false,
        },
    ])

    const [ trayOffers, setTrayOffers ] = useState<Offer[]>([
        {
            name: 'unitário',
            store: 'mundial',
            create: true,
            lock: false,
            id: -1,
            success: false,
        },
        {
            name: 'unitário',
            store: 'scpneus',
            create: true,
            lock: false,
            id: -1,
            success: false,
        },
        {
            name: 'kit 2',
            store: 'mundial',
            create: true,
            lock: false,
            id: -1,
            success: false,
        },
        {
            name: 'kit 4',
            store: 'mundial',
            create: true,
            lock: false,
            id: -1,
            success: false,
        },
    ])

    const [ creating, setCreating ] = useState<boolean>(false)

    useEffect(() => {
        if(submit){
            setPopUpStyles(initStyle)

            setTimeout(() => {
                setPopUpStyles(openStyle)
            }, 0)

        } else {
            setPopUpStyles(closeStyle)
        }
    }, [submit])
 


    function handleHubCreate(offer: Offer){
        const newList = hubOffers.map((offerMapped, index) => {
            if(offerMapped == offer && !offer.lock){
                if(offerMapped.create){
                    disableTrayOffer(offerMapped)
                }
                return {...offerMapped, create: !offerMapped.create}
            } else {
                return offerMapped
            }
        })
        setHubOffers(newList)
    }

    function handleTrayCreate(offer: Offer){
        const newList: Offer[] = [] 
        
        trayOffers.map(offerMapped => {
            if(offerMapped == offer && !offer.lock){
                hubOffers.map(hubOffer => {
                    if(hubOffer.name == offerMapped.name && hubOffer.store == offerMapped.store){
                        if(!hubOffer.create){
                            newList.push({...offerMapped, create: false})
                        } else {
                            newList.push({...offerMapped, create: !offerMapped.create})
                        }
                    }
                })
            } else {
                newList.push(offerMapped)
            }
        })
        setTrayOffers(newList)
    }

    function disableTrayOffer(hubOffer: Offer){
        const newList = trayOffers.map((trayOffer, index) => {
            if(trayOffer.name == hubOffer.name && trayOffer.store == hubOffer.store){
               return {...trayOffer, create: false}
            } else {
                return trayOffer
            }
        })
        setTrayOffers(newList)
    }

    function checkBoxIcon(offer: Offer): string {
        if(offer.lock){
            return 'lock'
        }
        if(offer.create){
            return 'radio_button_checked'
        }
        if(!offer.create){
            return 'radio_button_unchecked'
        }
    }

    function apiLoadingStyle(offer: Offer){
        if(creating && offer.create){
            if(!offer.create){
                return ( <span></span> )
            }
            if(offer.id == 0){
                return (
                    <span className="material-icons-round"
                    id={styles.successIcon}
                    style={{ color: '#E83C3C' }}
                    >
                        highlight_off
                    </span>
                )
            }

            if(offer.id == -1){
                return (
                    <span
                    className="material-icons-round"
                    id={styles.loadingIcon}
                    >
                        autorenew
                    </span>
                )
            }

            if(offer.id > 0){
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

    async function handleSubmit(){
        const errors = validate(hubOffers)

        if( errors.length > 0 ){
            setSubmit(false)
            setAddAlert({
                alertType: 'error',
                message: errors[0].message,
                milliseconds: 2000
            })
            setSelectedTab(errors[0].tab)
            return
        } 
        
        if(!creating){
            setCreating(false)
            setTimeout(() => {
                setCreating(true)
            }, 100)
        } else {
            setCreating(true) // CreateFunction aguardando com useEffect para iniciar função
        }

    }    

    return (
        <div
        className={styles.wrapper}
        style={popUpStyles.wrapper}
        >
            <div
            className={styles.container}
            style={popUpStyles.container}
            >
                <CreateFunction 
                hubOffers={hubOffers}
                setHubOffers={setHubOffers}
                trayOffers={trayOffers}
                setTrayOffers={setTrayOffers}
                creating={creating}
                setCreating={setCreating}
                />
                <span
                className={styles.header}
                >
                    Anúncios
                </span>
                <div
                className={styles.offersContainer}
                >
                    <div
                    className={styles.offersList}
                    >
                        <div
                        className={styles.tab}
                        >
                            hub
                        </div>
                        {hubOffers.map( (offer, index) => {
                            return (
                                <div
                                className={styles.offer}
                                style={{
                                    gridTemplateColumns: gridList,
                                    backgroundColor: `${offer.create? 'var(--gray-4)' : 'var(--gray-3)' }`,
                                    border: `${offer.create? '1px solid var(--gray-line)' : '1px solid transparent' }`
                                }}
                                key={index}
                                onClick={() => handleHubCreate(offer)}
                                >
                                    <span
                                    className={styles.offerCollum}
                                    >
                                        <span className="material-icons-round"
                                        id={styles.unchecked}
                                        >
                                            {checkBoxIcon(offer)}
                                        </span>
                                    </span>
                                    <span
                                    className={styles.offerCollum}
                                    style={{ 
                                        justifyContent: 'flex-start',
                                        paddingLeft: '.2rem'
                                    }}
                                    >
                                        {`${offer.name} - ${offer.store}`}
                                    </span>
                                    <span
                                    className={styles.offerCollum}
                                    >
                                        {apiLoadingStyle(offer)}
                                    </span>
                                </div>
                            )
                        })}
                        <div
                        className={styles.tab}
                        >
                            tray
                        </div>
                        {trayOffers.map( (offer, index) => {
                            return (
                                <div
                                className={styles.offer}
                                style={{
                                    gridTemplateColumns: gridList,
                                    backgroundColor: `${offer.create? 'var(--gray-4)' : 'var(--gray-3)' }`,
                                    border: `${offer.create? '1px solid var(--gray-line)' : '1px solid transparent' }`
                                }}
                                key={index}
                                onClick={() => handleTrayCreate(offer)}
                                >
                                    <span
                                    className={styles.offerCollum}
                                    >
                                        <span className="material-icons-round"
                                        id={styles.unchecked}
                                        >
                                            {checkBoxIcon(offer)}
                                        </span>
                                    </span>
                                    <span
                                    className={styles.offerCollum}
                                    style={{ 
                                        justifyContent: 'flex-start',
                                        paddingLeft: '.2rem'
                                    }}
                                    >
                                        {`${offer.name} - ${offer.store}`}
                                    </span>
                                    <span
                                    className={styles.offerCollum}
                                    >
                                        {apiLoadingStyle(offer)}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div
                className={styles.footer}
                >
                    <span
                    className={styles.close}
                    onClick={() => setSubmit(false)}
                    >
                        fechar
                    </span>
                    <span
                    className={styles.submit}
                    onClick={() => handleSubmit()}
                    >
                        {`${creating? 'criando' : 'criar'}`}
                    </span>
                </div>
            </div>
        </div>
    )
}