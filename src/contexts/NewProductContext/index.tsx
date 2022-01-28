import { createContext, useState } from "react";

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

interface IKitDetails {
    name: string;
    description: string;
}

interface IPricing {
    cost_price: number;
    profit: number;
    price: number;
    stock: number;
    promotionalPrice: number;
    startPromotion: Date;
    endPromotion: Date;
}

interface IKitRules {
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
        ncm: '',
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
        description: ''
    })

    const [ kit4Details, setKit4Details ] = useState<IKitDetails>({
        name: '',
        description: ''
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

    const [ selectedTab, setSelectedTab ] = useState<number>(2)

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
            setSelectedTab
        }}>
            {children}
        </NewProductContext.Provider>
    ) 
}