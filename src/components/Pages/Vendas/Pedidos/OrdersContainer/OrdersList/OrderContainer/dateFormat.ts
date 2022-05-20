import { addHours, differenceInDays, parseISO } from "date-fns"

export default function dateFormat(date: string): string{
    if(!date){
        return ''
    }

    const today = new Date()
    const orderDate = addHours(parseISO(date), 3)
    const differenceDate = differenceInDays(orderDate, today)

    if(differenceDate == 0){
        return 'hoje'
    }

    if(differenceDate == -1){
        return 'ontem'
    }

    if(differenceDate > -7){
        return `${Math.abs(differenceDate)} dias atrás`
    }

    const returnDate = date.split('-').reverse().join('/')

    return returnDate
}


