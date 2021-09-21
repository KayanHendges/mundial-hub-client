import styles from './styles.module.scss'

export default function AvailableInput(props){
    return(
        <div
        className={styles.wrapper}
        style={{
            width: `${props.width}`,
        }}>  
            <label>
                {props.label}
            </label>
            <div className={styles.inputDiv}>
                <input
                className={styles.availableInput}
                type="text"
                name="availability"
                value={props.value.availability}
                onChange={props.onChange}
                placeholder={props.placeholder}
                required
                />
                <input
                className={styles.availableDaysInput}
                type="text"
                name="availabilityDays"
                value={props.value.availabilityDays}
                onKeyPress={(e) => {props.onlyNumber(e)}}
                onChange={props.onChange}
                placeholder={props.placeholder}
                required
                />
                <span
                className={styles.days}
                >
                    dia(s)
                </span>
            </div>
            
        </div>
    )
}