import styles from './styles.module.scss'

type InputProps = {
    width?: string;
    height?: string;
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
    border?: string;
}

export default function DefaultTextAreaInput(props: InputProps){

    const inputStyle = {
        border: props.border,
        height: props.height? props.height : '6rem'
    }

    if(props.loading){
        return (
            <div
            className={styles.wrapper}
            style={{width: `${props.width? props.width : '100%' }`}}
            >
                <label>
                    {props.label}
                </label>
                <div
                className={styles.placeholder}
                style={{ 
                    width: `${props.width? props.width : '100%'}`,
                    height: `${props.height? props.height : '6rem' }`
                }}
                />
            </div>
        )
    } else {
        return (
            <div
            className={styles.wrapper}
            style={{ 
                width: `${props.width? props.width : '100%' }`,
             }}
            >
                <label>
                    {props.label}
                </label>
                <textarea
                style={inputStyle}
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
                <div
                className={styles.unity}
                style={{ display: `${props.unity? 'flex' : 'none' }` }}
                >
                    {props.unity?.substring(0, 3)}
                </div>
            </div>
        )
    }

}