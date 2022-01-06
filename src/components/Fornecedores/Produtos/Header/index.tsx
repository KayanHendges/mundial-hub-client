import styles from './styles.module.scss'
import BackButton from '../../../Buttons/BackButton/Index'
import { useEffect, useState } from 'react'
import { api } from '../../../../services/api'
import router from 'next/router'

type Provider = {
    provider_id: number;
    provider_name: string;
}

type Products = {
    providerReference: number,
    reference: string,
    productName: string,
    stock: number;
    cost: number,
    additionalCost: string,
    totalCost: number;
}

type ProviderState = {
    providerState: number;
    setProviderState(providerState: number): void;
}

type ProductsState = {
    products: Products[];
    setProducts(products: Products[]): void;
}

type Search = {
    search: string;
    setSearch(search: string): void;
}

type CountProducts = {
    countProducts: number;
    setCountProducts(countProducts: number): void;
}

type LastUpdate = {
    lastUpdate: string;
    setLastUpdate(lastUpdate: string): void;
}

type Loading = {
    loading: boolean;
    setLoading(loading: boolean): void;
}

type HeaderProps = {
    maxWidth: string;
    href: string;
    strong: string;
    title: string;
    providersList: Provider[];
    providerState: ProviderState;
    search: Search;
    products: ProductsState;
    countProducts: CountProducts;
    lastUpdate: LastUpdate
    loading: Loading;
}

type SearchIcon = {
    color: string;
    left: string;
    cursor: string;
}

type CleanSearch = {
    display: string;
}

type IndexStyle = {
    border: string;
    color: string;
}

