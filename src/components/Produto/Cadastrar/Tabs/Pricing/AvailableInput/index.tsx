import styles from './styles.module.scss'

type Props = {
    text: string;
    handleFunction?(): void;
    ballColor?: string;
}

export default function AvailableInput(props: Props){

    const style = {
        width: `${(props.text.length*.7)+1.5}rem`
    }

    const ballStyle = {
        display: `${props.ballColor? 'flex' : 'none'}`,
        border: `.18rem solid ${props.ballColor}`
    }

    return (
        <div
        className={styles.wrapper}
        onClick={() => props.handleFunction()}
        style={style}
        >
            <span
            className={styles.ball}
            style={ballStyle}
            />
            <span
            className={styles.text}
            >
                {props.text}
            </span>
        </div>
    )
}