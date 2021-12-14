import styles from './styles.module.scss'
import BackButton from '../../../Buttons/BackButton/Index'
import { useEffect, useState } from 'react'

type Provider = {
    provider_id: number;
    provider_name: string;
}

type ProviderState = {
    providerState: number;
    setProviderState(providerState: number): void;
}

type HeaderProps = {
    maxWidth: string;
    href: string;
    strong: string;
    title: string;
    providersList: Provider[];
    providerState: ProviderState;
}

type IndexStyle = {
    border: string;
    color: string;
}

export default function Header(props: HeaderProps) {

    const indexStyle: IndexStyle = {
        border: '1px solid var(--gray-line)',
        color: 'var(--complementar-text)'
    }
    const [ providerStyle, setProviderStyle ] = useState<IndexStyle[]>([])

    useEffect(() => {
        const styles: IndexStyle[] = []
        props.providersList.map(provider => {
            styles.push(indexStyle)
        })
        setProviderStyle(styles)
    }, [])

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
        </div>
    )
}