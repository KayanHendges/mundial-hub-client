import { differenceInDays } from "date-fns";
import { createContext, useState } from "react";
import { api } from "../../services/api";

interface IUnitaryDetails {
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
    availabilityDays: number;
    comments: string;
    warranty: string;
    images: {imageUrl: string}[]
}

export interface IKitDetails {
    name: string;
    description: string;
    images: {imageUrl: string}[]
}

export interface IPricing {
    cost_price: number;
    profit: number;
    price: number;
    stock: number;
    promotionalPrice: number;
    startPromotion: Date;
    endPromotion: Date;
}

export interface IKitRules {
    discount_type: string;
    discount_value: number;
    price_rule: number;
    quantity: number;
}

type NewProductContextType = {
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
    create: boolean;
    lock: boolean;
    id: number,
    success: false,
}

type Error = {
    tab: number;
    message: string;
    value: string;
}

export const NewProductContext =  createContext({} as NewProductContextType)

export function NewProductProvider ({ children })  {

    const [ unitaryDetails, setUnitaryDetails ] = useState<IUnitaryDetails>({
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
        availabilityDays: 0,
        comments: '',
        warranty: '5 anos da data de fabricação',
        images: [
            {imageUrl: ''},
            {imageUrl: ''},
            {imageUrl: ''},
            {imageUrl: ''},
            {imageUrl: ''},
            {imageUrl: ''}
        ]
    })

    const [ mundialPricing, setMundialPricing ] = useState<IPricing>({
        cost_price: 0,
        profit: 0,
        price: 0,
        stock: 0,
        promotionalPrice: 0,
        startPromotion: new Date(),
        endPromotion: new Date(),
    })

    const [ scpneusPricing, setScpneusPricing ] = useState<IPricing>({
        cost_price: 0,
        profit: 0,
        price: 0,
        stock: 0,
        promotionalPrice: 0,
        startPromotion: new Date(),
        endPromotion: new Date(),
    })

    const [ kit2Details, setKit2Details ] = useState<IKitDetails>({
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

    const [ selectedTab, setSelectedTab ] = useState<number>(0)

    const [ submit, setSubmit ] = useState<boolean>(false)

    const [ errorsList, setErrorsList ] = useState<Error[]>([])

    function validate(offers: Offer[]): Error[]{

        var errorsList: Error[] = []

        offers.map(offer => {
            if(offer.create){
                
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
        <NewProductContext.Provider value={{
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
        </NewProductContext.Provider>
    ) 
}