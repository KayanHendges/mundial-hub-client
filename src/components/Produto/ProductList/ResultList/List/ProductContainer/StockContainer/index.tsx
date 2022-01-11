import router from 'next/router';
import { useEffect, useState } from 'react';
import { api } from '../../../../../../../services/api';
import styles from './styles.module.scss';

type StockContainerProps = {
    hubId: number;
    reference: string;
    productName: string;
    render: boolean;
    setRender(boolean: boolean): void;
}

interface IProvidersStock {
    providerName: string;
    providerId: number;
    stock: number;
    cost: number;
    additionalCost: string;
    totalCost: number;
}

export default function StockContainer(props: StockContainerProps){

    const [ providers, setProviders ] = useState<IProvidersStock[]>([])
    const [ loading, setLoading ] = useState(false)
    const [ placeholder, setPlaceholder ] = useState<number[]>([])

    useEffect(() => {
        if(props.render){
            getProviders()
        }
    }, [props.render])

    useEffect(() => {
        const array = [];
        for (let index = 0; index < 10; index++) {
            array.push(index)
        }
        setPlaceholder(array)
    }, [])

    async function getProviders(){
        setLoading(true)
        setProviders([])
        await api.get(`/providers/stock/list/${props.hubId}`) 
        .then(response => {
            if(response.data.code == 200){
                setProviders(response.data.providers)
            } else {
                setProviders([])
            }
        })
        .catch(erro => {
            console.log(erro.response.data.message)
            setProviders([])
        })
        setLoading(false)
    }

    if(props.render){
        return (
            <div
            className={styles.wrapper}
            >
                <div
                className={styles.container}
                >
                    <div
                    className={styles.header}
                    >
                        <div
                        className={styles.title}
                        >
                            <span
                            className={styles.titleSpan}
                            >
                                {props.reference}
                            </span>
                            <span
                            className={styles.titleSpan}
                            >
                                {props.productName}
                            </span>
                        </div>
                        <div
                        className={styles.headerCollums}
                        >
                            <span
                            className={styles.collum}
                            style={{ textAlign: 'start' }}
                            >
                                fornecedor
                            </span>
                            <span
                            className={styles.collum}
                            >
                                estoque
                            </span>
                            <span
                            className={styles.collum}
                            >
                                preço
                            </span>
                        </div>
                    </div>
                    <div
                    className={styles.listContainer}
                    >
                        <div
                        className={styles.list}
                        >
                            {providers.map((provider, index) => {
                                return (
                                    <div
                                    className={styles.providerContainer}
                                    key={index}
                                    onClick={() => router.push(`/fornecedores/produtos?provider_id=${provider.providerId}&search=${props.reference}`)}
                                    >
                                        <span
                                        style={{ textAlign: 'start' }}
                                        >
                                            {provider.providerName}
                                        </span>
                                        <span>
                                            {provider.stock}
                                        </span>
                                        <span>
                                            {provider.totalCost}
                                        </span>
                                    </div>
                                )
                            })}
                            {placeholder.map(placeholder => {
                                return (
                                    <div
                                    className={styles.placeholder}
                                    style={{ display: `${loading ? 'flex' : 'none'}` }}
                                    />
                                )
                            })}
                        </div>
                    </div>
                    <div
                    className={styles.footer}
                    >
                        <button
                        type='button'
                        className={styles.close}
                        onClick={() => props.setRender(false)}
                        >
                            fechar
                        </button>
                    </div>
                </div>
            </div>
        )
    } else {
        return <></>
    }

}