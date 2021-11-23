import styles from './styles.module.scss'

export default function InputSearch(props){

    function enterKey(e){
        if (e.key === 'Enter') {
            props.leaveInput()
        }
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
            type={props.type}
            name={props.name}
            value={props.value}
            onChange={props.onChange}
            placeholder={props.placeholder}
            onKeyDown={(e) => {
                enterKey(e)
            }}
            // onBlur={() => {if(props.leaveInput != undefined){
            //     return props.leaveInput()
            // }}}
            />
        </div>
    )
    
    
}