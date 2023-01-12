import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'
import { NavigationComponent } from './generic/navigation/navigation.component'
import { SubTitle } from './generic/subtitle.component'
import { GenresComponent } from './home/genres.component'
import { PreOrderComponent } from './home/pre-orders.component'
import { AllProductsComponent } from './search/all-products.component'
import { ConvertToDatePipe } from './generic/pipes/convert-to-date.pipe'
import { AppHolder } from './holders/app-holder.component'
import { AppHeader } from './generic/app-header.component'
import { AppFooter } from './generic/app-footer.component'
import { AlbumsMain } from './album/albums-main.component'

@NgModule({
  declarations: [
    AppComponent,
    AppHolder,
    AppHeader,
    AppFooter,

    SubTitle,
    AlbumsMain,

    NavigationComponent,
    AllProductsComponent,
    GenresComponent,
    PreOrderComponent,
    ConvertToDatePipe,
  ],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
