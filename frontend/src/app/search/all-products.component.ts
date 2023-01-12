import { Component, OnInit } from '@angular/core'
import { ConfigService } from '../config/config.service'
import { IAlbum } from '../interfaces/album'

@Component({
  selector: 'all-products',
  templateUrl: './all-products.component.html',
})
export class AllProductsComponent implements OnInit {
  private _productsFilter: string = ''
  get productsFilter(): string {
    return this._productsFilter
  }
  set productsFilter(value: string) {
    this._productsFilter = value
    this.filteredProducts = this.performFilter(value)
    console.log(this.filteredProducts)
  }

  constructor(private configService: ConfigService) {}

  filteredProducts: IAlbum[] = []
  allProducts: IAlbum[] = []

  errorMessage: string = ''

  performFilter(searchInput: string): IAlbum[] {
    searchInput = searchInput.toLocaleLowerCase()
    console.log(searchInput)

    return this.allProducts.filter((album: IAlbum) =>
      album.title.toLocaleLowerCase().includes(searchInput),
    )
  }

  ngOnInit(): void {
    this.configService.getProducts().subscribe({
      next: (allProducts) => {
        this.allProducts = allProducts
        this.filteredProducts = this.allProducts
      },
      error: (err) => (this.errorMessage = err),
    })
  }
}
