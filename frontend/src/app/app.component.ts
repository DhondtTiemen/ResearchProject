import { Component } from '@angular/core'
import { AlanService } from './services/alan.service'

@Component({
  selector: 'pm-root',
  template: `<div>
    <app-holder></app-holder>
  </div>`,
})
export class AppComponent {
  pageTitle: string = 'Elpee'
  constructor(private readonly alanService: AlanService) {}
}
