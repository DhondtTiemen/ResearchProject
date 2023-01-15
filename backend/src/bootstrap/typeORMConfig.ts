import { TypeOrmModuleOptions } from '@nestjs/typeorm'

import { Artist } from 'src/artist/entities/artist.entity'
import { Album } from 'src/album/entities/album.entity'
import { Track } from 'src/track/entities/track.entity'
import { Genre } from 'src/genre/entities/genre.entity'
import { Order } from 'src/order/entities/order.entity'
import { User } from 'src/user/entities/user.entity'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Test1234!',
  database: 'elpeesdb',
  entities: [Artist, Album, Track, Genre, User, Order],
  synchronize: true,
}
