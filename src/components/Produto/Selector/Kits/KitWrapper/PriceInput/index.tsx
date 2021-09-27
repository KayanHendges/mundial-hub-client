import styles from './styles.module.scss'

export default function PriceInput(props){

    function priceFormat(e){
        
        var typedValue = e.target.value.replace(".", ",")
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

        return values
    }

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
            value={props.value}
            onChange={(e) => {props.onChange(priceFormat(e))}}
            />
        </div>
    )
}