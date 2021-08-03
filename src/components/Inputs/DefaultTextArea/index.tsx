import styles from './styles.module.scss'

export default function DefaultTextArea(props){
    if(props.readOnly == true) {
        return (
            <div className={styles.wrapper}>
            <label>
                {props.label}
            </label>
            <textarea
            maxLength={props.maxLength}
            cols={props.cols}
            rows={props.rows}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            readOnly
            />
        </div>
        )
    } else {
        return (
            <div className={styles.wrapper}>
                <label>
                    {props.label}
                </label>
                <textarea
                maxLength={props.maxLength}
                cols={props.cols}
                rows={props.rows}
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                />
            </div>
        )
    }
    
    
}