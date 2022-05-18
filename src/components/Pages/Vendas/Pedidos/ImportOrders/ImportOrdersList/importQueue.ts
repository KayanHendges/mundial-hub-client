import { useState, useEffect } from 'react';

export default function importQueue(){
    const [ queue, setQueue ] = useState<number[]>([]) 
    const [ currentId, setCurrentId ] = useState<number | null>(null)
    const [ importing, setImporting ] = useState<boolean>(false)
    const [ removeFirst, setRemoveFirst ] = useState<boolean>(false)

    function addToQueue(addList: number[]){
        const pushList = []
        addList.map(id => {
            if(queue.includes(id)){
                return
            }
            pushList.push(id)
        })
        setQueue([...queue, ...pushList])
    }

    useEffect(() => {
        if(!importing && queue.length > 0){
            setImporting(true)
        }
    }, [queue.length, importing])

    useEffect(() => {
        
        const newQueue = queue
        newQueue.shift()
        setQueue(newQueue)

        setImporting(false)
    }, [removeFirst])

    useEffect(() => {

        if(importing && queue.length > 0){
           setCurrentId(queue[0]) 
           setTimeout(() => {

                setRemoveFirst(!removeFirst)
           }, 340)
        } else {
            setCurrentId(null)
        }

    }, [importing])

    return { queue, currentId, setQueue, addToQueue }    
}