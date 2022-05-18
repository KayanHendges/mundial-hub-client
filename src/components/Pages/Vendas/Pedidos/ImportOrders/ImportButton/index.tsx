import { isThisSecond } from 'date-fns';
import { CSSProperties, MouseEvent, ReactElement } from 'react';
import { ImportItem } from '../ImportOrdersList';
import styles from './styles.module.scss'

type Props = {
    label: string
    action(clickEvent: MouseEvent): void;
    importList: ImportItem[]
    css?: CSSProperties
}

export default function ImportButton(props: Props){

    const { label, action, importList } = props 

    const css: CSSProperties = {
        ...props?.css
    }

    function setLabel(label: string): string{

        if(importList.length == 1){
            const { importing, success } = importList[0]

            if(success){
                return 'importado'
            }

            if(success == false){
                return 'falha'
            }

            if(importing) {
                return 'importando'
            }

            return label
        }

        if(importList.length > 1){

            var successLength = 0
            var importing = false

            importList?.map( item => {
                if(item.importing){
                    importing = true
                }
                if(item.success){
                    successLength += 1
                }
            })

            if(!importing){
                return label
            }

            return `importando ${Math.floor((successLength/importList.length)*100)}%`
        }

        return label
    }

    function statusIcon(): ReactElement{
        if(importList.length != 1){
            return
        }

        const item = importList[0]

        if(item.success == true){
            const icon = <span
            className="material-icons-round"
            id={styles.resultIcon}
            style={{ color: '#00D848' }}
            >
            check_circle_outline
            </span>

            return icon
        }

        if(item.success == false){
            const icon = <span
            className="material-icons-round"
            id={styles.resultIcon}
            style={{ color: '#E83C3C' }}
            >
            check_circle_outline
            </span>

            return icon
        }

        if(item.importing){
            const icon = <span
            className="material-icons-round"
            id={styles.loadingIcon}
            >
                autorenew
            </span>

            return icon
        }

        return
    }

    function statusBackground(): CSSProperties{
        if(importList.length != 1){
            return {}
        }

        const item = importList[0]

        if(item.success == true){
            return {
                border: '2px solid #00D848'
            }
        }

        if(item.success == false){
            return {
                border: '2px solid #E83C3C'
            }
        }

        return {}
    }

    function loadingBar(): ReactElement {
        if(importList.length < 2){
            return
        }

        var successLength = 0

        importList?.map( item => {
            if(item.success){
                successLength += 1
            }
        })

        const percent = Math.floor((successLength/importList.length)*100)

        return <div
        className={styles.loadingBar}
        style={{
            width: `${percent}%`,
        }}
        >   
        </div>
    }

    return (
        <div
        className={styles.wrapper}
        style={{...css}}
        >
            <button
            type='button'
            style={statusBackground()}
            onClick={e => {
                action(e)
            }}
            >
                <span
                className={styles.label}
                >
                    {setLabel(label)}
                </span>
                {statusIcon()}
                {loadingBar()}
            </button>
        </div>
    )
}