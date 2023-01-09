import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Artist } from 'src/artist/entities/artist.entity'

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'Test1234!',
  database: 'elpeesdb',
  entities: [Artist],
  synchronize: true,
}
