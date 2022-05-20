export interface CustomerAddress {
    id: number
    customerId: number
    type: string
    name: string
    recipient?: string | null
    address: string
    number: string | null
    complement?: string | null
    neighborhood?: string | null
    city: string
    state: string
    zipCode: string
    country: string
    active: boolean
    modified: Date | null
    created: Date
}

export interface Customer {
    id: number
    name: string
    cpf: string
    cnpj?: string | null
    email?: string | null
    phone?: string | null
    cellphone?: string | null
    addresses: CustomerAddress[]
    modified: Date
    created: Date
}

export interface FindCustomerParams {
    id?: number,
    name?: string,
    email?: string,
    cpf?: string,
    cnpj?: string,
}

export interface FindCustomerResponse {
    customer: Customer
}