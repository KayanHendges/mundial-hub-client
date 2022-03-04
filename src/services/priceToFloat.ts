export default function priceToFloat(str: string): number {

    const crtWhiteList = [0,1,2,3,4,5,6,7,8,9]

    if(str.length == 0){
        return 0
    }

    const cleanStr = []
    var firstCrtNotZero = false
    str.split('').map( crt => {
        if(!firstCrtNotZero && crt != '0'){
            firstCrtNotZero = true
        }
        if(crtWhiteList.includes(parseInt(crt)) && firstCrtNotZero){
            cleanStr.push(crt)
        }
    })

    const string: any = cleanStr.join('')

    if(string.length == 0){
        return 0
    }

    const number = parseInt(string)

    // if(string.length == 1){
    //     return number
    // }

    // if(string.length == 2){
    //     return number
    // }

    const floatNumber = number/100

    return floatNumber
}