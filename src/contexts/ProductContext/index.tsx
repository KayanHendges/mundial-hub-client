import { differenceInDays, format, parseISO } from "date-fns";
import router, { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../../services/api";
import { AlertContext } from "../AlertContext";

interface IUnitaryDetails {
    hub_id: number | null;
    reference: string;
    name: string;
    description: string;
    brand: string;
    model: string;
    ean: string;
    ncm: string;
    weight: number;
    length: number;
    width: number;
    height: number;
    main_category_id: number;
    related_categories: number[];
    available: number;
    availability: string;
    availability_days: number;
    comments: string;
    warranty: string;
    images: {imageUrl: string}[]
    creation: Date | null;
}

export interface IKitDetails {
    hub_id: number | null;
    tray_product_id: number | null;
    name: string;
    description: string;
    images: {imageUrl: string}[]
}

export interface IPricing {
    tray_pricing_id: number | null;
    tray_product_id: number;
    cost_price: number;
    profit: number;
    price: number;
    stock: number;
    promotionalPrice: number;
    startPromotion: Date;
    endPromotion: Date;
    modified: Date | null;
}

export interface IKitRules {
    discount_type: string;
    discount_value: number;
    price_rule: number;
    quantity: number;
}

interface ChangedList {
    details: boolean,
    pricing: boolean,
    images: boolean,
}

type ProductContextType = {
    unitaryDetails: IUnitaryDetails;
    setUnitaryDetails(unitaryDetails: IUnitaryDetails): void;
    mundialPricing: IPricing;
    setMundialPricing(mundialPricing: IPricing): void;
    scpneusPricing: IPricing;
    setScpneusPricing(scpneusPricing: IPricing): void;
    kit2Details: IKitDetails;
    setKit2Details(kit2Details: IKitDetails): void;
    kit4Details: IKitDetails;
    setKit4Details(kit4Details: IKitDetails): void;
    kit2Rules: IKitRules;
    setKit2Rules(kit2Rules: IKitRules): void;
    kit4Rules: IKitRules;
    setKit4Rules(kit4Rules: IKitRules): void;
    selectedTab: number;
    setSelectedTab(selectedTab: number): void;
    submit: boolean;
    setSubmit(submit: boolean): void;
    errorsList: Error[];
    setErrorsList(erros: Error[]): void; 
    validate(Offers: Offer[]): Error[];
    verifyErrorInput(value: string): boolean;
}

type Offer = {
    name: string;
    store: string;
    function: string | null;
    lock: boolean;
    id: number | null,
    success: boolean | null,
}

type Error = {
    tab: number;
    message: string;
    value: string;
}

export const ProductContext =  createContext({} as ProductContextType)

export function ProductProvider ({ children })  {

    const { setAddAlert } = useContext(AlertContext)

    const [ unitaryDetails, setUnitaryDetails ] = useState<IUnitaryDetails>({
        hub_id: null,
        reference: '',
        name: '',
        description: '',
        brand: '',
        model: '',
        ean: '',
        ncm: '4011.10.00',
        weight: 0,
        length: 0,
        width: 0,
        height: 0,
        main_category_id: 0,
        related_categories: [],
        available: 1,
        availability: 'imediata',
        availability_days: 0,
        comments: '',
        warranty: '5 anos da data de fabricação',
        images: [
            {imageUrl: ''},
            {imageUrl: ''},
            {imageUrl: ''},
            {imageUrl: ''},
            {imageUrl: ''},
            {imageUrl: ''}
        ],
        creation: null
    })

    const [ mundialPricing, setMundialPricing ] = useState<IPricing>({
        tray_pricing_id: null,
        tray_product_id: null,
        cost_price: 0,
        profit: 0,
        price: 0,
        stock: 0,
        promotionalPrice: 0,
        startPromotion: new Date(),
        endPromotion: new Date(),
        modified: null,
    })

    const [ scpneusPricing, setScpneusPricing ] = useState<IPricing>({
        tray_pricing_id: null,
        tray_product_id: null,
        cost_price: 0,
        profit: 0,
        price: 0,
        stock: 0,
        promotionalPrice: 0,
        startPromotion: new Date(),
        endPromotion: new Date(),
        modified: null,
    })

    const [ kit2Details, setKit2Details ] = useState<IKitDetails>({
        hub_id: null,
        tray_product_id: null,
        name: '',
        description: '',
        images: [
            {imageUrl: ''},
            {imageUrl: ''},
            {imageUrl: ''},
            {imageUrl: ''},
            {imageUrl: ''},
            {imageUrl: ''}
        ]
    })

    const [ kit4Details, setKit4Details ] = useState<IKitDetails>({
        hub_id: null,
        tray_product_id: null,
        name: '',
        description: '',
        images: [
            {imageUrl: ''},
            {imageUrl: ''},
            {imageUrl: ''},
            {imageUrl: ''},
            {imageUrl: ''},
            {imageUrl: ''}
        ]
    })

    const [ kit2Rules, setKit2Rules ] = useState<IKitRules>({
        discount_type: '%',
        discount_value: 2.5,
        price_rule: 2,
        quantity: 2
    })

    const [ kit4Rules, setKit4Rules ] = useState<IKitRules>({
        discount_type: '%',
        discount_value: 5,
        price_rule: 2,
        quantity: 4
    })

    const [ selectedTab, setSelectedTab ] = useState<number>()

    const [ changedList, setChangedList ] = useState<ChangedList>({
        details: false,
        pricing: false,
        images: false
    })

    const [ firstKit4changed, setFirstKit4changed ] = useState<boolean>(false)

    const [ submit, setSubmit ] = useState<boolean>(false)

    const [ errorsList, setErrorsList ] = useState<Error[]>([])
    

    useEffect(() => {

        getData()

    }, [])

    useEffect(() => {
        if(unitaryDetails.hub_id != null && kit2Details.hub_id != null && kit4Details.hub_id != null){
            setChangedList({
                ...changedList,
                pricing: true
            })
        }
    }, [
        mundialPricing, scpneusPricing,
        kit2Rules.quantity,
        kit2Rules.discount_type,
        kit2Rules.discount_value,
        kit2Rules.price_rule,
        kit4Rules.quantity,
        kit4Rules.discount_type,
        kit4Rules.discount_value,
        kit4Rules.price_rule
    ])

    useEffect(() => {
        if(unitaryDetails.hub_id != null && kit2Details.hub_id != null && kit4Details.hub_id != null){
            setChangedList({
                ...changedList,
                details: true
            })
        }
    }, [
        unitaryDetails,
        kit2Details.name,
        kit2Details.description,
        kit4Details.name,
        kit4Details.description
    ])

    useEffect(() => {
        if(unitaryDetails.hub_id != null && kit2Details.hub_id != null && kit4Details.hub_id != null){
            if(!firstKit4changed){
                setFirstKit4changed(true)
            } else {
                setChangedList({
                    ...changedList,
                    images: true
                })
            }
        }
    }, [
        unitaryDetails.images,
        kit2Details.images[0].imageUrl,
        kit4Details.images[0].imageUrl
    ])

    async function getData(){
        return new Promise(async(resolve) => {

            const reference = router.router.query.editProduct

            api.get(`/products/unitary/${reference}`)
            .then(response => {
                const details = response.data.details
                setUnitaryDetails({
                    hub_id: details.hub_id,
                    reference: details.reference,
                    name: details.product_name,
                    description: details.product_description,
                    brand: details.brand,
                    model: details.model,
                    ean: details.ean,
                    ncm: details.ncm,
                    weight: details.weight,
                    length: details.length,
                    width: details.width,
                    height: details.height,
                    main_category_id: details.main_category_id,
                    related_categories: details.related_categories,
                    available: details.available,
                    availability: details.availability,
                    availability_days: details.availability_days,
                    comments: details.comments? details.comments : '',
                    warranty: details.warranty? details.warranty : '5 anos da data de fabricação',
                    images: [
                        {imageUrl: details.picture_source_1},
                        {imageUrl: details.picture_source_2},
                        {imageUrl: details.picture_source_3},
                        {imageUrl: details.picture_source_4},
                        {imageUrl: details.picture_source_5},
                        {imageUrl: details.picture_source_6}
                    ],
                    creation: details.creation_date
                })

                var gotMundialPricing = false
                var gotScpneusPricing = false

                response.data.pricing?.map(pricing => {
                    if(pricing.tray_store_id == 668385){
                        setMundialPricing({
                            tray_pricing_id: pricing.tray_pricing_id,
                            tray_product_id: pricing.tray_product_id,
                            cost_price: pricing.cost_price,
                            profit: pricing.profit,
                            price: pricing.tray_price,
                            stock: pricing.tray_stock,
                            promotionalPrice: pricing.tray_promotional_price,
                            startPromotion: parseISO(pricing.start_promotion),
                            endPromotion: parseISO(pricing.end_promotion),
                            modified: pricing.modified,
                        })
                        gotMundialPricing = true
                    }
                    if(pricing.tray_store_id == 1049898){
                        setScpneusPricing({
                            tray_pricing_id: pricing.tray_pricing_id,
                            tray_product_id: pricing.tray_product_id,
                            cost_price: pricing.cost_price,
                            profit: pricing.profit,
                            price: pricing.tray_price,
                            stock: pricing.tray_stock,
                            promotionalPrice: pricing.tray_promotional_price,
                            startPromotion: parseISO(pricing.start_promotion),
                            endPromotion: parseISO(pricing.end_promotion),
                            modified: pricing.modified,
                        })
                        gotScpneusPricing = true
                    }
                })

                if(!gotMundialPricing){
                    setMundialPricing({...mundialPricing, tray_pricing_id: 0})
                }

                if(!gotScpneusPricing){
                    setScpneusPricing({...scpneusPricing, tray_pricing_id: 0})
                }
            })
            .catch(erro => {
                setAddAlert({
                    alertType: "error",
                    message: erro.response.data.message,
                    milliseconds: 3000
                })
                router.push('/produtos')
            })

            await api.get(`/products/kits/${reference}`)
            .then(response => {
                
                var gotKit2 = false
                var gotKit4 = false

                response.data.kits?.map(kit => {
                    kit.pricing?.map(pricing => {
                        kit.rules?.map(rule => {
                            if(pricing.tray_store_id == 668385 
                                && pricing.tray_pricing_id == rule.tray_pricing_id){

                                if(rule.quantity == 2){

                                    setKit2Details({
                                        hub_id: kit.details.hub_id,
                                        tray_product_id: pricing.tray_product_id,
                                        name: kit.details.product_name,
                                        description: kit.details.product_description,
                                        images: [
                                            {imageUrl: kit.details.picture_source_1},
                                            {imageUrl: kit.details.picture_source_2},
                                            {imageUrl: kit.details.picture_source_3},
                                            {imageUrl: kit.details.picture_source_4},
                                            {imageUrl: kit.details.picture_source_5},
                                            {imageUrl: kit.details.picture_source_6}
                                        ]
                                    })
            
                                    setKit2Rules({
                                        discount_type: rule.discount_type,
                                        discount_value: rule.discount_value,
                                        price_rule: rule.price_rule,
                                        quantity: rule.quantity
                                    })
            
                                    gotKit2 = true
            
                                }
            
                                if(rule.quantity == 4){
            
                                    setKit4Details({
                                        hub_id: kit.details.hub_id,
                                        tray_product_id: pricing.tray_product_id,
                                        name: kit.details.product_name,
                                        description: kit.details.product_description,
                                        images: [
                                            {imageUrl: kit.details.picture_source_1},
                                            {imageUrl: kit.details.picture_source_2},
                                            {imageUrl: kit.details.picture_source_3},
                                            {imageUrl: kit.details.picture_source_4},
                                            {imageUrl: kit.details.picture_source_5},
                                            {imageUrl: kit.details.picture_source_6}
                                        ]
                                    })
            
                                    setKit4Rules({
                                        discount_type: rule.discount_type,
                                        discount_value: rule.discount_value,
                                        price_rule: rule.price_rule,
                                        quantity: rule.quantity
                                    })
            
                                    gotKit4 = true
                                }
                   
                            }
                        })

                    })

                })

                if(!gotKit2){
                    setKit2Details({...kit2Details, hub_id: 0})
                }

                if(!gotKit4){
                    setKit4Details({...kit4Details, hub_id: 0})
                }
            })
        })
    }

    function validate(offers: Offer[]): Error[]{

        var errorsList: Error[] = []

        offers.map(offer => {
            if(offer.function == 'create' || offer.function == 'edit'){
                
                if(offer.name == 'unitário'){
                    errorsList = errorsList.concat(validateUnitary())
                }

                if(offer.name == 'kit 2'){
                    errorsList = errorsList.concat(validateKit(kit2Details, kit2Rules))
                }

                if(offer.name == 'kit 4'){
                    errorsList = errorsList.concat(validateKit(kit4Details, kit4Rules))
                }
            }
        })

        setErrorsList(errorsList)
        return errorsList
    }

    function validateUnitary(): Error[]{
        const errorList: Error[] = []

        if(unitaryDetails.name.length == 0){
            errorList.push({
                tab: 0,
                message: 'produto sem nome',
                value: 'name'
            })
        }

        if(unitaryDetails.description.length == 0){
            errorList.push({
                tab: 0,
                message: 'produto sem descrição',
                value: 'description'
            })
        }

        if(unitaryDetails.reference.length == 0){
            errorList.push({
                tab: 0,
                message: 'produto sem referencia',
                value: 'reference'
            })
        }

        if(unitaryDetails.related_categories.length == 0){
            errorList.push({
                tab: 1,
                message: 'escolha pelo menos 1 categoria',
                value: 'relatedCategories'
            })
        }

        if(unitaryDetails.main_category_id == 0){
            errorList.push({
                tab: 1,
                message: 'defina uma categoria pricipal',
                value: 'mainCategory'
            })
        }

        if(mundialPricing.price == 0){
            errorList.push({
                tab: 2,
                message: 'o preço da mundial não pode ser 0',
                value: 'mundialPrice'
            })
        }

        if(scpneusPricing.price == 0){
            errorList.push({
                tab: 2,
                message: 'o preço da scpneus não pode ser 0',
                value: 'sc pneusPrice'
            })
        }

        if(mundialPricing.promotionalPrice > 0) {
            
            if(differenceInDays(mundialPricing.startPromotion, mundialPricing.endPromotion) > 0){
                errorList.push({
                    tab: 2,
                    message: 'o fim da promoção não pode ser anterior ao inicio',
                    value: 'endPromotion'
                })
            }
        }

        if(scpneusPricing.promotionalPrice > 0) {
            
            if(differenceInDays(scpneusPricing.startPromotion, scpneusPricing.endPromotion) > 0){
                errorList.push({
                    tab: 2,
                    message: 'o fim da promoção não pode ser anterior ao inicio',
                    value: 'endPromotion'
                })
            }

        }

        return errorList
    }

    function validateKit(kitDetails: IKitDetails, kitRules: IKitRules): Error[]{
        const errorList: Error[] = []

        if(kitDetails.name.length == 0){
            errorList.push({
                tab: 4,
                message: `kit ${kitRules.quantity} sem nome`,
                value: `kit${kitRules.quantity}Name`
            })
        }

        if(kitDetails.description.length == 0){
            errorList.push({
                tab: 4,
                message: `kit ${kitRules.quantity} sem descrição`,
                value: `kit${kitRules.quantity}Description`
            })
        }

        return errorList
    }

    function verifyErrorInput(value: string): boolean{
        var hasError = false
        errorsList.map(error => {
            if(error.value == value){
                hasError = true
            }
        })

        return hasError
    }

    return (
        <ProductContext.Provider value={{
            unitaryDetails,
            setUnitaryDetails,
            mundialPricing,
            setMundialPricing,
            scpneusPricing,
            setScpneusPricing,
            kit2Details,
            setKit2Details,
            kit4Details,
            setKit4Details,
            kit2Rules,
            setKit2Rules,
            kit4Rules,
            setKit4Rules,
            selectedTab,
            setSelectedTab,
            submit,
            setSubmit,
            errorsList,
            setErrorsList,
            validate,
            verifyErrorInput
        }}>
            {children}
        </ProductContext.Provider>
    ) 
}