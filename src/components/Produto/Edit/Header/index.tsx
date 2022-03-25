import { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../../../../contexts/ProductContext'
import BackButton from '../../../Buttons/BackButton/Index'
import styles from './styles.module.scss'

type HeaderProps = {
    maxWidth: string;
    href: string;
    textButton: string;
    title: string;
}

export default function Header(props: HeaderProps) {
    
    const { unitaryDetails, submit, setSubmit } = useContext(ProductContext)

    const [ title, setTitle ] = useState<string>('')

    useEffect(() => {
        if(unitaryDetails.name.length > 0 && title.length == 0){
            setTitle(unitaryDetails.name)
        }

    }, [unitaryDetails.name])

    return (
        <div 
        className={styles.header}
        style={{ maxWidth: `${props.maxWidth}` }}
        >
            <div className={styles.toolsBar}>
                <BackButton href={props.href} />
                <div className={styles.title}>
                    <span
                    className={styles.placeholder}
                    style={{ 
                        display: `${unitaryDetails.hub_id == null? 'flex' : 'none' }`,
                        height: '1.6rem'
                    }}
                    />
                    <span
                    className={styles.placeholder}
                    style={{ 
                        display: `${unitaryDetails.hub_id == null? 'flex' : 'none' }`,
                        height: '1.15rem',
                        width: '50%'
                    }}
                    />
                    <strong>
                        {title}
                    </strong>
                    <span
                    style={{ 
                        display: `${unitaryDetails.hub_id == null? 'none' : 'flex' }`,
                    }}
                    >
                        {props.title}
                    </span>
                    <span
                    className={styles.placeholding}
                    >
                    </span>
                </div>
                <div
                className={styles.submitButton}
                onClick={() => {
                    if(!submit){
                        setSubmit(true)
                    }
                }}
                >
                    cadastrar
                </div>
            </div>
        </div>
    )
}