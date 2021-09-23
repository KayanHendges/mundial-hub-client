import styles from './styles.module.scss'

export default function DefaultPriceInput(props){


    function priceFormat(e){
        
        var typedValue = e.target.value
        var valueToSend = []

        if(props.value == "0,00"){
            valueToSend.push(typedValue.replace('0,00', ""))
        } else {
            if(typedValue.length > 0){
                typedValue = typedValue.split("")
                typedValue.map((crt, index) => {
                    if(index > 0){
                        if(crt != " "){
                            valueToSend.push(crt)
                        }
                    } else {
                        if(crt != "0"){
                            valueToSend.push(crt)
                        }
                    }
                })
            } else {
                valueToSend = []
            }
        }

        if(valueToSend.length > 2 && valueToSend.indexOf(",") > -1){
            var strValue = valueToSend.join("")
            strValue = strValue.replace(",", "")
            valueToSend = strValue.split("")
        }

        if(valueToSend.length > 2){
            if(valueToSend.indexOf(",") > -1){
                var strValue = valueToSend.join("")
                strValue = strValue.replace(",", "")
                valueToSend = strValue.split("")
                var reversedValue = valueToSend.reverse()
                reversedValue.splice(2, 0, ",")
                valueToSend = reversedValue.reverse()
            } else {
                var reversedValue = valueToSend.reverse()
                reversedValue.splice(2, 0, ",")
                valueToSend = reversedValue.reverse()
            }
        } else {
            if(valueToSend.indexOf(",") > -1){
                var strValue = valueToSend.join("")
                strValue = strValue.replace(",", "")
                valueToSend = strValue.split("")
            }
        }

        const values = valueToSend.join("")

        var event = e
        event.target.value = values

        return e
    }

    if (props.required == "required") {
        return (
            <div
            className={styles.wrapper}
            style={{
                width: `${props.width}`,
            }}>  
                <label>
                    {props.label}
                </label>
                <input
                type={props.type}
                name={props.name}
                value={props.value}
                onChange={(e) => {props.onChange(priceFormat(e))}}
                placeholder={props.placeholder}
                onBlur={() => {if(props.leaveInput != undefined){
                    return props.leaveInput()
                }}}
                required
                />
            </div>
        )
    } else {
        return (            
            <div
            className={styles.wrapper}
            style={{
                width: `${props.width}`,
            }}>  
                <label>
                    {props.label}
                </label>
                <input 
                type={props.type}
                name={props.name}
                value={props.value}
                onChange={(e) => {props.onChange(priceFormat(e))}}
                onBlur={() => {if(props.leaveInput != undefined){
                    return props.leaveInput()
                }}}
                placeholder={props.placeholder}
                />
            </div>
        )
    }
    
}