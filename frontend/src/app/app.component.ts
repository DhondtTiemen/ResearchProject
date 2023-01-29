import { Component } from '@angular/core'
import { AlanService } from './services/alan.service'

@Component({
  selector: 'pm-root',
  template: `<voice-app-holder></voice-app-holder>`,
})
export class AppComponent {
  pageTitle: string = 'Elpee'

  constructor(private readonly alanService: AlanService) {}
}
