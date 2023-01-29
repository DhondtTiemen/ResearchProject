import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'
import { AppNavigationComponent } from './components/generic/app-navigation.component'
import { SubTitle } from './components/generic/subtitle.component'
import { GenresComponent } from './components/genre/genres.component'
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
  ChevronLeft,
  Trash2,
  Loader2,
} from 'lucide-angular'
import { LogoComponent } from './components/generic/logo.component'
import { HomePageComponent } from './screens/home'
import { FavoritesPageComponent } from './screens/favorites'
import { UserPageComponent } from './screens/user'
import { CartPageComponent } from './screens/cart'
import { AlbumsFavorites } from './components/album/albums-list.component'
import { AlbumDetailGuard } from './components/album/guards/album-detail.guard'
import { GenreDetailComponent } from './components/genre/genre-detail.component'
import { AlbumsCart } from './components/album/albums-cart.component'
import { OrdersCompleted } from './components/order/orders-list.component'
import { VoiceHomePageComponent } from './screens/voice'
import { VoiceAppHolder } from './components/holders/voice-app-holder.component'
import { VoiceSearchGenreComponent } from './components/voice/voice-search-genre.component'
import { VoiceChosenAlbumComponent } from './components/voice/chosen-album.component'
import { VoiceGenrePageComponent } from './screens/voice/genre'
import { VoiceFilterPageComponent } from './screens/voice/filter'
import { VoiceArtistPageComponent } from './screens/voice/artist'
import { VoiceAlbumsTitlePageComponent } from './screens/voice/album'

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
    AlbumsCart,

    GenresComponent,
    GenreDetailComponent,

    HomePageComponent,
    FavoritesPageComponent,
    SearchPageComponent,
    AlbumDetailComponent,
    CartPageComponent,
    UserPageComponent,

    OrdersCompleted,

    ConvertToLongDatePipe,
    ConvertToDateCounter,

    VoiceAppHolder,
    VoiceHomePageComponent,

    VoiceArtistPageComponent,
    VoiceGenrePageComponent,
    VoiceAlbumsTitlePageComponent,

    VoiceFilterPageComponent,

    VoiceSearchGenreComponent,
    VoiceChosenAlbumComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      { path: '', component: HomePageComponent },
      { path: 'favorites', component: FavoritesPageComponent },
      { path: 'albums', component: SearchPageComponent },
      {
        path: 'albums/:id',
        canActivate: [AlbumDetailGuard],
        component: AlbumDetailComponent,
      },
      {
        path: 'genre/:id',
        component: GenreDetailComponent,
      },
      { path: 'cart', component: CartPageComponent },
      { path: 'user', component: UserPageComponent },

      // --- VOICE APP ---
      { path: 'voice', component: VoiceHomePageComponent },

      // SEARCH BY FILTER
      { path: 'voice/artists', component: VoiceArtistPageComponent },
      { path: 'voice/genres', component: VoiceGenrePageComponent },
      { path: 'voice/albums', component: VoiceAlbumsTitlePageComponent },

      // RESULT BY FILTER
      { path: 'voice/filter', component: VoiceFilterPageComponent },

      // CHOSEN ALBUM
      { path: 'voice/album', component: VoiceChosenAlbumComponent },

      // { path: 'voice/artist', component: VoiceSearchArtistComponent },
      // { path: 'voice/genre', component: VoiceSearchGenreComponent },

      { path: '**', redirectTo: '/', pathMatch: 'full' },
    ]),
    LucideAngularModule.pick({
      Home,
      Heart,
      Search,
      ShoppingBag,
      User,
      ChevronLeft,
      Trash2,
      Loader2,
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
