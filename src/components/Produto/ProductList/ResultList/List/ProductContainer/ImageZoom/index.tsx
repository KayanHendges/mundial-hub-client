import styles from './styles.module.scss';

type ImageZoomProps = {
    imageUrl: string;
    display: string;
    setDisplay(display: string): void;
}

export default function ImageZoom(props: ImageZoomProps){

    if(props.display == 'flex'){
        document.addEventListener('keydown', (event) => {
            if(event.key == 'Escape'){
                props.setDisplay('none')
            }
        })
    }

    return (
        <div
        className={styles.wrapper}
        style={{ display: `${props.display}` }}
        >
            <div
            className={styles.imageBox}
            style={{ backgroundImage: `url(${props.imageUrl})` }}
            >
                <span
                className={styles.close}
                onClick={() => props.setDisplay('none')}
                >
                    X
                </span>
            </div>
        </div>
    )
}