import styles from './styles.module.scss'

type Props = {
    text: string;
    onClickFunction?(): any;
    display: boolean;
}

export default function HandleCategoryButton(props: Props){

    const display = props.display != undefined? props.display : true 

    const style = {
        display: `${display? 'flex' : 'none'}`
    }
    
    return (
        <span
        className={styles.button}
        onClick={() => props.onClickFunction()}
        style={style}
        >
            {props.text}
        </span>
    )
}