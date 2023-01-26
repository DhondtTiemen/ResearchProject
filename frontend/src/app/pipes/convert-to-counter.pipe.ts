import { Pipe, PipeTransform } from '@angular/core'

@Pipe({
  name: 'convertToDateCounter',
})
export class ConvertToDateCounter implements PipeTransform {
  transform(value: string): number {
    const releaseDate = new Date(value)
    const todayDate = new Date()

    const differenceTime = releaseDate.getTime() - todayDate.getTime()
    const counter = Math.round(differenceTime / (1000 * 3600 * 24))
    return counter
  }
}
