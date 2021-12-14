import Link from 'next/link';
import { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { api } from '../../services/api';
import styles from './styles.module.scss';

export default function Header() {

    const { user } = useContext(AuthContext)
    const [ trayRequests, setTrayRequests ] = useState({
        label: ``,
        request: false
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
        if(!trayRequests.request){
            api.get('/users/tray-requests')
            .then(response => {
                if(response.data.code == 200){
                    setTrayRequests({
                        label: `${response.data.requests} requisições`,
                        request: true
                    })
                } else {
                    console.log(response.data)
                }
            })
        }

    }

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
                    requestCount()
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
                    <span
                    className={styles.spanRequests}
                    >
                        {trayRequests.label}
                    </span>
                </div>
            </div>
        </div>
    )
}