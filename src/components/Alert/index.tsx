import { useContext, useEffect, useState } from 'react'
import { AlertContext } from '../../contexts/AlertContext'
import styles from './styles.module.scss'

type AlertStyle = {
    alert: {
        backgroundImage: string;
        backgroundPosition: string;
    },
    timeoutBar: {
        backgroundColor: string;
        width: string;
    }
}

export default function Alert(){

    const { alert, setAlert } = useContext(AlertContext)
    const [ opacity, setOpacity ] = useState<string>('0%')

    const startSuccessStyle: AlertStyle = {
        alert: {
            backgroundImage: 'linear-gradient(111deg, rgba(0,195,101,1) 0%, rgba(0,246,127,1) 100%)',
            backgroundPosition: 'left'
        },
        timeoutBar: {
            backgroundColor: '#01a556',
            width: '0%',
        }
    }

    const finishSuccessStyle: AlertStyle = {
        alert: {
            backgroundImage: 'linear-gradient(111deg, rgba(0,195,101,1) 0%, rgba(0,246,127,1) 100%)',
            backgroundPosition: 'right'
        },
        timeoutBar: {
            backgroundColor: '#01a556',
            width: '100%',
        }
    }

    const startErrorStyle: AlertStyle = {
        alert: {
            backgroundImage: 'linear-gradient(111deg, #970202 0%, rgba(255,0,0,1) 100%)',
            backgroundPosition: 'left'
        },
        timeoutBar: {
            backgroundColor: '#a20000',
            width: '0%',
        }
    }

    const finishErrorStyle: AlertStyle = {
        alert: {
            backgroundImage: 'linear-gradient(111deg, #970202 0%, rgba(255,0,0,1) 100%)',
            backgroundPosition: 'right'
        },
        timeoutBar: {
            backgroundColor: '#a50202',
            width: '100%',
        }
    }

    const [ alertStyle, setAlertStyle ] = useState<AlertStyle | null>(null)    
    
    useEffect(() => {
        if(alert != null){
            if(alert.alertType == 'success'){
                setAlertStyle(startSuccessStyle)
            }

            if(alert.alertType == 'error'){
                setAlertStyle(startErrorStyle)
            }

            setOpacity('100%')

            setTimeout(() => {
                if(alert.alertType == 'success'){
                    setAlertStyle(finishSuccessStyle)
                }
            }, 0)

            setTimeout(() => {
                if(alert.alertType == 'error'){
                    setAlertStyle(finishErrorStyle)
                }
            }, 0)
        
            setTimeout(() => {
                setOpacity('0%')
            }, alert.milliseconds)

            setTimeout(() => {
                setAlert(null)
                setAlertStyle(null)
            }, (alert.milliseconds + 300))
        } else {
            setAlertStyle(null)
        }

    }, [alert])

    

    if(alert != null){
        return (
            <div
            className={styles.wrapper}
            style={{ opacity: opacity }}
            >
                <div
                className={styles.alert}
                style={{...alertStyle?.alert, transition: `${alert? alert.milliseconds : 1000 }ms linear`}}
                >
                    <div
                    className={styles.message}
                    >
                        {alert.message}
                    </div>
                    <div
                    className={styles.timeoutBar}
                    >
                        <span
                        className={styles.bar}
                        style={{
                            ...alertStyle?.timeoutBar,
                            transition: `${alert? alert.milliseconds : 1000 }ms linear`
                        }}
                        >
                        </span>
                    </div>
                </div>
            </div>
        )
    } else {
        return (<></>)
    }

}