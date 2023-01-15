import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'
import { AppNavigationComponent } from './generic/app-navigation.component'
import { SubTitle } from './generic/subtitle.component'
import { GenresComponent } from './genre/genres.component'
import { PreOrderComponent } from './home/pre-orders.component'
import { AllProductsComponent } from './search/all-products.component'
import { ConvertToLongDatePipe } from './pipes/convert-to-date.pipe'
import { AppHolder } from './holders/app-holder.component'
import { AppHeader } from './generic/app-header.component'
import { AppFooter } from './generic/app-footer.component'
import { AlbumsMain } from './album/albums-main.component'
import { AlbumsSub } from './album/albums-sub.component'
import { ConvertToDateCounter } from './pipes/convert-to-counter.pipe'
import { RouterModule } from '@angular/router'
import { AlbumDetailComponent } from './album/album-detail.component'
import {
  LucideAngularModule,
  Home,
  Heart,
  Search,
  ShoppingBag,
  User,
} from 'lucide-angular'
import { LogoComponent } from './generic/logo.component'

@NgModule({
  declarations: [
    AppComponent,
    AppHolder,
    AppHeader,
    AppFooter,

    AppNavigationComponent,
    LogoComponent,

    SubTitle,
    AlbumsMain,
    AlbumsSub,
    GenresComponent,

    AllProductsComponent,
    PreOrderComponent,

    ConvertToLongDatePipe,
    ConvertToDateCounter,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: 'albums', component: AllProductsComponent },
      { path: 'albums/:id', component: AlbumDetailComponent },
      { path: '**', redirectTo: '/', pathMatch: 'full' },
    ]),
    LucideAngularModule.pick({ Home, Heart, Search, ShoppingBag, User }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
