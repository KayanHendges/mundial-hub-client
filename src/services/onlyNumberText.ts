export default function onlyNumberText(text: string): number{
    
    const onlyNumbers = []

    text.split('').map(crt => {
        if(!isNaN(parseInt(crt))){
            onlyNumbers.push(crt)
        }
    })

    if(onlyNumbers.length > 0){
        const returnNumber = onlyNumbers.join('')
        return parseInt(returnNumber)
    }
    
    return 0
}