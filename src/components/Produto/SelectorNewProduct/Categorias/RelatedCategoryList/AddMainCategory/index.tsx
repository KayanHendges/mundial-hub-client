import styles from './styles.module.scss'

export default function AddMainCategory(props){
    
    let showInfo = {
        display: "flex",
        text: "",
        icon: ""
    }

    function displayButton(displayId, id) {
        if(props.selectedCategory == id){
            showInfo = {
                display: "flex",
                text: "categoria principal",
                icon: ""
            }
        } else {
            if(displayId == id){
                showInfo = {
                    display: props.mainCategory.display,
                    text: props.mainCategory.text,
                    icon: "+"
                }
            } else {
                showInfo = {
                    display: "none",
                    text: "",
                    icon: ""
                    }
            }
        }
    }

    displayButton(props.mainCategory.displayId, props.id)
    
    return(
        <button
        className={styles.button}
        style={{
            display: `${showInfo.display}`,
            border: `${props.mainCategory.borderColor}`
        }}
        type="button"
        onClick={() => props.setValue("mainCategoryId", props.id)}
        >
            <span
            className={styles.addIcon}
            >
                {showInfo.icon}
            </span>
            {showInfo.text}
        </button>
    )
}