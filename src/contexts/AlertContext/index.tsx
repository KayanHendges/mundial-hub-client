import { createContext, useEffect, useState } from "react";

type Alert = {
    alertType: 'error' | 'success';
    message: string;
    milliseconds: number;
}

type AlertContextType = {
    alert: Alert | null;
    setAlert(alert: Alert | null): void;
    setAddAlert(alert: Alert | null): void;
}

export const AlertContext =  createContext({} as AlertContextType)

export function AlertProvider ({ children })  {

    const [ alert, setAlert ] = useState<Alert | null>(null)
    const [ addAlert, setAddAlert ] = useState<Alert | null>(null)


    useEffect(() => {

        console.log(alert, addAlert)
        if(alert == null && addAlert){
            console.log('passou')
            setAlert(addAlert)
            setAddAlert(null)
        }

    }, [alert, addAlert])

    return (
        <AlertContext.Provider value={{
            alert,
            setAlert,
            setAddAlert
        }}>
            {children}
        </AlertContext.Provider>
    ) 
}