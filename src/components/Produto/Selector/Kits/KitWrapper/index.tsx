import { useState } from 'react'
import DefaultInput from '../../../../Inputs/DefaultInput'
import DefaultTextArea from '../../../../Inputs/DefaultTextArea'
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
                    {props.kitHeader}
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
                    value={props.kitValues.name}
                    onChange={props.onChange}
                    />
                    <DefaultTextArea
                    rows={3}
                    type="textarea"
                    width="100%"
                    label="descrição"
                    required=""
                    value={props.kitValues.description}
                    onChange={props.onChange}
                    />
                </div>
            </div>
    )
}