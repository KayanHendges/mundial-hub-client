import styles from './styles.module.scss'

import stringToSlug from '../../../services/stringToSlug'

export default function SlugInput(props){

    const slug = stringToSlug(props.value)
    
    return (            
        <div
        className={styles.wrapper}
        style={{
            width: `${props.width}`,
        }}>  
            <label>
                {props.label}
            </label>
            <div
            className={styles.fakeInput}
            >
                <span
                className={styles.urlSpan}
                >
                    {props.url}
                </span>
                <input 
                name={props.name}
                value={slug}
                onChange={props.onChange}
                />
            </div>
        </div>
    )
}