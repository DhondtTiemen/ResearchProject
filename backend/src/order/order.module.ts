import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { Order } from './entities/order.entity'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'

import { User } from 'src/user/entities/user.entity'
import { Album } from 'src/album/entities/album.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Order, User, Album])],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
