import { useState } from 'react'
import styles from './styles.module.scss'

type Props = {
    active: boolean;
}

type PopUpDimensions = {
    height: string;
    width: string;
}

export default function PopUpVideo(props: Props){

    const [ videoId, setViderId ] = useState<string>('ABVQXgr2LW4')
    const [ resumeTab, setResumeTab ] = useState<boolean>(false)
    const [ leftPosition, setLeftPosition ] = useState<number>(60)
    const [ clientX, setClientX ] = useState<number>(0)

 
    if(props.active){
        return (
            <div
            className={styles.wrapper}
            style={{
                left: `${leftPosition}px`
            }}
            >
                <div
                className={styles.tools}
                >
                    <input
                    className={styles.videoIdInput}
                    type="text" 
                    value={videoId}
                    onChange={(e) => setViderId(e.target.value)}
                    />
                    <span 
                    className="material-icons-round"
                    id={styles.dragIcon}
                    
                    >
                        drag_indicator
                    </span>
                </div>
                <div
                className={styles.iframe}
                >
                    <iframe
                    src={`https://www.youtube.com/embed/${videoId}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Embedded youtube"
                    />
                </div>
            </div>
        )
    } else {
        return <></>
    }

}