import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'

import { Observable, catchError, tap, throwError } from 'rxjs'

import { IAlbum } from '../interfaces/album'
import { IArtist } from '../interfaces/artist'
import { IGenre } from '../interfaces/genre'
import { IOrder } from '../interfaces/order'
import { IUser } from '../interfaces/user'

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private basicUrl = 'http://localhost:3003/'

  constructor(private http: HttpClient) {}

  // GET ALL ALBUMS
  getAlbums(): Observable<IAlbum[]> {
    return this.http.get<IAlbum[]>(this.basicUrl + 'album').pipe(
      tap((data) => JSON.stringify(data)),
      catchError(this.handleError),
    )
  }

  // GET POPULAR ALBUMS
  getPopularAlbums(): Observable<IAlbum[]> {
    return this.http.get<IAlbum[]>(this.basicUrl + `album/popular`).pipe(
      tap((data) =>
        JSON.stringify(
          data.sort(
            (a, b) =>
              new Date(b.releaseDate).getTime() -
              new Date(a.releaseDate).getTime(),
          ),
        ),
      ),
      catchError(this.handleError),
    )
  }

  // GET PRE-ORDER ALBUMS
  getPreOrderAlbums(): Observable<IAlbum[]> {
    return this.http.get<IAlbum[]>(this.basicUrl + `album/preorder`).pipe(
      tap((data) => JSON.stringify(data)),
      catchError(this.handleError),
    )
  }

  getAlbumByAlbumId(albumId: number): Observable<IAlbum> {
    return this.http
      .get<IAlbum>(this.basicUrl + `album/albumId/${albumId}`)
      .pipe(
        tap((data) => JSON.stringify(data)),
        catchError(this.handleError),
      )
  }

  updateAlbum(album: IAlbum): Observable<IAlbum> {
    return this.http.put<IAlbum>(this.basicUrl + `album`, album).pipe(
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

  getGenreById(genreId: number): Observable<IGenre> {
    return this.http
      .get<IGenre>(this.basicUrl + `genre/genreId/${genreId}`)
      .pipe(
        tap((data) => JSON.stringify(data)),
        catchError(this.handleError),
      )
  }

  getGenreByName(genreName: string): Observable<IGenre> {
    return this.http
      .get<IGenre>(this.basicUrl + `genre/genreName/${genreName}`)
      .pipe(
        tap((data) => JSON.stringify(data)),
        catchError(this.handleError),
      )
  }

  getArtistById(artistId: number): Observable<IArtist> {
    return this.http.get<IArtist>(this.basicUrl + `artist/${artistId}`).pipe(
      tap((data) => JSON.stringify(data)),
      catchError(this.handleError),
    )
  }

  createOrder(): Observable<IOrder> {
    let order = {
      totalPrice: 0,
      complete: false,
      userUserId: 1,
    }
    return this.http.post<IOrder>(this.basicUrl + `order`, order).pipe(
      tap((data) => JSON.stringify(data)),
      catchError(this.handleError),
    )
  }

  completeOrder(orderId: number): Observable<IOrder> {
    let todayDate = new Date().toISOString()
    todayDate = todayDate.substring(0, 10).toString()
    // console.log(todayDate)

    let order = {
      orderId: orderId,
      orderDate: todayDate,
      complete: true,
    }
    return this.http.put<IOrder>(this.basicUrl + `order`, order).pipe(
      tap((data) => JSON.stringify(data)),
      catchError(this.handleError),
    )
  }

  addAlbumToOrder(orderId: number, albumId: number): Observable<IOrder> {
    let addedAlbum: IAlbum | undefined = undefined
    let errorMessage = ''

    this.getAlbumByAlbumId(albumId).subscribe({
      next: (data) => {
        addedAlbum = data
      },
      error: (err) => (errorMessage = err),
    })

    let order = {
      orderId: orderId,
      totalPrice: 0,
      complete: false,
      userUserId: 1,
      albums: [
        {
          addedAlbum,
        },
      ],
    }
    return this.http.post<IOrder>(this.basicUrl + `order`, order).pipe(
      tap((data) => JSON.stringify(data)),
      catchError(this.handleError),
    )
  }

  getNotCompletedOrdersByUserId(userId: number): Observable<IUser> {
    return this.http
      .get<IUser>(this.basicUrl + `user/notCompleted/${userId}`)
      .pipe(
        tap((data) => JSON.stringify(data)),
        catchError(this.handleError),
      )
  }

  getCompletedOrdersByUserId(userId: number): Observable<IUser> {
    return this.http
      .get<IUser>(this.basicUrl + `user/completed/${userId}`)
      .pipe(
        tap((data) => JSON.stringify(data)),
        catchError(this.handleError),
      )
  }

  getFavoritesByUserId(userId: number): Observable<IUser> {
    return this.http.get<IUser>(this.basicUrl + `user/userId/${userId}`).pipe(
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
