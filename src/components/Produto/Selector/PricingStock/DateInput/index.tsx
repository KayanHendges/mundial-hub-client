import styles from './styles.module.scss'

export default function DateInput(props){

    function showInput(displayValue){
        if(displayValue.length > 0){
            return "visible"
        } else {
            return "hidden"
        }
    }

    return(
        <div
            className={styles.wrapper}
            style={{
                width: `${props.width}`,
                visibility: `${showInput(props.visibility)}`
            }}>  
                <label>
                    {props.label}
                </label>
                <input
                type="date"
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                required
                />
            </div>
    )
}