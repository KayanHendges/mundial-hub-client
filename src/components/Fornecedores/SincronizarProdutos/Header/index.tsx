import styles from './styles.module.scss'
import BackButton from '../../../Buttons/BackButton/Index'

type Provider = {
    provider_id: number;
    provider_name: string;
}

type HeaderProps = {
    maxWidth: string;
    href: string;
    strong: string;
    title: string;
    providersList: Provider[];
}

export default function Header(props: HeaderProps) {
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
                {props.providersList.map(provider => {
                    return (
                        <div
                        className={styles.providerContainer}
                        key={provider.provider_id}
                        >
                            {provider.provider_name}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}