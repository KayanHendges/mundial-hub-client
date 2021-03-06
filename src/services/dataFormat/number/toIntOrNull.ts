export default function toIntOrNull(value: string | null | undefined ): number | null{

    if(!value){
        return null
    }

    if(typeof value == 'number'){
        
        const number = parseInt(value)

        if(isNaN(number)){
            return null
        }
        
        return value
    }

    if(value.length == 0){
        return null
    }

    try {
        const number = parseInt(value.replace(',', '').replace('.', ''))

        if(isNaN(number)){
            return null
        }
            
        return number
    } catch (error) {
        console.log(error)
        new Error(error)
        return null
    }
}