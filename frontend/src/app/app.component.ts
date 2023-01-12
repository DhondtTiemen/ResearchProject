import { Component } from '@angular/core'

@Component({
  selector: 'pm-root',
  template: `<div class="font-poppins">
    <app-holder></app-holder>
  </div>`,
})
export class AppComponent {
  pageTitle: string = 'Elpee'
}

// <navigation></navigation>

// <sub-title></sub-title>
// <genres></genres>

// <sub-title></sub-title>
// <pre-orders></pre-orders>
