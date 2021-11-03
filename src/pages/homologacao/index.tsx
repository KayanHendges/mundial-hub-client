import styles from './styles.module.scss'
import { api } from '../../services/api'
import { useState, useEffect } from 'react';


export default function Homologacao(){

    const [ refreshTokenInfo, setRefreshTokenInfo ] = useState({
        refreshToken: '',
        query: '',
        responseTray: ''
    })

    function refreshToken(){
        console.log('função chamada')
        api.get('/tray.refresh')
        .then(response => {
            console.log(response.data)
            setRefreshTokenInfo({
                refreshToken: response.data.refreshToken,
                query: response.data.query,
                responseTray: JSON.stringify(response.data.responseTray)
            })
            console.log(refreshTokenInfo)
        })
    }

    return (
        <div
        className={styles.wrapper}
        >
            <div
            className={styles.refreshTokenContainer}
            >
                <button
                onClick={() => refreshToken()}
                >
                    Atualizar Token
                </button>
            </div>
        </div>
    )
}