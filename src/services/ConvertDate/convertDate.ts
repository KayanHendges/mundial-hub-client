export default function convertDate (date: string): string {

    if(date.length > 0){
        
        const newDate: string[] = []        

        const splitted = date.split('/').reverse().join('-')

        return date.split('/').reverse().join('-')
    }

    return date
}