export default function Header(props: HeaderProps) {

    const [ searchIcon, setSearchIcon ] = useState<SearchIcon>({
        color: 'var(--complementar-text)',
        left: '1.4%',
        cursor: 'text'
    })
    const [ placeholder, setPlaceholder ] = useState<string>('   pesquise pelo nome ou referencia')
    const [ search, setSearch ] = useState<string>('')
    const [ cleanSearch, setCleanSearch ] = useState<CleanSearch>({
        display: 'flex',
    })

    const indexStyle: IndexStyle = {
        border: '1px solid var(--gray-line)',
        color: 'var(--complementar-text)'
    }
    const [ providerStyle, setProviderStyle ] = useState<IndexStyle[]>([])

    useEffect(() => {
        const styles: IndexStyle[] = []
        props.providersList.map((provider, index) => {
            if(index+1 == props.providerState.providerState){
                styles.push({
                    border: '1px solid var(--blue-button)',
                    color: 'var(--white-text)'
                })
            } else {
                styles.push(indexStyle)
            }
        })
        setProviderStyle(styles)
    }, [])

    useEffect(() => {
        getProducts()
    }, [props.providerState.providerState])

    function handleSearchStyle(boolean: boolean): void{
        if(boolean){
            setSearchIcon({
                color: 'var(--gray-line)',
                left: '93%',
                cursor: 'pointer'
            })
            setCleanSearch({ display: 'flex' })
            setPlaceholder('')
        } else {
            if(search.length < 1){
                setSearchIcon({
                    color: 'var(--complementar-text)',
                    left: '1.4%',
                    cursor: 'text'
                })
                setPlaceholder('   pesquise o produto a ser vinculado')
                setCleanSearch({ display: 'none' })
            }
        }
    }

    function mouseStyle(boolean: boolean, index: number, id: number): void{
        if(props.providerState.providerState == id){
            return
        } else {
            if(boolean){
                const list = providerStyle.map((obj, i) => {
                    if(i == index){
                        return {
                            border: '1px solid var(--light-blue-button)',
                            color: 'var(--white-text)'
                        }
                    } else {
                        return obj
                    }
                })
                setProviderStyle(list)
            } else {
                const list = providerStyle.map((obj, i) => {
                    if(i == index){
                        return {
                            border: '1px solid var(--gray-line)',
                            color: 'var(--complementar-text)'
                        }
                    } else {
                        return obj
                    }
                })
                setProviderStyle(list)
            }
        }
    }

    function selectStyle(index: number, id: number): void{
        router.push(`/fornecedores/produtos?provider_id=${id}`)

        const list = providerStyle.map((obj, i) => {
            if(i == index){
                return {
                    border: '1px solid var(--blue-button)',
                    color: 'var(--white-text)'
                }
            } else {
                return {
                    border: '1px solid var(--gray-line)',
                    color: 'var(--complementar-text)'
                }
            }
        })

        setProviderStyle(list)
        props.providerState.setProviderState(id)
    }

    function getProducts(){
        props.loading.setLoading(true)
        props.products.setProducts([])
        props.countProducts.setCountProducts(0)
        props.lastUpdate.setLastUpdate('0000-00-00 00:00:00')

        api.get(`/providers/products/list/${props.providerState.providerState}?search=${search}`)
        .then(response => {
            props.loading.setLoading(false)
            props.products.setProducts(response.data.products)
            props.countProducts.setCountProducts(response.data.count)
            props.lastUpdate.setLastUpdate(response.data.lastUpdate)
        })
        .catch(erro => {
            console.log(erro.response.data.message)
            props.loading.setLoading(false)
            props.products.setProducts([])
            props.countProducts.setCountProducts(0)
            props.lastUpdate.setLastUpdate('0000-00-00 00:00:00')
        })
    }

    return (
        <div
        className={styles.header}
        style={{ maxWidth: `${props.maxWidth}` }}
        >
            <div className={styles.toolsBar}>
                <BackButton href={props.href} />
            </div>
            <div className={styles.title}>
                <strong>
                    {props.strong}
                </strong>
                <span>
                    {props.title}
                </span>
            </div>
            <div
            className={styles.providersRow}
            style={{ display: `${props.providersList.length > 0 ? "flex" : "none"}` }}
            >
                <div
                className={styles.providersGallery}
                >
                    {props.providersList.map((provider, index) => {
                        return (
                            <div
                            className={styles.providerContainer}
                            key={provider.provider_id}
                            onClick={() => selectStyle(index, provider.provider_id)}
                            style={providerStyle[index]}
                            onMouseEnter={() => mouseStyle(true, index, provider.provider_id)}
                            onMouseLeave={() => mouseStyle(false, index, provider.provider_id)}
                            >
                                {provider.provider_name}
                            </div>
                        )
                    })}
                </div>
                <div
                className={styles.search}
                >
                    <input 
                    className={styles.searchInput}
                    type="text"
                    onFocus={() => handleSearchStyle(true)}
                    onBlur={() => {
                        handleSearchStyle(false)
                    }}
                    placeholder={placeholder}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyPress={(e) => {
                        if(e.key == 'Enter'){
                            getProducts()
                        }
                    }}
                    />
                    <span
                    className="material-icons"
                    id={styles.searchIcon}
                    style={searchIcon}
                    onMouseEnter={() => {
                        if(search.length > 0){
                            setSearchIcon({
                                color: 'var(--complementar-text)',
                                left: '93%',
                                cursor: 'pointer'
                            })
                        }
                    }}
                    onMouseLeave={() => {
                        if(search.length > 0){
                            setSearchIcon({
                                color: 'var(--gray-line)',
                                left: '93%',
                                cursor: 'pointer'
                            })
                        }
                    }}
                    onClick={() => getProducts()}
                    >
                        search
                    </span>
                    <span
                    className={styles.cleanSearch}
                    style={cleanSearch}
                    onClick={() => {
                        setSearch('')
                        setSearchIcon({
                            color: 'var(--complementar-text)',
                            left: '1.4%',
                            cursor: 'text'
                        })
                        setPlaceholder('   pesquise pelo nome ou referencia')
                        setCleanSearch({display: 'none'})                            
                    }}
                    >
                        x
                    </span>
                </div>
            </div>
        </div>
    )
}