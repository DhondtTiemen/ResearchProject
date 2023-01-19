import { Component, Input } from '@angular/core'

@Component({
  selector: 'sub-title',
  templateUrl: './subtitle.component.html',
})
export class SubTitle {
  @Input() subTitle: string = 'Sub title'
}
