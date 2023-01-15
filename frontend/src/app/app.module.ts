import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'
import { AppNavigationComponent } from './components/generic/app-navigation.component'
import { SubTitle } from './components/generic/subtitle.component'
import { GenresComponent } from './components/genre/genres.component'
import { PreOrderComponent } from './home/pre-orders.component'
import { SearchPageComponent } from './screens/search'
import { ConvertToLongDatePipe } from './pipes/convert-to-date.pipe'
import { AppHolder } from './components/holders/app-holder.component'
import { AppHeader } from './components/generic/app-header.component'
import { AppFooter } from './components/generic/app-footer.component'
import { AlbumsMain } from './components/album/albums-main.component'
import { AlbumsSub } from './components/album/albums-sub.component'
import { ConvertToDateCounter } from './pipes/convert-to-counter.pipe'
import { RouterModule } from '@angular/router'
import { AlbumDetailComponent } from './components/album/album-detail.component'
import {
  LucideAngularModule,
  Home,
  Heart,
  Search,
  ShoppingBag,
  User,
} from 'lucide-angular'
import { LogoComponent } from './components/generic/logo.component'
import { HomePageComponent } from './screens/home'
import { FavoritesPageComponent } from './screens/favorites'
import { UserPageComponent } from './screens/user'
import { CartPageComponent } from './screens/cart'
import { AlbumsFavorites } from './components/album/albums-list.component'

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
    AlbumsFavorites,
    GenresComponent,

    PreOrderComponent,

    HomePageComponent,
    FavoritesPageComponent,
    SearchPageComponent,
    AlbumDetailComponent,
    CartPageComponent,
    UserPageComponent,

    ConvertToLongDatePipe,
    ConvertToDateCounter,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomePageComponent },
      { path: 'favorites', component: FavoritesPageComponent },
      { path: 'albums', component: SearchPageComponent },
      { path: 'albums/:id', component: AlbumDetailComponent },
      { path: 'cart', component: CartPageComponent },
      { path: 'user', component: UserPageComponent },

      { path: '**', redirectTo: '/', pathMatch: 'full' },
    ]),
    LucideAngularModule.pick({ Home, Heart, Search, ShoppingBag, User }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
