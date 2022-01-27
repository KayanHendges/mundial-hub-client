interface IDetailsInput {
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

interface IPricingInput {
    cost: number,
    profit: number,
    price: number,
    promotional_price: number,
    start_promotion: Date | string,
    end_promotion: Date | string,
    stock: number,
}

interface IRulesInput {
    quantity: number;
    discount_type: string;
    discount_value: number;
    price_rule: number;
}

export interface IProductInput {
    details: IDetailsInput,
    pricing: {
        mundial: IPricingInput,
        scpneus: IPricingInput
    }
}

export interface IProductKitInput {
    details: IDetailsInput,
    rules: IRulesInput
}

export interface IProductCreate  {
    unitary: IProductInput;
    kit2?: IProductKitInput;
    kit4?: IProductKitInput;
}