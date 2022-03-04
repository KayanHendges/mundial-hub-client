import router from "next/router"
import { useContext, useEffect, useState } from "react"
import { AlertContext } from "../../../../contexts/AlertContext"
import { NewProductContext } from "../../../../contexts/NewProductContext"
import { api } from "../../../../services/api"

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
    create: boolean;
    lock: boolean;
    id: number,
    success: false,
}

type Props = {
    hubOffers: Offer[],
    setHubOffers(offer: Offer[]): void;
    trayOffers: Offer[],
    setTrayOffers(offer: Offer[]): void;
    creating: boolean;
    setCreating(creating: boolean): void;
}

type UnitaryPostApi = {
    is_kit: number;
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

type PricingPostApi = {
    tray_product_id: number;
    cost: number,
    profit: number,
    price: number,
    hub_id: number;
    promotional_price: number,
    start_promotion: Date | string,
    end_promotion: Date | string,
    stock: number,
    main_category_id: number;
    related_categories: number[];
}

type KitRulesPostApi = {
    tray_product_id?: number;
    quantity: number;
    discount_type: string;
    discount_value: number;
    price_rule: number;
}

type CreateHubResponse = {
    unitaryHubId: number,
    kit2HubId: number,
    kit4HubId: number,
    mundialPricinglId: number,
    scpneusPricingId: number,
    kit2PricingId: number,
    kit4PricingId: number,
}

type CreateTrayResponse = {
    mundialTrayId: number,
    scpneusTrayId: number,
    kit2MundialTrayId: number,
    kit4MundialTrayId: number,
}

export default function CreateFunction(props: Props){

    const { 
        unitaryDetails, mundialPricing,
        scpneusPricing,
        kit2Details, kit2Rules,
        kit4Details, kit4Rules,
    } = useContext(NewProductContext)

    const { setAddAlert } = useContext(AlertContext)

    const [ hubId, setHubId ] = useState<number>(0)
    const [ kit2HubIdCreated, setKit2HubIdCreated ] = useState<number>(0)
    const [ kit4HubIdCreated, setKit4HubIdCreated ] = useState<number>(0)

    useEffect(() => {

        if(props.creating){

            create()
            .then(resolve => {
                router.back()
                setAddAlert({
                    alertType: 'success',
                    message: 'produto criado com sucesso',
                    milliseconds: 3000
                })
            })
            .catch(erro => {
                setAddAlert({
                    alertType: 'error',
                    message: `erro em ${erro} anúncios`,
                    milliseconds: 3000
                })
            })

        }

    }, [props.creating])

    useEffect(() => {
        console.log(props.trayOffers)
    }, [props.trayOffers])


    async function create(): Promise<void>{
        return new Promise(async(resolve, reject) => {

            const failsOffers: Offer[] = []

            const hubIds = await createHub()
            const trayIds = await createTray(hubIds)

            props.hubOffers.map(offer => {
                if(offer.create && offer.id <= 0){
                    failsOffers.push(offer)
                }
            })

            props.trayOffers.map(offer => {
                if(offer.create && offer.id <= 0){
                    failsOffers.push(offer)
                }
            })

            if(failsOffers.length > 0){
                reject(failsOffers.length)
            } else {
                resolve()
            }
        })
    }

    async function createHub(): Promise<CreateHubResponse>{
        return new Promise(async(resolve, reject) => {

            const unitary: UnitaryPostApi = {
                is_kit: 0,
                product_name: unitaryDetails.name,
                description: unitaryDetails.description,
                ean: unitaryDetails.ean,
                ncm: unitaryDetails.ncm,
                brand: unitaryDetails.brand,
                model: unitaryDetails.model,
                weight: unitaryDetails.weight,
                length: unitaryDetails.length,
                width: unitaryDetails.width,
                height: unitaryDetails.height,
                main_category_id: unitaryDetails.main_category_id,
                related_categories: unitaryDetails.related_categories,
                release_date: new Date(),
                available: unitaryDetails.available,
                availability: unitaryDetails.availability,
                availabilityDays: unitaryDetails.availabilityDays,
                reference: unitaryDetails.reference,
                images: unitaryDetails.images,
                warranty: unitaryDetails.warranty,
                comments: unitaryDetails.comments,
            }

            const kit2: UnitaryPostApi = {
                is_kit: 1,
                product_name: kit2Details.name,
                description: kit2Details.description,
                ean: unitaryDetails.ean,
                ncm: unitaryDetails.ncm,
                brand: unitaryDetails.brand,
                model: unitaryDetails.model,
                weight: unitaryDetails.weight*2,
                length: unitaryDetails.length,
                width: unitaryDetails.width*2,
                height: unitaryDetails.height,
                main_category_id: unitaryDetails.main_category_id,
                related_categories: [...unitaryDetails.related_categories, 520, 581],
                release_date: new Date(),
                available: unitaryDetails.available,
                availability: unitaryDetails.availability,
                availabilityDays: unitaryDetails.availabilityDays,
                reference: unitaryDetails.reference,
                images: kit2Details.images,
                warranty: unitaryDetails.warranty,
                comments: unitaryDetails.comments,
            }

            const kit4: UnitaryPostApi = {
                is_kit: 1,
                product_name: kit4Details.name,
                description: kit4Details.description,
                ean: unitaryDetails.ean,
                ncm: unitaryDetails.ncm,
                brand: unitaryDetails.brand,
                model: unitaryDetails.model,
                weight: unitaryDetails.weight*4,
                length: unitaryDetails.length,
                width: unitaryDetails.width*4,
                height: unitaryDetails.height,
                main_category_id: unitaryDetails.main_category_id,
                related_categories: [...unitaryDetails.related_categories, 520, 540],
                release_date: new Date(),
                available: unitaryDetails.available,
                availability: unitaryDetails.availability,
                availabilityDays: unitaryDetails.availabilityDays,
                reference: unitaryDetails.reference,
                images: kit4Details.images,
                warranty: unitaryDetails.warranty,
                comments: unitaryDetails.comments,
            }

            var hubOfferList = props.hubOffers

            const unitaryHubId = hubId > 0? hubId : await api.post('/products/create/unitary', {
                product: unitary
            })
            .then(response => {
                setHubId(response.data.hub_id)
                return response.data.hub_id
            })
            .catch(erro => {
                setAddAlert({
                    alertType: 'error',
                    message: erro.response.data.message,
                    milliseconds: 3000
                })
                return 0
            })

            if(unitaryHubId <= 0){
                reject()
                return
            } 

            const kit2HubId = kit2HubIdCreated > 0 || !props.hubOffers[2].create ? kit2HubIdCreated : api.post('/products/create/unitary', {
                product: kit2
            })
            .then(response => {
                setKit2HubIdCreated(response.data.hub_id)
                return response.data.hub_id
            })
            .catch(erro => {
                setAddAlert({
                    alertType: 'error',
                    message: erro.response.data.message,
                    milliseconds: 3000
                })
                return 0
            })

            const kit4HubId = kit4HubIdCreated > 0 || !props.hubOffers[3].create ? kit4HubIdCreated : api.post('/products/create/unitary', {
                product: kit4
            })
            .then(response => {
                setKit4HubIdCreated(response.data.hub_id)
                return response.data.hub_id
            })
            .catch(erro => {
                setAddAlert({
                    alertType: 'error',
                    message: erro.response.data.message,
                    milliseconds: 3000
                })
                return 0
            })

            const pricingMundial: PricingPostApi = {
                hub_id: unitaryHubId,
                tray_product_id: 0,
                cost: mundialPricing.cost_price,
                profit: mundialPricing.profit,
                price: mundialPricing.price,
                promotional_price: mundialPricing.promotionalPrice,
                start_promotion: mundialPricing.startPromotion,
                end_promotion: mundialPricing.endPromotion,
                stock: mundialPricing.stock,
                main_category_id: unitaryDetails.main_category_id,
                related_categories: unitaryDetails.related_categories,
            }
    
            const pricingScpneus: PricingPostApi = {
                hub_id: unitaryHubId,
                tray_product_id: 0,
                cost: scpneusPricing.cost_price,
                profit: scpneusPricing.profit,
                price: scpneusPricing.price,
                promotional_price: scpneusPricing.promotionalPrice,
                start_promotion: scpneusPricing.startPromotion,
                end_promotion: scpneusPricing.endPromotion,
                stock: scpneusPricing.stock,
                main_category_id: unitaryDetails.main_category_id,
                related_categories: unitaryDetails.related_categories,
            }

            const pricingMundialId = props.hubOffers[0].id > 0? props.hubOffers[0].id : api.post('/products/create/pricing', {
                store_id: 668385,
                pricing: pricingMundial
            })
            .then(response => {
                hubOfferList = handleHubOfferList(hubOfferList, {
                    ...props.hubOffers[0],
                    id: response.data.pricing_id
                })
                return response.data.pricing_id as number
            })
            .catch(erro => {
                hubOfferList = handleHubOfferList(hubOfferList, {
                    ...props.hubOffers[0],
                    id: 0
                })
                setAddAlert({
                    alertType: 'error',
                    message: erro.response.data.message,
                    milliseconds: 3000
                })
                return 0
            })


            const pricingScpneusId = props.hubOffers[1].id > 0? props.hubOffers[1].id : api.post('/products/create/pricing', {
                store_id: 1049898,
                pricing: pricingScpneus
            })
            .then(response => {
                hubOfferList = handleHubOfferList(hubOfferList, {
                    ...props.hubOffers[1],
                    id: response.data.pricing_id
                })
                return response.data.pricing_id as number
            })
            .catch(erro => {
                hubOfferList = handleHubOfferList(hubOfferList, {
                    ...props.hubOffers[1],
                    id: 0
                })
                setAddAlert({
                    alertType: 'error',
                    message: erro.response.data.message,
                    milliseconds: 3000
                })
                return 0
            })

            const pricingKit2: PricingPostApi = {
                ...pricingMundial,
                hub_id: await kit2HubId,
                tray_product_id: 0,
            }

            const rulesKit2: KitRulesPostApi = {
                ...kit2Rules,
                tray_product_id: 0
            }

            const kit2PricingRulesId = props.hubOffers[2].id > 0 || !props.hubOffers[2].create ? props.hubOffers[2].id : api.post('/products/create/pricing/kit', {
                store_id: 668385,
                pricing: pricingKit2,
                kit_rules: rulesKit2
            })
            .then(response => {
                hubOfferList = handleHubOfferList(hubOfferList, {
                    ...props.hubOffers[2],
                    id: response.data.pricing_id
                })
                return response.data.pricing_id as number
            })
            .catch(erro => {
                hubOfferList = handleHubOfferList(hubOfferList, {
                    ...props.hubOffers[2],
                    id: 0
                })
                setAddAlert({
                    alertType: 'error',
                    message: erro.response.data.message,
                    milliseconds: 3000
                })
                return 0
            })

            const pricingKit4: PricingPostApi = {
                ...pricingMundial,
                hub_id: await kit4HubId,
                tray_product_id: 0,
            }

            const rulesKit4: KitRulesPostApi = {
                ...kit4Rules,
                tray_product_id: 0
            }

            const kit4PricingRulesId = props.hubOffers[3].id > 0 || !props.hubOffers[3].create ? props.hubOffers[3].id : api.post('/products/create/pricing/kit', {
                store_id: 668385,
                pricing: pricingKit4,
                kit_rules: rulesKit4
            })
            .then(response => {
                hubOfferList = handleHubOfferList(hubOfferList, {
                    ...props.hubOffers[3],
                    id: response.data.pricing_id
                })
                return response.data.pricing_id as number
            })
            .catch(erro => {
                hubOfferList = handleHubOfferList(hubOfferList, {
                    ...props.hubOffers[3],
                    id: 0
                })
                setAddAlert({
                    alertType: 'error',
                    message: erro.response.data.message,
                    milliseconds: 3000
                })
                return 0
            })

            resolve({
                unitaryHubId: unitaryHubId,
                kit2HubId: await kit2HubId,
                kit4HubId: await kit4HubId,
                mundialPricinglId: await pricingMundialId,
                scpneusPricingId: await pricingScpneusId,
                kit2PricingId: await kit2PricingRulesId,
                kit4PricingId: await kit4PricingRulesId,
            })
        })
    }

    async function createTray(hubIds: CreateHubResponse): Promise<CreateTrayResponse>{
        return new Promise(async(resolve) => {

            const unitary: UnitaryPostApi = {
                is_kit: 0,
                product_name: unitaryDetails.name,
                description: unitaryDetails.description,
                ean: unitaryDetails.ean,
                ncm: unitaryDetails.ncm,
                brand: unitaryDetails.brand,
                model: unitaryDetails.model,
                weight: unitaryDetails.weight,
                length: unitaryDetails.length,
                width: unitaryDetails.width,
                height: unitaryDetails.height,
                main_category_id: unitaryDetails.main_category_id,
                related_categories: unitaryDetails.related_categories,
                release_date: new Date(),
                available: unitaryDetails.available,
                availability: unitaryDetails.availability,
                availabilityDays: unitaryDetails.availabilityDays,
                reference: unitaryDetails.reference,
                images: unitaryDetails.images,
                warranty: unitaryDetails.warranty,
                comments: unitaryDetails.comments,
            }

            const kit2: UnitaryPostApi = {
                is_kit: 1,
                product_name: kit2Details.name,
                description: kit2Details.description,
                ean: unitaryDetails.ean,
                ncm: unitaryDetails.ncm,
                brand: unitaryDetails.brand,
                model: unitaryDetails.model,
                weight: unitaryDetails.weight*2,
                length: unitaryDetails.length,
                width: unitaryDetails.width*2,
                height: unitaryDetails.height,
                main_category_id: unitaryDetails.main_category_id,
                related_categories: [...unitaryDetails.related_categories, 520, 581],
                release_date: new Date(),
                available: unitaryDetails.available,
                availability: unitaryDetails.availability,
                availabilityDays: unitaryDetails.availabilityDays,
                reference: unitaryDetails.reference,
                images: kit2Details.images,
                warranty: unitaryDetails.warranty,
                comments: unitaryDetails.comments,
            }

            const kit4: UnitaryPostApi = {
                is_kit: 1,
                product_name: kit4Details.name,
                description: kit4Details.description,
                ean: unitaryDetails.ean,
                ncm: unitaryDetails.ncm,
                brand: unitaryDetails.brand,
                model: unitaryDetails.model,
                weight: unitaryDetails.weight*4,
                length: unitaryDetails.length,
                width: unitaryDetails.width*4,
                height: unitaryDetails.height,
                main_category_id: unitaryDetails.main_category_id,
                related_categories: [...unitaryDetails.related_categories, 520, 540],
                release_date: new Date(),
                available: unitaryDetails.available,
                availability: unitaryDetails.availability,
                availabilityDays: unitaryDetails.availabilityDays,
                reference: unitaryDetails.reference,
                images: kit4Details.images,
                warranty: unitaryDetails.warranty,
                comments: unitaryDetails.comments,
            }

            var trayOfferList = props.trayOffers

            const pricingMundial: PricingPostApi = {
                hub_id: hubIds.unitaryHubId,
                tray_product_id: 0,
                cost: mundialPricing.cost_price,
                profit: mundialPricing.profit,
                price: mundialPricing.price,
                promotional_price: mundialPricing.promotionalPrice,
                start_promotion: mundialPricing.startPromotion,
                end_promotion: mundialPricing.endPromotion,
                stock: mundialPricing.stock,
                main_category_id: unitaryDetails.main_category_id,
                related_categories: unitaryDetails.related_categories,
            }
    
            const pricingScpneus: PricingPostApi = {
                hub_id: hubIds.unitaryHubId,
                tray_product_id: 0,
                cost: scpneusPricing.cost_price,
                profit: scpneusPricing.profit,
                price: scpneusPricing.price,
                promotional_price: scpneusPricing.promotionalPrice,
                start_promotion: scpneusPricing.startPromotion,
                end_promotion: scpneusPricing.endPromotion,
                stock: scpneusPricing.stock,
                main_category_id: unitaryDetails.main_category_id,
                related_categories: unitaryDetails.related_categories,
            }

            const unitaryMundialTrayId = props.trayOffers[0].id > 0 || !props.trayOffers[0].create? props.trayOffers[0].id: api.post('/products/create/unitary-tray', {
                product: unitary,
                pricing: pricingMundial,
                tray_pricing_id: hubIds.mundialPricinglId,
                store_id: 668385
            })
            .then(response => {
                trayOfferList = handleTrayOfferList(trayOfferList, {
                    ...props.trayOffers[0],
                    id: response.data.tray_id
                })
                return response.data.tray_id as number
            })
            .catch(erro => {
                trayOfferList = handleTrayOfferList(trayOfferList, {
                    ...props.trayOffers[0],
                    id: 0
                })
                setAddAlert({
                    alertType: 'error',
                    message: erro.response.data.message,
                    milliseconds: 3000
                })
                return 0
            })

            const unitaryScpneusTrayId = props.trayOffers[1].id > 0 || !props.trayOffers[1].create? props.trayOffers[1].id: api.post('/products/create/unitary-tray', {
                product: unitary,
                pricing: pricingScpneus,
                tray_pricing_id: hubIds.scpneusPricingId,
                store_id: 1049898
            })
            .then(response => {
                console.log(response.data)
                trayOfferList = handleTrayOfferList(trayOfferList, {
                    ...props.trayOffers[1],
                    id: response.data.tray_id
                })
                return response.data.tray_id as number
            })
            .catch(erro => {
                console.log(erro.response.data)
                trayOfferList = handleTrayOfferList(trayOfferList, {
                    ...props.trayOffers[1],
                    id: 0
                })
                setAddAlert({
                    alertType: 'error',
                    message: erro.response.data.message,
                    milliseconds: 3000
                })
                return 0
            })

            const kit2RulesTray = {
                ...kit2Rules,
                tray_product_id: await unitaryMundialTrayId
            }

            const kit2MundialTrayId = props.trayOffers[2].id > 0 || !props.trayOffers[2].create? props.trayOffers[2].id: await api.post('/products/create/kit-tray', {
                product: kit2,
                pricing: {...pricingMundial, related_categories: kit2.related_categories},
                rules: kit2RulesTray,
                tray_pricing_id: hubIds.kit2PricingId,
                store_id: 668385
            })
            .then(response => {
                trayOfferList = handleTrayOfferList(trayOfferList, {
                    ...props.trayOffers[2],
                    id: response.data.tray_id
                })
                return response.data.pricing_id as number
            })
            .catch(erro => {
                trayOfferList = handleTrayOfferList(trayOfferList, {
                    ...props.trayOffers[2],
                    id: 0
                })
                setAddAlert({
                    alertType: 'error',
                    message: erro.response.data.message,
                    milliseconds: 3000
                })
                return 0
            })

            await sleep(300)

            const kit4RulesTray = {
                ...kit4Rules,
                tray_product_id: await unitaryMundialTrayId
            }

            const kit4MundialTrayId = props.trayOffers[3].id > 0 || !props.trayOffers[3].create? props.trayOffers[3].id: await api.post('/products/create/kit-tray', {
                product: kit4,
                pricing: {...pricingMundial, related_categories: kit4.related_categories},
                rules: kit4RulesTray,
                tray_pricing_id: hubIds.kit4PricingId,
                store_id: 668385
            })
            .then(response => {
                trayOfferList = handleTrayOfferList(trayOfferList, {
                    ...props.trayOffers[3],
                    id: response.data.tray_id
                })
                return response.data.pricing_id as number
            })
            .catch(erro => {
                trayOfferList = handleTrayOfferList(trayOfferList, {
                    ...props.trayOffers[3],
                    id: 0
                })
                setAddAlert({
                    alertType: 'error',
                    message: erro.response.data.message,
                    milliseconds: 3000
                })
                return 0
            })

            resolve({
                mundialTrayId: await unitaryMundialTrayId,
                scpneusTrayId: await unitaryScpneusTrayId,
                kit2MundialTrayId: await kit2MundialTrayId,
                kit4MundialTrayId: await kit4MundialTrayId
            })

            async function sleep(ms: number): Promise<void>{
                return new Promise(resolve=> {
                    setTimeout(() => {
                        resolve()
                    }, ms)
                })
            }
        })
    }

    function handleHubOfferList(list: Offer[], newOffer: Offer){

        const newList = list.map(offer => {
            if(offer.name == newOffer.name && offer.store == newOffer.store){
                return newOffer
            } else {
                return {
                    ...offer,
                }
            }
        })

        props.setHubOffers(newList)
        return newList
    }

    function handleTrayOfferList(list: Offer[], newOffer: Offer){

        const newList = list.map(offer => {
            if(offer.name == newOffer.name && offer.store == newOffer.store){
                return newOffer
            } else {
                return {
                    ...offer,
                }
            }
        })

        props.setTrayOffers(newList)
        return newList
    }

    return (<></>)
}