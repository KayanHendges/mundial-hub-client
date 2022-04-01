import { AxiosRequestConfig } from "axios"
import router from "next/router"
import { useContext, useEffect } from "react"
import { AlertContext } from "../../../../contexts/AlertContext"
import { ProductContext } from "../../../../contexts/ProductContext"
import { api } from "../../../../services/api"
import { IDetailsInput, IProductInput } from "../../../../types/api/Products"
import { IPricing } from "../../../../contexts/ProductContext"

interface IPricingInput {
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

interface IRulesInput {
    quantity: number;
    discount_type: string;
    discount_value: number;
    price_rule: number;
}

type Offer = {
    name: string;
    store: string;
    function: string | null;
    lock: boolean;
    id: number | null,
    success: boolean | null,
}

type Props = {
    offerUnitaryMundial: Offer,
    setOfferUnitaryMundial(offer: Offer): void,
    offerUnitaryScpneus: Offer,
    setOfferUnitaryScpneus(offer: Offer): void,
    offerUnitaryKit2: Offer,
    setOfferUnitaryKit2(offer: Offer): void,
    offerUnitaryKit4: Offer,
    setOfferUnitaryKit4(offer: Offer): void,
    offerUnitaryMundialTray: Offer,
    setOfferUnitaryMundialTray(offer: Offer): void,
    offerUnitaryScpneusTray: Offer,
    setOfferUnitaryScpneusTray(offer: Offer): void,
    offerUnitaryKit2Tray: Offer,
    setOfferUnitaryKit2Tray(offer: Offer): void,
    offerUnitaryKit4Tray: Offer,
    setOfferUnitaryKit4Tray(offer: Offer): void,
    creating: boolean,
    setCreating(creating: boolean): void,
    created: boolean,
    setCreated(created: boolean): void,
}

export default function SaveFunction(props: Props){
    
    const { 
        changedList,
        unitaryDetails,
        mundialPricing, setMundialPricing,
        scpneusPricing, setScpneusPricing,
        kit2Details, setKit2Details,
        kit4Details, setKit4Details,
        kit2Rules, kit4Rules,
    } = useContext(ProductContext)

    const { setAddAlert } = useContext(AlertContext)

    useEffect(() => {
        
        if(props.creating && !props.created){
            submitAll()
        }

    }, [props.creating])

    async function submitAll(): Promise<void>{
        return new Promise(async(resolve, reject) => {

            try {
                await submitHub()
                const result = await submitTray()

                setAddAlert({
                    alertType: 'success',
                    message: 'produto salvo com sucesso',
                    milliseconds: 2000
                })
                router.back()

                resolve()
            }
            
            catch {
                reject()                
            }
            
            finally {
                props.setCreated(true)
                props.setCreating(false)
            }
        })
    }

    async function submitHub(): Promise<void>{
        return new Promise(async(resolve, reject) => {
            var getErrors = false 
            
           const unitary = submitUnitary()
           .then(response => {
               return true
           })
           .catch(erro => {
               getErrors = true
               setAddAlert({
                   alertType: 'error',
                   message: JSON.stringify(erro),
                   milliseconds: 2000
               })
           })
    
           const kit2 = submitKit2()
           .then(response => {
                return true
            })
            .catch(erro => {
                getErrors = true
                setAddAlert({
                    alertType: 'error',
                    message: JSON.stringify(erro),
                    milliseconds: 2000
                })
            })
    
            const kit4 = submitKit4()
           .then(response => {
                return true
            })
            .catch(erro => {
                getErrors = true
                setAddAlert({
                    alertType: 'error',
                    message: JSON.stringify(erro),
                    milliseconds: 2000
                })
            })
    
            const offers = Promise.all([unitary, kit2, kit4])
            .finally(() => {
    
                if(!getErrors){
                    resolve()
                } else {
                    reject()
                }
            })
        })


    }

    async function submitUnitary(): Promise<void>{
        return new Promise(async(resolve, reject) => {
            const unitary: IDetailsInput = {
                ean: unitaryDetails.ean,
                ncm: unitaryDetails.ncm,
                product_name: unitaryDetails.name,
                description: unitaryDetails.description,
                brand: unitaryDetails.brand,
                model: unitaryDetails.model,
                weight: unitaryDetails.weight,
                length: unitaryDetails.length,
                width: unitaryDetails.width,
                height: unitaryDetails.height,
                main_category_id: unitaryDetails.main_category_id,
                related_categories: unitaryDetails.related_categories,
                available: unitaryDetails.available,
                availability: unitaryDetails.availability,
                availabilityDays: unitaryDetails.availability_days,
                reference: unitaryDetails.reference,
                images: unitaryDetails.images,
                warranty: unitaryDetails.warranty,
                comments: unitaryDetails.comments,
            }
    
            const submitDetails = changedList.details? api.post(
                '/products/edit/unitary', {
                    product: {...unitary, is_kit: 0}, hub_id: unitaryDetails.hub_id
                }
            )
            .then(response => {
                props.setOfferUnitaryMundial({...props.offerUnitaryMundial, success: true})
                props.setOfferUnitaryScpneus({...props.offerUnitaryScpneus, success: true})
                return true
            })
            .catch(erro => {
                console.log(erro.response.data.message)
                return erro.response.data.message
            }) 
            : true

            const mundialPricingApi: IPricingInput = {
                cost: mundialPricing.cost_price,
                profit: mundialPricing.profit,
                price: mundialPricing.price,
                hub_id: unitaryDetails.hub_id,
                promotional_price: mundialPricing.promotionalPrice,
                start_promotion: mundialPricing.startPromotion,
                end_promotion: mundialPricing.endPromotion,
                stock: mundialPricing.stock,
                main_category_id: unitaryDetails.main_category_id,
                related_categories: unitaryDetails.related_categories
            }

            const submitPricingMundial = changedList.pricing? api.post(
                '/products/edit/pricing', {
                    pricing: mundialPricingApi,
                    tray_pricing_id: mundialPricing.tray_pricing_id,
                    store_id: 668385
                }
            )
            .then(response => {
                props.setOfferUnitaryMundial({...props.offerUnitaryMundial, success: true})
                return true
            })
            .catch(erro => {
                console.log(erro.response.data.message)
                return erro.response.data.message
            }) 
            : true

            const scpneusPricingApi: IPricingInput = {
                cost: scpneusPricing.cost_price,
                profit: scpneusPricing.profit,
                price: scpneusPricing.price,
                hub_id: unitaryDetails.hub_id,
                promotional_price: scpneusPricing.promotionalPrice,
                start_promotion: scpneusPricing.startPromotion,
                end_promotion: scpneusPricing.endPromotion,
                stock: scpneusPricing.stock,
                main_category_id: unitaryDetails.main_category_id,
                related_categories: unitaryDetails.related_categories
            }

            const submitPricingScpneus = changedList.pricing? api.post(
                '/products/edit/pricing', {
                    pricing: scpneusPricingApi,
                    tray_pricing_id: scpneusPricing.tray_pricing_id,
                    store_id: 1049898
                }
            )
            .then(response => {
                props.setOfferUnitaryScpneus({...props.offerUnitaryScpneus, success: true})
                return true
            })
            .catch(erro => {
                console.log(erro.response.data.message)
                return erro.response.data.message
            }) 
            : true

            if(await submitDetails != true || await submitPricingMundial != true || await submitPricingScpneus != true){
                if(submitDetails != true){
                    props.setOfferUnitaryMundial({...props.offerUnitaryMundial, success: false})
                    props.setOfferUnitaryScpneus({...props.offerUnitaryScpneus, success: false})
                    reject(submitDetails)
                    return
                }
                if(submitPricingMundial != true){
                    props.setOfferUnitaryMundial({...props.offerUnitaryMundial, success: false})
                    reject(submitPricingMundial)
                    return
                }
                if(submitPricingScpneus != true){
                    props.setOfferUnitaryScpneus({...props.offerUnitaryScpneus, success: false})
                    reject(submitPricingScpneus)
                    return
                }
            } else {
                props.setOfferUnitaryMundial({...props.offerUnitaryMundial, success: true})
                props.setOfferUnitaryScpneus({...props.offerUnitaryScpneus, success: true})
                resolve()
            }
        })
    }

    async function submitKit2(): Promise<void>{
        return new Promise(async(resolve, reject) => {

            if(props.offerUnitaryKit2.function == 'delete'){

                submitApi('post', '/products/delete/kit',{
                    hub_id: kit2Details.hub_id
                }, false)
                .then(() => resolve())
                .catch(erro => {
                    console.log(erro.response.data.message)
                    reject(erro.response.data.message)
                })
                return
            } else {
                const details: IDetailsInput = {
                    ean: unitaryDetails.ean,
                    ncm: unitaryDetails.ncm,
                    product_name: kit2Details.name,
                    description: kit2Details.description,
                    brand: unitaryDetails.brand,
                    model: unitaryDetails.model,
                    weight: unitaryDetails.weight*2,
                    length: unitaryDetails.length,
                    width: unitaryDetails.width*2,
                    height: unitaryDetails.height,
                    main_category_id: unitaryDetails.main_category_id,
                    related_categories: [...unitaryDetails.related_categories, 520, 581],
                    available: unitaryDetails.available,
                    availability: unitaryDetails.availability,
                    availabilityDays: unitaryDetails.availability_days,
                    reference: unitaryDetails.reference,
                    images: kit2Details.images,
                    warranty: unitaryDetails.warranty,
                    comments: unitaryDetails.comments,
                }

                const kit2PricingApi: IPricingInput = {
                    hub_id: kit2Details.hub_id,
                    cost: mundialPricing.cost_price,
                    profit: mundialPricing.profit,
                    price: mundialPricing.price,
                    promotional_price: mundialPricing.promotionalPrice,
                    start_promotion: mundialPricing.startPromotion,
                    end_promotion: mundialPricing.endPromotion,
                    stock: mundialPricing.stock,
                    main_category_id: unitaryDetails.main_category_id,
                    related_categories: [...unitaryDetails.related_categories, 520, 581]
                }
                
                const kit2RulesApi: IRulesInput = {
                    quantity: kit2Rules.quantity,
                    discount_type: kit2Rules.discount_type,
                    discount_value: kit2Rules.discount_value,
                    price_rule: kit2Rules.price_rule,
                }

                if(props.offerUnitaryKit2.function == 'create'){
                    
    
                    const submitDetails = api.post(
                        '/products/create/unitary', {
                            product: {...details, is_kit: 1}
                        }
                    )
                    .then(response => {
                        if(response.data.code == 201){
                            setKit2Details({...kit2Details, hub_id: response.data.hub_id})
                            return true
                        } else {
                            console.log(response.data.message)
                            return response.data.message
                        }
                    })
                    .catch(erro => {
                        console.log(erro.response.data.message)
                        return erro.response.data.message
                    })
    
                    const submitPricing = api.post('/products/create/pricing/kit', {
                        pricing: kit2PricingApi,
                        kit_rules: kit2RulesApi,
                        store_id: 668385
                    })
                    .then(response => {
                        if(response.data.code == 201){
                            setKit2Details({...kit2Details, tray_pricing_id: response.data.pricing_id})
                            return true
                        } else {
                            console.log(response.data.message)
                            return response.data.message
                        }
                    })
                    .catch(erro => {
                        console.log(erro.response.data.message)
                        return erro.response.data.message
                    })
    
                    if(await submitDetails != true || await submitPricing != true){
                        props.setOfferUnitaryKit2({...props.offerUnitaryKit2, success: false})
                        if(await submitDetails != true){
                            reject(submitDetails)
                            return
                        }
                        if(await submitPricing != true){
                            reject(submitPricing)
                            return
                        }
                    } else {
                        resolve()
                        props.setOfferUnitaryKit2({...props.offerUnitaryKit2, success: true})
                    }

                    return
                }

                if(props.offerUnitaryKit2.function == 'edit'){

                    const submitDetails = changedList.details? api.post(
                        '/products/edit/unitary', {
                            product: {...details, is_kit: 1}, hub_id: kit2Details.hub_id
                        }
                    )
                    .then(response => {
                        return true
                    })
                    .catch(erro => {
                        console.log(erro.response.data.message)
                        return erro.response.data.message
                    }) 
                    : true

                    const submitPricing = changedList.pricing? api.post(
                        '/products/edit/pricing/kit', {
                            tray_pricing_id: kit2Details.tray_pricing_id,
                            pricing: kit2PricingApi,
                            rules: kit2RulesApi
                        }
                    ) 
                    .then(response => {
                        // props.setOfferUnitaryKit2({...props.offerUnitaryKit2, success: true})
                        return true
                    })
                    .catch(erro => {
                        console.log(erro.response.data.message)
                        return erro.response.data.message
                    }) 
                    : true

                    if(await submitDetails != true || await submitPricing != true){
                        props.setOfferUnitaryKit2({...props.offerUnitaryKit2, success: false})
                        if(await submitDetails != true){
                            reject(submitDetails)
                            return
                        }
                        if(await submitPricing != true){
                            reject(submitPricing)
                            return
                        }
                    } else {
                        resolve()
                        props.setOfferUnitaryKit2({...props.offerUnitaryKit2, success: true})
                    }
                }

                resolve()
            }

        })
    }

    async function submitKit4(): Promise<void>{
        return new Promise(async(resolve, reject) => {

            if(props.offerUnitaryKit4.function == 'delete'){

                submitApi('post', '/products/delete/kit',{
                    hub_id: kit4Details.hub_id
                }, false)
                .then(() => resolve())
                .catch(erro => {
                    console.log(erro.response.data.message)
                    reject(erro.response.data.message)
                })
                return
            } else {

                const details: IDetailsInput = {
                    ean: unitaryDetails.ean,
                    ncm: unitaryDetails.ncm,
                    product_name: kit4Details.name,
                    description: kit4Details.description,
                    brand: unitaryDetails.brand,
                    model: unitaryDetails.model,
                    weight: unitaryDetails.weight*4,
                    length: unitaryDetails.length,
                    width: unitaryDetails.width*4,
                    height: unitaryDetails.height,
                    main_category_id: unitaryDetails.main_category_id,
                    related_categories: [...unitaryDetails.related_categories, 520, 540],
                    available: unitaryDetails.available,
                    availability: unitaryDetails.availability,
                    availabilityDays: unitaryDetails.availability_days,
                    reference: unitaryDetails.reference,
                    images: kit4Details.images,
                    warranty: unitaryDetails.warranty,
                    comments: unitaryDetails.comments,
                }

                const kit4PricingApi: IPricingInput = {
                    cost: mundialPricing.cost_price,
                    profit: mundialPricing.profit,
                    price: mundialPricing.price,
                    hub_id: kit4Details.hub_id,
                    promotional_price: mundialPricing.promotionalPrice,
                    start_promotion: mundialPricing.startPromotion,
                    end_promotion: mundialPricing.endPromotion,
                    stock: mundialPricing.stock,
                    main_category_id: unitaryDetails.main_category_id,
                    related_categories: [...unitaryDetails.related_categories, 520, 540]
                }
                
                const kit4RulesApi: IRulesInput = {
                    quantity: kit4Rules.quantity,
                    discount_type: kit4Rules.discount_type,
                    discount_value: kit4Rules.discount_value,
                    price_rule: kit4Rules.price_rule,
                }

                if(props.offerUnitaryKit4.function == 'create'){
             
                    const submitDetails = api.post(
                        '/products/create/unitary', {
                            product: {...details, is_kit: 1}
                        }
                    )
                    .then(response => {
                        if(response.data.code == 201){
                            setKit4Details({...kit4Details, hub_id: response.data.hub_id})
                            return true
                        } else {
                            console.log(response.data.message)
                            return response.data.message
                        }
                    })
                    .catch(erro => {
                        console.log(erro.response.data.message)
                        return erro.response.data.message
                    })
    
                    const submitPricing = api.post('/products/create/pricing/kit', {
                        pricing: kit4PricingApi,
                        kit_rules: kit4RulesApi,
                        store_id: 668385
                    })
                    .then(response => {
                        if(response.data.code == 201){
                            setKit4Details({...kit4Details, tray_pricing_id: response.data.pricing_id})
                            return true
                        } else {
                            console.log(response.data.message)
                            return response.data.message
                        }
                    })
                    .catch(erro => {
                        console.log(erro.response.data.message)
                        return erro.response.data.message
                    })
    
                    if(await submitDetails != true || await submitPricing != true){
                        props.setOfferUnitaryKit4({...props.offerUnitaryKit4, success: false})
                        if(await submitDetails != true){
                            reject(submitDetails)
                            return
                        }
                        if(await submitPricing != true){
                            reject(submitPricing)
                            return
                        }
                    } else {
                        props.setOfferUnitaryKit4({...props.offerUnitaryKit4, success: true})
                        resolve()
                    }
                }

                if(props.offerUnitaryKit4.function == 'edit'){

                    const submitDetails = changedList.details? api.post(
                        '/products/edit/unitary', {
                            product: {...details, is_kit: 1}, hub_id: kit4Details.hub_id
                        }
                    )
                    .then(response => {
                        return true
                    })
                    .catch(erro => {
                        console.log(erro.response.data.message)
                        return erro.response.data.message
                    }) 
                    : true

                    const submitPricing = changedList.pricing? api.post(
                        '/products/edit/pricing/kit', {
                            tray_pricing_id: kit4Details.tray_pricing_id,
                            pricing: kit4PricingApi,
                            rules: kit4RulesApi
                        }
                    ) 
                    .then(response => {
                        // props.setOfferUnitaryKit4({...props.offerUnitaryKit4, success: true})
                        return true
                    })
                    .catch(erro => {
                        console.log(erro.response.data.message)
                        return erro.response.data.message
                    }) 
                    : true

                    if(await submitDetails != true || await submitPricing != true){
                        props.setOfferUnitaryKit4({...props.offerUnitaryKit4, success: false})
                        if(await submitDetails != true){
                            reject(submitDetails)
                            return
                        }
                        if(await submitPricing != true){
                            reject(submitPricing)
                            return
                        }
                    } else {
                        resolve()
                        props.setOfferUnitaryKit4({...props.offerUnitaryKit4, success: true})
                    }
                }

                resolve()
                return
            }

        })
    }

    async function submitTray(): Promise<void>{
        return new Promise(async(resolve, reject) => {

            var getTrayErrors = false

            const unitaryMundialTray = submitUnitaryTray(props.offerUnitaryMundialTray, mundialPricing)
            .then(response => {
                props.setOfferUnitaryMundialTray({...props.offerUnitaryMundialTray, success: true})
                return true
            })
            .catch(erro => {
                props.setOfferUnitaryMundialTray({...props.offerUnitaryMundialTray, success: false})
                setAddAlert({
                    alertType: 'error',
                    message: JSON.stringify(erro),
                    milliseconds: 2000,
                })
                getTrayErrors = true
                return false
            })

            const unitaryScpneusTray = submitUnitaryTray(props.offerUnitaryScpneusTray, scpneusPricing)
            .then(response => {
                props.setOfferUnitaryScpneusTray({...props.offerUnitaryScpneusTray, success: true})
                return true
            })
            .catch(erro => {
                props.setOfferUnitaryScpneusTray({...props.offerUnitaryScpneusTray, success: false})
                setAddAlert({
                    alertType: 'error',
                    message: JSON.stringify(erro),
                    milliseconds: 2000,
                })
                getTrayErrors = true
                return false
            })

            const unitary = await Promise.all([unitaryMundialTray, unitaryScpneusTray])
            .then(response => {
                return true
            })
            .catch(erro => {
                reject(erro.response.data.message)
                return false
            })

            if(!unitary){
                return
            }

            const kit2Tray = submitKit2Tray()
            .then(response => {
                props.setOfferUnitaryKit2Tray({...props.offerUnitaryKit2Tray, success: true})
                return true
            })
            .catch(erro => {
                props.setOfferUnitaryKit2Tray({...props.offerUnitaryKit2Tray, success: false})
                setAddAlert({
                    alertType: 'error',
                    message: JSON.stringify(erro),
                    milliseconds: 2000,
                })
                getTrayErrors = true
                return false
            })

            const kit4Tray = submitKit4Tray()
            .then(response => {
                props.setOfferUnitaryKit4Tray({...props.offerUnitaryKit4Tray, success: true})
                return true
            })
            .catch(erro => {
                props.setOfferUnitaryKit4Tray({...props.offerUnitaryKit4Tray, success: false})
                setAddAlert({
                    alertType: 'error',
                    message: JSON.stringify(erro),
                    milliseconds: 2000,
                })
                console.log(props.offerUnitaryKit4Tray.success)
                getTrayErrors = true
                return false
            })

            const kits = await Promise.all([kit2Tray, kit4Tray])
            .then(response => {
                return true
            })
            .catch(erro => {
                reject(erro.response.data.message)
                return false
            })

            if (!getTrayErrors){
                resolve()
            } else {
                reject()
            }
        })
    }

    async function submitUnitaryTray(unitaryOffer: Offer, pricing: IPricing): Promise<void>{
        return new Promise(async(resolve, reject) => {

            const unitary: IDetailsInput = {
                ean: unitaryDetails.ean,
                ncm: unitaryDetails.ncm,
                product_name: unitaryDetails.name,
                description: unitaryDetails.description,
                brand: unitaryDetails.brand,
                model: unitaryDetails.model,
                weight: unitaryDetails.weight,
                length: unitaryDetails.length,
                width: unitaryDetails.width,
                height: unitaryDetails.height,
                main_category_id: unitaryDetails.main_category_id,
                related_categories: unitaryDetails.related_categories,
                available: unitaryDetails.available,
                availability: unitaryDetails.availability,
                availabilityDays: unitaryDetails.availability_days,
                reference: unitaryDetails.reference,
                images: !changedList.images && unitaryOffer.function == 'edit' ? undefined : unitaryDetails.images,
                warranty: unitaryDetails.warranty,
                comments: unitaryDetails.comments,
            }

            const pricingApi: IPricingInput = {
                cost: pricing.cost_price,
                profit: pricing.profit,
                price: pricing.price,
                hub_id: unitaryDetails.hub_id,
                promotional_price: pricing.promotionalPrice,
                start_promotion: pricing.startPromotion,
                end_promotion: pricing.endPromotion,
                stock: pricing.stock,
                main_category_id: unitaryDetails.main_category_id,
                related_categories: unitaryDetails.related_categories
            }

            const storeId = unitaryOffer.store == 'mundial'? 668385 : 1049898

            if(unitaryOffer.function == 'delete'){

                console.log('entoru no delete')
                api.post('/products/delete/unitary-tray', {
                    reference: unitaryDetails.reference,
                    store_id: storeId
                })
                .then(response => {
                    resolve()
                })
                .catch(erro => {
                    reject(erro.response.data.message)
                })
                return
            }

            if(unitaryOffer.function == 'create') {
                
                api.post('/products/create/unitary-tray', {
                    product: {...unitary, is_kit: 0},
                    pricing: pricingApi,
                    tray_pricing_id: pricing.tray_pricing_id,
                    store_id: storeId
                })
                .then(response => {
                    const trayId = response.data.tray_id
                    console.log('criado', trayId)
                    if(unitaryOffer.store == 'mundial'){
                        console.log('aplicado na mundial', trayId)
                        setMundialPricing({
                            ...mundialPricing,
                            tray_product_id: trayId
                        })
                    }
                    if(unitaryOffer.store == 'scpneus'){
                        setScpneusPricing({
                            ...scpneusPricing,
                            tray_product_id: trayId
                        })
                    }
                    resolve()
                })
                .catch(erro => {
                    reject(erro.response.data.message)
                })
                return

            }

            if(unitaryOffer.function == 'edit'){
                api.post('/products/edit/unitary-tray', {
                    details: {...unitary, is_kit: 0},
                    pricing: pricingApi,
                    tray_id: pricing.tray_product_id,
                    store_id: storeId
                })
                .then(response => {
                    resolve()
                })
                .catch(erro => {
                    reject(erro.response.data.message)
                })
                return

            }

            resolve()
            return
        })
    }

    async function submitKit2Tray(): Promise<void>{
        return new Promise(async(resolve, reject) => {

            const details: IDetailsInput = {
                ean: unitaryDetails.ean,
                ncm: unitaryDetails.ncm,
                product_name: kit2Details.name,
                description: kit2Details.description,
                brand: unitaryDetails.brand,
                model: unitaryDetails.model,
                weight: unitaryDetails.weight*2,
                length: unitaryDetails.length,
                width: unitaryDetails.width*2,
                height: unitaryDetails.height,
                main_category_id: unitaryDetails.main_category_id,
                related_categories: [...unitaryDetails.related_categories, 520, 581],
                available: unitaryDetails.available,
                availability: unitaryDetails.availability,
                availabilityDays: unitaryDetails.availability_days,
                reference: unitaryDetails.reference,
                images: !changedList.images || props.offerUnitaryKit2.function == 'edit' ? undefined : kit2Details.images,
                warranty: unitaryDetails.warranty,
                comments: unitaryDetails.comments,
            }

            const kit2PricingApi: IPricingInput = {
                hub_id: kit2Details.hub_id,
                cost: mundialPricing.cost_price,
                profit: mundialPricing.profit,
                price: mundialPricing.price,
                promotional_price: mundialPricing.promotionalPrice,
                start_promotion: mundialPricing.startPromotion,
                end_promotion: mundialPricing.endPromotion,
                stock: mundialPricing.stock,
                main_category_id: unitaryDetails.main_category_id,
                related_categories: [...unitaryDetails.related_categories, 520, 581]
            }
            
            const kit2RulesApi: IRulesInput = {
                quantity: kit2Rules.quantity,
                discount_type: kit2Rules.discount_type,
                discount_value: kit2Rules.discount_value,
                price_rule: kit2Rules.price_rule,
            }

            const storeId = props.offerUnitaryKit2Tray.store == 'mundial'? 668385 : 1049898

            if(props.offerUnitaryKit2Tray.function == 'delete'){

                api.post('/products/delete/kit-tray', {
                    tray_pricing_id: kit2Details.tray_pricing_id,
                    store_id: storeId
                })
                .then(response => {
                    resolve()
                })
                .catch(erro => {
                    reject(erro.response.data.message)
                })
                return
            }

            if(props.offerUnitaryKit2Tray.function == 'create'){

                const product = {
                    product: {...details, is_kit: 1},
                    pricing: kit2PricingApi,
                    rules: {...kit2RulesApi, tray_product_id: mundialPricing.tray_product_id},
                    tray_pricing_id: kit2Details.tray_pricing_id,
                    store_id: storeId
                }

                console.log(product)

                api.post('/products/create/kit-tray', product)
               .then(response => {
                resolve()
                })
                .catch(erro => {
                    reject(erro.response.data.message)
                })
                
                return
            }

            if(props.offerUnitaryKit2Tray.function == 'edit'){

                api.post('/products/edit/kit-tray', {
                    details: {...details, is_kit: 1},
                    pricing: {
                        ...kit2PricingApi,
                        tray_product_id: kit2Details.tray_product_id,
                        tray_pricing_id: kit2Details.tray_pricing_id
                    },
                    rules: kit2RulesApi,
                    tray_pricing_id: kit2Details.tray_pricing_id,
                    store_id: storeId
               })
               .then(response => {
                resolve()
                })
                .catch(erro => {
                    console.log(erro.response.data)
                    reject(erro.response.data.message)
                })
                
                return
            }

            resolve()
            return
        })

    }

    async function submitKit4Tray(): Promise<void>{
        return new Promise(async(resolve, reject) => {

            const details: IDetailsInput = {
                ean: unitaryDetails.ean,
                ncm: unitaryDetails.ncm,
                product_name: kit4Details.name,
                description: kit4Details.description,
                brand: unitaryDetails.brand,
                model: unitaryDetails.model,
                weight: unitaryDetails.weight*4,
                length: unitaryDetails.length,
                width: unitaryDetails.width*4,
                height: unitaryDetails.height,
                main_category_id: unitaryDetails.main_category_id,
                related_categories: [...unitaryDetails.related_categories, 520, 540],
                available: unitaryDetails.available,
                availability: unitaryDetails.availability,
                availabilityDays: unitaryDetails.availability_days,
                reference: unitaryDetails.reference,
                images: !changedList.images || props.offerUnitaryKit4.function == 'edit' ? undefined : kit4Details.images,
                warranty: unitaryDetails.warranty,
                comments: unitaryDetails.comments,
            }

            const kit4PricingApi: IPricingInput = {
                hub_id: kit4Details.hub_id,
                cost: mundialPricing.cost_price,
                profit: mundialPricing.profit,
                price: mundialPricing.price,
                promotional_price: mundialPricing.promotionalPrice,
                start_promotion: mundialPricing.startPromotion,
                end_promotion: mundialPricing.endPromotion,
                stock: mundialPricing.stock,
                main_category_id: unitaryDetails.main_category_id,
                related_categories: [...unitaryDetails.related_categories, 520, 581]
            }
            
            const kit4RulesApi: IRulesInput = {
                quantity: kit4Rules.quantity,
                discount_type: kit4Rules.discount_type,
                discount_value: kit4Rules.discount_value,
                price_rule: kit4Rules.price_rule,
            }

            const storeId = props.offerUnitaryKit4Tray.store == 'mundial'? 668385 : 1049898

            if(props.offerUnitaryKit4Tray.function == 'delete'){

                api.post('/products/delete/kit-tray', {
                    tray_pricing_id: kit4Details.tray_pricing_id,
                    store_id: storeId
                })
                .then(response => {
                    resolve()
                })
                .catch(erro => {
                    reject(erro.response.data.message)
                })
                return
            }

            if(props.offerUnitaryKit4Tray.function == 'create'){

                api.post('/products/create/kit-tray', {
                    product: {...details, is_kit: 1},
                    pricing: kit4PricingApi,
                    rules: {...kit4RulesApi, tray_product_id: mundialPricing.tray_product_id},
                    tray_pricing_id: kit4Details.tray_pricing_id,
                    store_id: storeId
               })
               .then(response => {
                    resolve()
                })
                .catch(erro => {
                    reject(erro.response.data.message)
                })

                return
            }

            if(props.offerUnitaryKit4Tray.function == 'edit'){

                api.post('/products/edit/kit-tray', {
                    details: {...details, is_kit: 1},
                    pricing: {
                        ...kit4PricingApi,
                        tray_product_id: kit4Details.tray_product_id,
                        tray_pricing_id: kit4Details.tray_pricing_id
                    },
                    rules: kit4RulesApi,
                    tray_pricing_id: kit4Details.tray_pricing_id,
                    store_id: storeId
               })
               .then(response => {
                resolve()
                })
                .catch(erro => {
                    reject(erro.response.data.message)
                })

                return
            }

            resolve()
            return
        })

    }

    async function submitApi(handlerFunction: string, apiPath: string, data: any, getResponse: boolean )
    : Promise<any>{
        return new Promise(async(resolve, reject) => {

            const method = handlerFunction == 'delete'? 'delete' : 'post' 

            const config: AxiosRequestConfig = {
                url: apiPath,
                method: method,
                data: data
            }

            api(config)
            .then(response => {
                resolve(response.data)
            })
            .catch(erro => {
                reject(erro.response.data.message)
            })
        })
    }
}