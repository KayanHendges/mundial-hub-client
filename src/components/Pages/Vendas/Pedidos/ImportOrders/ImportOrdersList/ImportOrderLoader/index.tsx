import { useEffect, useState } from 'react';
import ImportOrdersList, { ImportItem } from '..';
import { ImportTrayOrderParams, ImportTrayOrderResponse } from '../../../../../../../services/api/types/Tray/Orders/Orders';
import { useFetch } from '../../../../../../../services/api/useFetch';
import ImportButton from '../../ImportButton';
import styles from './styles.module.scss';

type Props = {
    importList: ImportItem[];
    setImportList(importList: ImportItem[]): void;
    queue: number[]
    addToQueue(idList: number[]): void;
    currentId: number
    id: number
    storeCode: number
    html: boolean
}

export default function ImportOrderLoader(props: Props){

    const [ importItem, setImportItem ] = useState<ImportItem>({
        trayId: props.id,
        importing: false,
        success: null
    })
    const [ startImport, setStartImport ] = useState<boolean>(false)
    const body: ImportTrayOrderParams = { id: props.id, storeCode: props.storeCode }
    const { data, isFetching, error } = useFetch<ImportTrayOrderResponse>('post', '/tray/orders/import/', startImport, body)

    useEffect(() => {

        if(importItem.success != null){
            return
        }

        if(props.currentId == props.id && !startImport && !data){
            setStartImport(true)
        }

    }, [props.currentId])

    useEffect(() => {
        const createdId = data?.createdId

        if(createdId){
            setImportItem({...importItem, importing: false, success: true})
        }
    }, [ data ])

    useEffect(() => {
        if(error){

            console.log(error)
            setImportItem({...importItem, success: false})
        }

    }, [ error ])

    useEffect(() => {

        if(props.queue.includes(props.id) || isFetching){
            setImportItem({...importItem, importing: true})
        } else {
            setImportItem({...importItem, importing: false})
        }

    }, [isFetching, props.queue])

    useEffect(() => {
        const list: ImportItem[] = []
        var hasChanged = false
        
        props.importList?.map( item => {
            if(item.trayId == props.id){
                
                hasChanged = true
                list.push(importItem)
            } else {
                list.push(item)
            }
        })
        
        if(hasChanged){
            props.setImportList(list)
        }
    }, [importItem])

    if(!props.html){
        return <></>
    }

    return (
        <div
        className={styles.wrapper}
        >
            <ImportButton 
            label='importar'
            action={() => {
                props.addToQueue([props.id])
            }}
            importList={[importItem]}
            />
        </div>
    )
}