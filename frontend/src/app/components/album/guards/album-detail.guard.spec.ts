import { TestBed } from '@angular/core/testing'

import { AlbumDetailGuard } from '../guards/album-detail.guard'

describe('AlbumDetailGuard', () => {
  let guard: AlbumDetailGuard

  beforeEach(() => {
    TestBed.configureTestingModule({})
    guard = TestBed.inject(AlbumDetailGuard)
  })

  it('should be created', () => {
    expect(guard).toBeTruthy()
  })
})
