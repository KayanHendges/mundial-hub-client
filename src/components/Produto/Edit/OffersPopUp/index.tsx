import router from 'next/router'
import { useContext, useEffect, useState } from 'react'
import { AlertContext } from '../../../../contexts/AlertContext'
import { NewProductContext } from '../../../../contexts/NewProductContext'
import { ProductContext } from '../../../../contexts/ProductContext'
import { api } from '../../../../services/api'
import SaveFunction from '../SaveFunction'
import CreateFunction from '../SaveFunction'
import OfferContainer from './OfferContainer'
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
    function: string | null;
    lock: boolean;
    id: number | null,
    success: boolean | null,
}

export default function OffersPopUp(props: Props){

    const { 
        unitaryDetails, kit2Details, kit4Details,
        mundialPricing, scpneusPricing,
        submit, setSubmit,
        validate, errorsList,
        setSelectedTab
    } = useContext(ProductContext)

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
            height: '31rem'
        }
    }

    const [ popUpStyles, setPopUpStyles ] = useState<Styles>(closeStyle)

    const [ creating, setCreating ] = useState<boolean>(false)
    const [ created, setCreated ] = useState<boolean>(false)

    const [ offerUnitaryMundial, setOfferUnitaryMundial ] = useState<Offer>({
        name: 'unitário',
        store: 'mundial',
        function: 'edit',
        lock: true,
        id: null,
        success: null,
    })

    const [ offerUnitaryScpneus, setOfferUnitaryScpneus ] = useState<Offer>({
        name: 'unitário',
        store: 'scpneus',
        function: 'edit',
        lock: true,
        id: null,
        success: null,
    })

    const [ offerKit2Mundial, setOfferKit2Mundial ] = useState<Offer>({
        name: 'kit2',
        store: 'mundial',
        function: null,
        lock: false,
        id: null,
        success: null,
    })

    const [ offerKit4Mundial, setOfferKit4Mundial ] = useState<Offer>({
        name: 'kit4',
        store: 'mundial',
        function: null,
        lock: false,
        id: null,
        success: null,
    })

    const [ offerUnitaryMundialTray, setOfferUnitaryMundialTray ] = useState<Offer>({
        name: 'unitário',
        store: 'mundial',
        function: null,
        lock: false,
        id: null,
        success: null,
    })

    const [ offerUnitaryScpneusTray, setOfferUnitaryScpneusTray ] = useState<Offer>({
        name: 'unitário',
        store: 'scpneus',
        function: null,
        lock: false,
        id: null,
        success: null,
    })

    const [ offerKit2MundialTray, setOfferKit2MundialTray ] = useState<Offer>({
        name: 'kit2',
        store: 'mundial',
        function: null,
        lock: false,
        id: null,
        success: null,
    })

    const [ offerKit4MundialTray, setOfferKit4MundialTray ] = useState<Offer>({
        name: 'kit4',
        store: 'mundial',
        function: null,
        lock: false,
        id: null,
        success: null,
    })

    useEffect(() => {
    }, [])
    SaveFunction({
        created,
        setCreated,
        creating,
        setCreating,
        offerUnitaryMundial,
        setOfferUnitaryMundial,
        offerUnitaryScpneus,
        setOfferUnitaryScpneus,
        offerUnitaryKit2: offerKit2Mundial,
        setOfferUnitaryKit2: setOfferKit2Mundial,
        offerUnitaryKit4: offerKit4Mundial,
        setOfferUnitaryKit4: setOfferKit4Mundial,
        offerUnitaryMundialTray,
        setOfferUnitaryMundialTray,
        offerUnitaryScpneusTray,
        setOfferUnitaryScpneusTray,
        offerUnitaryKit2Tray: offerKit2MundialTray,
        setOfferUnitaryKit2Tray: setOfferKit2MundialTray,
        offerUnitaryKit4Tray: offerKit4MundialTray,
        setOfferUnitaryKit4Tray: setOfferKit4MundialTray,
    })

    useEffect(() => {
        if(creating){
            return
        }
        if(unitaryDetails.hub_id != null){
            setOfferUnitaryMundial({...offerUnitaryMundial, id: unitaryDetails.hub_id})
            setOfferUnitaryScpneus({...offerUnitaryScpneus, id: unitaryDetails.hub_id})            
        }

    }, [unitaryDetails.hub_id])

    useEffect(() => {
        if(creating){
            return
        }
        if(kit2Details.hub_id > 0){
            setOfferKit2Mundial({
                ...offerKit2Mundial,
                function: 'edit',
                id: kit2Details.hub_id,
            })
        }
        if(kit2Details.hub_id == 0){
            setOfferKit2Mundial({
                ...offerKit2Mundial,
                id: 0,
            })
        }
    }, [kit2Details.hub_id])

    useEffect(() => {
        if(creating){
            return
        }
        if(kit4Details.hub_id > 0){
            setOfferKit4Mundial({
                ...offerKit4Mundial,
                function: 'edit',
                id: kit4Details.hub_id,
            })
        }
        if(kit4Details.hub_id == 0){
            setOfferKit4Mundial({
                ...offerKit4Mundial,
                id: 0,
            })
        }
    }, [kit4Details.hub_id])

    useEffect(() => {
        if(creating){
            return
        }
        if(mundialPricing.tray_product_id > 0){
            setOfferUnitaryMundialTray({
                ...offerUnitaryMundialTray,
                function: 'edit',
                id: mundialPricing.tray_product_id,
            })
        }
        if(mundialPricing.tray_product_id == 0){
            setOfferUnitaryMundialTray({
                ...offerUnitaryMundialTray,
                id: 0,
            })
        }
    }, [mundialPricing.tray_product_id])

    useEffect(() => {
        if(scpneusPricing.tray_product_id > 0){
            setOfferUnitaryScpneusTray({
                ...offerUnitaryScpneusTray,
                function: 'edit',
                id: scpneusPricing.tray_product_id,
            })
        }
        if(scpneusPricing.tray_product_id == 0){
            setOfferUnitaryScpneusTray({
                ...offerUnitaryScpneusTray,
                id: 0,
            })
        }
    }, [scpneusPricing.tray_product_id])

    useEffect(() => {
        if(creating){
            return
        }
        if(kit2Details.tray_product_id > 0){
            setOfferKit2MundialTray({
                ...offerKit2MundialTray,
                function: 'edit',
                id: kit2Details.tray_product_id,
            })
        }
        if(kit2Details.tray_product_id == 0){
            setOfferKit2MundialTray({
                ...offerKit2MundialTray,
                id: 0,
            })
        }
    }, [kit2Details.tray_product_id])

    useEffect(() => {
        if(creating){
            return
        }
        if(kit4Details.tray_product_id > 0){
            setOfferKit4MundialTray({
                ...offerKit4MundialTray,
                function: 'edit',
                id: kit4Details.tray_product_id,
            })
        }
        if(kit4Details.tray_product_id == 0){
            setOfferKit4MundialTray({
                ...offerKit4MundialTray,
                id: 0,
            })
        }
    }, [kit4Details.tray_product_id])

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
 
    useEffect(() => {
        if(creating){
            return
        }
        if(offerUnitaryMundialTray.function == 'delete' && unitaryDetails.hub_id != null){
            setOfferKit2MundialTray({
                ...offerKit2MundialTray,
                function: null,
                lock: true
            })
            setOfferKit4MundialTray({
                ...offerKit4MundialTray,
                function: null,
                lock: true
            })
        } else {
            if(offerKit2Mundial.function != 'delete'){
                setOfferKit2MundialTray({
                    ...offerKit2MundialTray,
                    lock: false
                })
            }
            if(offerKit4Mundial.function != 'delete'){
                setOfferKit4MundialTray({
                    ...offerKit4MundialTray,
                    lock: false
                })
            }

        }

    }, [offerUnitaryMundialTray.function])

    useEffect(() => {
        if(creating){
            return
        }
        if(offerKit2Mundial.function == 'delete' && kit2Details.hub_id != undefined){
            setOfferKit2MundialTray({
                ...offerKit2MundialTray,
                function: null,
                lock: true
            })
        } else {
            if(offerUnitaryMundialTray.function != 'delete') {
                setOfferKit2MundialTray({
                    ...offerKit2MundialTray,
                    lock: false
                })
            }
        }
    }, [offerKit2Mundial.function])

    useEffect(() => {
        if(creating){
            return
        }
        if(offerKit4Mundial.function == 'delete' && kit4Details.hub_id != undefined){
            setOfferKit4MundialTray({
                ...offerKit4MundialTray,
                function: null,
                lock: true
            })
        } else {
            if(offerUnitaryMundialTray.function != 'delete') {
                setOfferKit4MundialTray({
                    ...offerKit4MundialTray,
                    lock: false
                })
            }
        }
    }, [offerKit4Mundial.function])

    async function handleSubmit(){
        const errors = validate([offerUnitaryMundial])

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
                        <OfferContainer
                        key={0}
                        creating={creating} 
                        created={created}
                        offer={offerUnitaryMundial}
                        setOffer={setOfferUnitaryMundial}
                        />
                        <OfferContainer
                        key={1}
                        creating={creating} 
                        created={created}
                        offer={offerUnitaryScpneus}
                        setOffer={setOfferUnitaryScpneus}
                        />
                        <OfferContainer
                        key={2}
                        creating={creating} 
                        created={created}
                        offer={offerKit2Mundial}
                        setOffer={setOfferKit2Mundial}
                        />
                        <OfferContainer
                        key={3}
                        creating={creating} 
                        created={created}
                        offer={offerKit4Mundial}
                        setOffer={setOfferKit4Mundial}
                        />
                        <div
                        className={styles.tab}
                        >
                            tray
                        </div>
                        <OfferContainer
                        key={4}
                        creating={creating} 
                        created={created}
                        offer={offerUnitaryMundialTray}
                        setOffer={setOfferUnitaryMundialTray}
                        />
                        <OfferContainer
                        key={5}
                        creating={creating} 
                        created={created}
                        offer={offerUnitaryScpneusTray}
                        setOffer={setOfferUnitaryScpneusTray}
                        />
                        <OfferContainer
                        key={6}
                        creating={creating} 
                        created={created}
                        offer={offerKit2MundialTray}
                        setOffer={setOfferKit2MundialTray}
                        />
                        <OfferContainer
                        key={7}
                        creating={creating} 
                        created={created}
                        offer={offerKit4MundialTray}
                        setOffer={setOfferKit4MundialTray}
                        />
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
                    onClick={() => {
                        if(created){
                            router.back()
                        } else {
                            handleSubmit()
                        }
                    }}
                    >
                        {`${creating? 'salvando' : created? 'voltar aos produtos' : 'salvar' }`}
                    </span>
                </div>
            </div>
        </div>
    )
}