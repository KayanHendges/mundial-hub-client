import { PagingParam } from "../Params/PagingParam";
import { SortParams } from "../Params/SortParams";

export interface Store {
    id: number
    trayId: number
    active: boolean
    name: string
    link: string
    apiAddress: string
    oAuth2Code: string
    accessToken: string | null
    refreshToken: string | null
    expirationAccessToken: Date | null
    expirationRefreshToken: Date | null
    tokenActivated: Date | null
    modified: Date | null
}

export interface ListStoresParams {
    stores?: Partial<Store>,
    sort?: SortParams<Store>,
    paging?: PagingParam
}

export interface ListStoresResponse {
    stores: Store[],
    sort?: SortParams<Store>,
    paging?: PagingParam
}