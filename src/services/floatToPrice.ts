export default function floatToPrice(float: number): string {

    if(!float){
        return ''
    }

    const strArray = float.toFixed(2).replace('.', '').split('')

    if(strArray.length == 3){
        return float.toFixed(2).replace('.', ',')
    }

    const divRest = (strArray.length - 2) % 3 > 0 ? 0 : 1  
    const dotQuantity = Math.floor((strArray.length-2)/3) - divRest

    const result = []
    var dotApplied = 0

    strArray.reverse().map( (n, i) => {
        result.push(n)
        if(i == 1){
            result.push(',')
        }
        if(i > 1){
            if((i - 1) % 3 == 0 && dotApplied < dotQuantity){
                dotApplied = dotApplied + 1
                result.push('.')
            }
        }
    })    

    return result.reverse().join('')
}