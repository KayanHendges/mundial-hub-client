export interface IBasicOrder {
    status: string,
    id: string,
    date: string,
    hour: string,
    customer_id: string,
    partial_total: string,
    taxes: string,
    discount: string,
    point_sale: string,
    shipment: string,
    shipment_value: string,
    shipment_date: string,
    delivery_time: string,
    store_note: string,
    discount_coupon: string,
    payment_method_rate: string,
    value_1: string,
    payment_form: string,
    sending_code: string,
    session_id: string,
    total: string,
    payment_date: string,
    access_code: string,
    progressive_discount: string,
    shipping_progressive_discount: string,
    shipment_integrator: string,
    modified: string,
    printed: string,
    interest: string,
    id_quotation: string,
    has_payment: string,
    has_shipment: string,
    has_invoice: string,
}

export interface trayOrdersToImport extends IBasicOrder {
    imported: boolean
}

export interface ListTrayOrdersParams {
    storeCode: number,
    includeImported: boolean,
    page: number,
    limit: number
}

export interface ListTrayOrdersResponse {
    total: number,
    page: number,
    limit: number,
    totalPages: number,
    orders: trayOrdersToImport[]
}

export interface ImportTrayOrderParams {
    id: number,
    storeCode: number
}

export interface ImportTrayOrderResponse {
    createdId: number,
}