import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import { api } from '../../services/api';
import RectangularPlaceholder from '../Placeholders/Rectangular';
import PopUpVideo from '../PopUpVideo';
import styles from './styles.module.scss';

export default function Header() {

    const user = {
        name: 'visitante'
    }

    const [ trayRequests, setTrayRequests ] = useState({
        label: ``,
        request: null
    })

    const [ trayProducts, setTrayProducts ] = useState({
        label: null,
        request: null,
    })

    const [ dropDownStyle, setDropDownStyle ] = useState({
        active: false,
        height: '0rem',
        borderRight: 'none',
        borderLeft: 'none',
        borderBottom: 'none',
    })

    const [ userContainerStyle, setUserContainerStyle ] = useState({
        borderTop: 'none',
        borderRight: 'none',
        borderLeft: 'none',
        borderRadius: '.4rem',
        backgroundColor: 'var(--gray-4)',
        transitionDelay: '.4s'
    })

    function handleDropDown(boolean){
        if(boolean){
            setDropDownStyle({
                ...dropDownStyle,
                active: true,
                height: '15rem',
                borderRight: '1px solid var(--white-text)',
                borderLeft: '1px solid var(--white-text)',
                borderBottom: '1px solid var(--white-text)',
            })
            setUserContainerStyle({
                borderTop: '1px solid var(--white-text)',
                borderRight: '1px solid var(--white-text)',
                borderLeft: '1px solid var(--white-text)',
                borderRadius: '.4rem .4rem 0 0',
                backgroundColor: 'var(--gray-5)',
                transitionDelay: '0s'
            })
        } else {
            setDropDownStyle({
                ...dropDownStyle,
                active: false,
                height: '0rem',
                borderRight: 'none',
                borderLeft: 'none',
                borderBottom: 'none',
            })
            setUserContainerStyle({
                borderTop: 'none',
                borderRight: 'none',
                borderLeft: 'none',
                borderRadius: '.4rem',
                backgroundColor: 'var(--gray-4)',
                transitionDelay: '.4s'
            })
        }
    }

    function handleUserContainer(boolean){
        if(boolean && !dropDownStyle.active){
            setUserContainerStyle({
                ...userContainerStyle,
                backgroundColor: 'var(--gray-5)',
                transitionDelay: '0s'
            })
        }
        if(!boolean && !dropDownStyle.active){
            setUserContainerStyle({
                ...userContainerStyle,
                backgroundColor: 'var(--gray-4)',
                transitionDelay: '0s'
            })
        }
        
    }

    function requestCount(){
        setTrayRequests({...trayRequests, request: null})
        api.get('/users/tray-requests')
        .then(response => {
            setTrayRequests({
                label: `${response.data.requests} requisições`,
                request: true
            })
        })
        .catch(erro => {
            console.log(erro.response.data)
            setTrayRequests({
                ...trayRequests,
                label: 'erro ao procurar requisições na tray',
                request: false,
            })
        })
    }

    function trayProductsCount(){
        setTrayProducts({...trayProducts, request: null})
        api.get('/users/tray-products?store_id=668385')
        .then(response => {
            const totalProducts = response.data.products.total
            setTrayProducts({
                ...trayProducts,
                label: `${totalProducts} produtos na tray`,
                request: true
            })
        })
        .catch(erro => {
            console.log(erro.response.data)
            setTrayProducts({
                ...trayProducts,
                label: 'erro ao procurar produtos na tray',
                request: false,
            })
        })
    }

    function handleRequests(){

        if(trayRequests.request == null){
            requestCount()
        }

        if(trayProducts.request == null){
            trayProductsCount()
        }

    }

    function keyPressVideo(e: KeyboardEvent){
        if(e.key == 'v'){
            setPopUpVideo(!popUpVideo)
        }
    }

    useEffect(() => {
        
        if(dropDownStyle.active){
            window.addEventListener('keypress', keyPressVideo, true)
            return () => window.removeEventListener('keypress', keyPressVideo, true)
        }

    }, [dropDownStyle.active])


    const [ popUpVideo, setPopUpVideo ] = useState<boolean>(false)

    return (
        <div
        className={styles.header}
        >
            <Link href="/">
                <a>
                    <img src="/logo-branca.png" alt="logo-branca" />
                </a>
            </Link>
            <p>Hub</p>
            <div
            className={styles.userContainer}
            >
                <span
                className={styles.userName}
                style={userContainerStyle}
                onClick={() => handleDropDown(!dropDownStyle.active)}
                onMouseEnter={() => {
                    handleUserContainer(true)
                    handleRequests()
                }}
                onMouseLeave={() => handleUserContainer(false)}
                >
                    <span 
                    id={styles.icon}
                    className="material-icons"
                    style={{ display: `${user?.name ? 'none' : 'flex'}`}}
                    >
                        person
                    </span>
                    {user?.name}
                    <span 
                    id={styles.icon}
                    className="material-icons-round"
                    style={{ display: `${user?.name ? 'flex' : 'none'}`}}
                    >
                        expand_more
                    </span>
                </span>
                <div
                className={styles.dropDown}
                style={dropDownStyle}
                >
                    <div
                    className={styles.itemContainer}
                    onClick={() => {
                        requestCount()
                    }}
                    >
                        <span 
                        className="material-icons-round"
                        id={styles.itemIcon}
                        >
                            sync_alt
                        </span>
                        <span
                        className={styles.itemTitle}
                        style={{ display: `${trayRequests.request != null? 'flex' : 'none'}` }}
                        >
                            {trayRequests.label}
                        </span>
                        <RectangularPlaceholder 
                        display={trayRequests.request == null? 'flex' : 'none'}
                        height='1.1rem'
                        />
                    </div>
                    <div
                    className={styles.itemContainer}
                    onClick={() => {
                        trayProductsCount()
                    }}
                    >
                        <span 
                        className="material-icons-outlined"
                        id={styles.itemIcon}
                        >
                            sell
                        </span>
                        <span
                        className={styles.itemTitle}
                        style={{ display: `${trayProducts.request != null? 'flex' : 'none'}` }}
                        >
                            {trayProducts.label}
                        </span>
                        <RectangularPlaceholder 
                        display={trayProducts.request == null? 'flex' : 'none'}
                        height='1.1rem'
                        />
                    </div>
                </div>
            </div>
            <PopUpVideo 
            active={popUpVideo}
            />
        </div>
    )
}