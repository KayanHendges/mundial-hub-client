import styles from './styles.module.scss'

export default function DefaultNumberInput(props){
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
                onKeyPress={(e) => {this.props.onlyNumber(e)}}
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
                type={props.type}
                name={props.name}
                value={props.value}
                onKeyPress={(e) => {props.onlyNumber(e)}}
                onChange={props.onChange}
                placeholder={props.placeholder}
                />
            </div>
        )
    }
    
}