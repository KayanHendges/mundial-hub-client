import { useEffect, useState } from 'react'
import { api } from '../../../../services/api'
import ProductsList from './ProductsList'
import ProviderProductsList from './ProviderProductsList'
import styles from './styles.module.scss'

type ContainerProps = {
    providerId: number;
}

type ProviderProduct = {
    providerReference: number;
    providerName: string;
}

type MatchProducts = {
    providerReference: number;
    hubId: number;
}

export default function Container(props: ContainerProps){

    const [ param, setParam ] = useState<string>('link')

    const [ providerProducts, setProviderProducts ] = useState<ProviderProduct[]>([])
    const [ productsCount, setProductsCount ] = useState<number>(0)
    const [ loading, setLoading ] = useState(false)
    const [ request, setRequest ] = useState<boolean>(false)
    const [ search, setSearch ] = useState<string>('')

    const [ matchProducts, setMatchProducts ] = useState<MatchProducts>({
        providerReference: 0,
        hubId: 0
    })

    useEffect(() => {
        if(props.providerId > 0){

            setLoading(true)
            setProviderProducts([])
            setProductsCount(0)
            setMatchProducts({
                providerReference: 0,
                hubId: 0
            })

            api.get(`/providers/link/${props.providerId}?param=${param}&search=${search}`)
            .then(response => {
                if(response.data.code == 200){
                    const products: ProviderProduct[] = response.data.products
                    setProviderProducts(products)
                    setProductsCount(response.data.count)
                    setLoading(false)
                } else {
                    setProviderProducts([])
                    setProductsCount(0)
                    setLoading(false)
                }
            })
            .catch(erro => {
                console.log(erro.response.data.message)
                setProviderProducts([])
                setProductsCount(0)
                setLoading(false)
            })
        }
    }, [props.providerId, param, request])

    async function getProviderProducts(){
        setLoading(true)
        setProviderProducts([])
        setProductsCount(0)
        setMatchProducts({
            providerReference: 0,
            hubId: matchProducts.hubId
        })
        api.get(`/providers/link/${props.providerId}?param=${param}&search=${search}`)
        .then(response => {
            if(response.data.code == 200){
                setProviderProducts(response.data.products)
                setProductsCount(response.data.count)
                setLoading(false)
            } else {
                setProviderProducts([])
                setProductsCount(0)
                setLoading(false)
            }
        })
        .catch(erro => {
            console.log(erro.response.data.message)
            setProviderProducts([])
            setLoading(false)
        })
    }

    if(props.providerId == 0){
        return (
            <div
            className={styles.wrapper}
            >
                Escolha um fornecedor
            </div>
        )
    } else {
        return (
            <div
            className={styles.wrapper}
            >
                <div
                className={styles.header}
                >
                    <span
                    className='material-icons'
                    id={styles.renewIcon}
                    onClick={() => {
                        if(param == 'link'){
                            setParam('create')
                        } else {
                            setParam('link')
                        }
                    }}
                    >
                        autorenew
                    </span>
                    {`${param == 'link' ? 'vincular produtos' : 'produtos não cadastrados'}`}
                </div>
                <div
                className={styles.container}
                >
                    <ProviderProductsList 
                    providerProductsList={providerProducts}
                    productsCount={{productsCount, setProductsCount}}
                    loading={loading}
                    matchProducts={{matchProducts, setMatchProducts}}
                    param={param}
                    request={{request, setRequest}}
                    search={{search, setSearch}}
                    getProviderProducts={getProviderProducts}
                    />
                    <ProductsList
                    matchProducts={{matchProducts, setMatchProducts}}
                    />
                </div>
            </div>
        )
    }
}