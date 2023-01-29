import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http'

import { AppComponent } from './app.component'
import { AppNavigationComponent } from './components/generic/app-navigation.component'
import { SubTitle } from './components/generic/subtitle.component'
import { SearchPageComponent } from './screens/search'
import { ConvertToLongDatePipe } from './pipes/convert-to-date.pipe'
import { AppHolder } from './components/holders/app-holder.component'
import { AppHeader } from './components/generic/app-header.component'
import { AppFooter } from './components/generic/app-footer.component'
import { ConvertToDateCounter } from './pipes/convert-to-counter.pipe'
import { RouterModule } from '@angular/router'
import { AlbumDetailPageComponent } from './components/album/album-detail.component'
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
import { AlbumDetailGuard } from './components/album/guards/album-detail.guard'
import { GenreDetailPageComponent } from './components/genre/genre-detail.component'
import { VoiceHomePageComponent } from './screens/voice'
import { VoiceGenrePageComponent } from './screens/voice/genre'
import { VoiceFilterPageComponent } from './screens/voice/filter'
import { VoiceArtistPageComponent } from './screens/voice/artist'
import { VoiceAlbumsTitlePageComponent } from './screens/voice/title'
import { VoiceChosenAlbumPageComponent } from './screens/voice/album/_id'
import { VoiceFavoritesPageComponent } from './screens/voice/favorites'
import { VoiceCartPageComponent } from './screens/voice/cart'
import { VoiceUserPageComponent } from './screens/voice/user'

@NgModule({
  declarations: [
    // --- PROJECT ---
    AppComponent,
    AppHolder,

    // --- WEBSHOP ---
    // GENERIC
    AppHeader,
    AppFooter,
    AppNavigationComponent,
    LogoComponent,
    SubTitle,

    // NAVIGATION
    HomePageComponent,
    FavoritesPageComponent,
    SearchPageComponent,
    CartPageComponent,
    UserPageComponent,

    // DETAIL
    AlbumDetailPageComponent,
    GenreDetailPageComponent,

    // --- VOICE APP ---
    VoiceHomePageComponent,
    VoiceFavoritesPageComponent,
    VoiceCartPageComponent,
    VoiceUserPageComponent,

    VoiceArtistPageComponent,
    VoiceGenrePageComponent,
    VoiceAlbumsTitlePageComponent,

    VoiceFilterPageComponent,

    VoiceChosenAlbumPageComponent,

    // --- PIPES ---
    ConvertToLongDatePipe,
    ConvertToDateCounter,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot([
      // --- WEBSHOP ---
      // NAVIGATION
      { path: '', component: HomePageComponent },
      { path: 'favorites', component: FavoritesPageComponent },
      { path: 'albums', component: SearchPageComponent },
      { path: 'cart', component: CartPageComponent },
      { path: 'user', component: UserPageComponent },

      // DETAIL
      {
        path: 'albums/:id',
        canActivate: [AlbumDetailGuard],
        component: AlbumDetailPageComponent,
      },
      {
        path: 'genre/:id',
        component: GenreDetailPageComponent,
      },

      // --- VOICE APP ---
      { path: 'voice', component: VoiceHomePageComponent },

      // NAVIGATION
      { path: 'voice/favorites', component: VoiceFavoritesPageComponent },
      { path: 'voice/cart', component: VoiceCartPageComponent },
      { path: 'voice/user', component: VoiceUserPageComponent },

      // SEARCH BY FILTER
      { path: 'voice/artists', component: VoiceArtistPageComponent },
      { path: 'voice/genres', component: VoiceGenrePageComponent },
      { path: 'voice/titles', component: VoiceAlbumsTitlePageComponent },

      // RESULT BY FILTER
      { path: 'voice/filter', component: VoiceFilterPageComponent },

      // CHOSEN ALBUM
      { path: 'voice/album', component: VoiceChosenAlbumPageComponent },

      // --- REDIRECT ---
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
