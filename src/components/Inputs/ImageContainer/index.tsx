import styles from './styles.module.scss'

export default function ImageContainer(props){

    return(
        <div className={styles.wrapper}>
            <div 
            className={styles.imageContainer}
            style={{
                backgroundImage: `url(${props.url})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
                
            }}>
            </div>
            <input
             type="text"
             name={props.name}
             value={props.url}
             onChange={props.onChange}
            />
        </div>
    )
}