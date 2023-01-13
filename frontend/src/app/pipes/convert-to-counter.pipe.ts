import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'convertToDateCounter',
})
export class ConvertToDateCounter implements PipeTransform {
  transform(value: string): number {
    const releaseDate = new Date(value)
    const todayDate = new Date()

    const counter = releaseDate.getDate() - todayDate.getDate()
    return counter
  }
}
