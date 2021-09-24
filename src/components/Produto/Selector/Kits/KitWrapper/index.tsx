import { useState } from 'react'
import DefaultInput from '../../../../Inputs/DefaultInput'
import styles from './styles.module.scss'

export default function KitWrapper(props){

    const [ optionStyle, setOptionStyle ] = useState({
        show: false,
        display: "none",
        height: "0rem"
    })

    function handleKitContainer(boolean){
        if(boolean){
            setOptionStyle({
                show: true,
                display: "flex",
                height: "auto"
            })
        } else {
            setOptionStyle({
                show: false,
                display: "none",
                height: "0rem"
            })
        }
    }

    return(
        <div
            className={styles.kitWrapper}
            >
                <div
                className={styles.header}
                onClick={() => handleKitContainer(!optionStyle.show)}
                >
                    {props.kitName}
                </div>
                <div
                className={styles.kitContainer}
                style={{
                    display: `${optionStyle.display}`,
                    height: `${optionStyle.height}`
                }}
                >
                    <DefaultInput
                    label="nome do kit"
                    width="100%"
                    />
                </div>
            </div>
    )
}