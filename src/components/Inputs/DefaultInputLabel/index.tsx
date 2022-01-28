import styles from './styles.module.scss'

type InputProps = {
    width?: string;
    label: string;
    name: string;
    value: string;
    placeholder?: string;
    onChange(value: any): any;
    leaveInput?(): any;
    required?: boolean;
    readOnly?: boolean;
    loading?: boolean;
    unity?: string;
}

export default function DefaultInputLabel(props: InputProps){

    if(props.loading){
        return (
            <div
            className={styles.wrapper}
            style={{ width: `${props.width? props.width : '100%' }` }}
            >
                <label>
                    {props.label}
                </label>
                <div
                className={styles.placeholder}
                style={{ width: `${props.width? props.width : '100%'}` }}
                />
            </div>
        )
    } else {
        return (
            <div
            className={styles.wrapper}
            style={{ width: `${props.width? props.width : '100%' }` }}
            >
                <label>
                    {props.label}
                </label>
                <input
                type="text"
                name={props.name}
                value={props.value}
                onChange={props.onChange}
                placeholder={props.placeholder}
                onBlur={() => {if(props.leaveInput != undefined){
                    return props.leaveInput()
                }}}
                autoComplete="new-password"
                required={props.required? props.required : false}
                readOnly={props.readOnly? props.readOnly : false}
                />
            </div>
        )
    }

}