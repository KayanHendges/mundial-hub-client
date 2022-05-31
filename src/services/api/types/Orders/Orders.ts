import { PagingParam } from "../Params/PagingParam"
import { SortParams } from "../Params/SortParams"

export interface Order {
    id: number | null
    trayOrderId: number
    storeCode: number
    status: string
    subtotal: number
    taxes: number | null
    discount: number | null
    paymentMethod?: string | null
    paymentMethodDiscount: number | null
    discountCoupon: number | null
    coupon: string | null
    total: number
    localSale: string | null
    chosenTransporterId: number | null
    chosenShippingType: string | null
    chosenShippingValue: number
    deliveryTimeMin: number | null
    deliveryTimeMax: number | null
    transporterId: number | null
    shippingCost: number | null
    dispatchedDate: string| null
    deliveredDate: string| null
    partnerId?: number | null
    customerId: number | null
    shippingAddressId: number | null
    billingAddressId: number | null
    paid: boolean
    modified: string| null
    created: string
}

export interface ListOrdersParams {
    orders: Partial<Order>,
    paging?: PagingParam,
    sort?: SortParams<Order>
}

export interface ListOrdersResponse {
    orders: Order[],
    total: number,
    paging?: PagingParam,
    sort?: SortParams<Order>
}

export interface OrderProductSold {
    id: number | null
    orderId: number | null
    trayId: number | null
    trayKitId: number | null
    productId: number
    kitId: number | null
    reference: string
    quantity: number
    name: string
    cost: number | null
    price: number
    paidPrice: number
    modified: string | null
    created: string
}

export interface ListOrdersProductsSoldParams {
    productsSold: Partial<OrderProductSold>,
    paging?: PagingParam,
    sort?: SortParams<OrderProductSold>
}

export interface ListOrdersProductsSoldResponse {
    ordersProductsSold: OrderProductSold[],
    total: number,
    paging?: PagingParam,
    sort?: SortParams<OrderProductSold>
}

export interface OrderPayment {
    id: number | null
    orderId: number
    method: string
    value: number
    date: string
    modified: string | null
    created: string
}

export interface ListOrdersPaymentsParams {
    ordersPayments: Partial<OrderPayment>,
    paging?: PagingParam,
    sort?: SortParams<OrderPayment>
}

export interface ListOrdersPaymentsResponse {
    ordersPayments: OrderPayment[],
    total: number,
    paging?: PagingParam,
    sort?: SortParams<OrderPayment>
}

export interface OrderFinance {
    id: number | null
    orderId: number | null
    type: string
    value: number
    date: string
    applied: boolean
    modified: string | null
    created: string
}

export interface ListOrdersfinancesParams {
    finances: Partial<OrderFinance>,
    paging?: PagingParam,
    sort?: SortParams<OrderFinance>
}

export interface ListOrdersfinancesResponse {
    ordersFinances: OrderFinance[],
    total: number,
    paging?: PagingParam,
    sort?: SortParams<OrderFinance>
}

export interface OrderNote {
    id: number | null
    orderId: number | null
    description: string
    by: string
    modified: string | null
    created: string
}

export interface ListOrdersNotesParams {
    notes: Partial<OrderNote>,
    paging?: PagingParam,
    sort?: SortParams<OrderNote>
}

export interface ListOrdersNotesResponse {
    ordersNotes: OrderNote[],
    total: number,
    paging?: PagingParam,
    sort?: SortParams<OrderNote>
}

export interface OrderInvoice {
    id: number | null
    orderId: number
    cnpj: string | null
    number: number
    key?: string | null
    link?: string | string
    modified: string | null
    created: string
}

export interface ListOrderInvoicesParams {
    ordersInvoices: Partial<OrderInvoice>,
    paging?: PagingParam,
    sort?: SortParams<OrderInvoice>
}

export interface ListOrderInvoicesResponse {
    ordersInvoices: OrderInvoice[],
    total: number,
    paging?: PagingParam,
    sort?: SortParams<OrderInvoice>
}

export interface OrderMarketPlaceOrder {
    id: number | null
    orderId: number | null
    name: string
    marketPlaceOrderId: string
    link?: string | null
    modified: string | null
    created: string
}

export interface FindOrderMarketPlaceOrdersParams {
    id?: number,
    orderId?: number
}

export interface FindOrderMarketPlaceOrdersResponse {
    orderMarketPlace: OrderMarketPlaceOrder
}

export interface ListOrderMarketPlaceOrdersParams {
    ordersMarketPlaces: Partial<OrderMarketPlaceOrder>
    sort?: SortParams<OrderMarketPlaceOrder>
    paging: PagingParam
}

export interface ListOrderMarketPlaceOrdersResponse {
    ordersMarketPlace: OrderMarketPlaceOrder[],
    total: number,
    paging?: PagingParam,
    sort?: SortParams<OrderMarketPlaceOrder>
}