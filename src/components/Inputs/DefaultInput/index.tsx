import styles from './styles.module.scss'

export default function DefaultInput(props){
    
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
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
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
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                />
            </div>
        )
    }
    
}