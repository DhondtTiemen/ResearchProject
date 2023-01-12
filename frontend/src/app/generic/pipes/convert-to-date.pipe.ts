import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'convertToDate',
})
export class ConvertToDatePipe implements PipeTransform {
  transform(value: string): string {
    const fullDate = new Date(value)
    const date = fullDate.getDate()
    const month = fullDate.toLocaleString('default', { month: 'long' })
    const year = fullDate.getFullYear()
    const stringDate = `${date} ${month} ${year}`
    return stringDate
  }
}
