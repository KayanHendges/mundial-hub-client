import styles from './styles.module.scss'

export default function ImageContainer(props){
    return(
        <div
        className={styles.wrapper}
        style={{display: `${props.display}`}}
        >
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
             onBlur={props.leaveInput}
             placeholder={"Adicione a url..."}
            />
            <div className={styles.arrowButtons}>
                <span
                className={styles.arrow}
                onClick={() => (props.onClick("backward", props.name))}
                style={{display: `${props.displayButtons.displayBB}`}}
                >
                    {"<"}
                </span>
                <span
                className={styles.arrow}
                onClick={() => (props.onClick("forward", props.name))}
                style={{display: `${props.displayButtons.displayFB}`}}
                >
                    {">"}
                </span>
            </div>
        </div>
    )
}