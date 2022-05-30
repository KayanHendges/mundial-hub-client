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
    modified: Date | null
    created: Date
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