import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

import { Observable, catchError, tap, throwError } from 'rxjs'

import { IAlbum } from '../interfaces/album'
import { IArtist } from '../interfaces/artist'
import { IGenre } from '../interfaces/genre'

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private basicUrl = 'http://localhost:3003/'

  constructor(private http: HttpClient) {}

  getAlbums(): Observable<IAlbum[]> {
    return this.http.get<IAlbum[]>(this.basicUrl + 'album').pipe(
      tap((data) => JSON.stringify(data)),
      catchError(this.handleError),
    )
  }

  getGenres(): Observable<IGenre[]> {
    return this.http.get<IGenre[]>(this.basicUrl + 'genre').pipe(
      tap((data) => JSON.stringify(data)),
      catchError(this.handleError),
    )
  }

  getArtistById(artistId: number): Observable<IArtist> {
    return this.http
      .get<IArtist>(this.basicUrl + `artist/artistId/${artistId}`)
      .pipe(
        tap((data) => JSON.stringify(data)),
        catchError(this.handleError),
      )
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = ''
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`
    }
    console.error(errorMessage)
    return throwError(errorMessage)
  }
}