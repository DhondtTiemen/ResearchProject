import { Injectable } from '@nestjs/common'

import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'

import { Order } from './entities/order.entity'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'

import { User } from 'src/user/entities/user.entity'

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findOrderById(orderId: number): Promise<Order> {
    return this.orderRepository.findOne({
      where: { orderId: orderId },
      relations: ['albums'],
    })
  }

  findOrders(): Promise<Order[]> {
    return this.orderRepository.find({ relations: ['albums'] })
  }

  async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
    const userId = createOrderDto.userId
    const user = await this.userRepository.findOneBy({ userId })

    const newOrder = this.orderRepository.create({ ...createOrderDto, user })
    return this.orderRepository.save(newOrder)
  }

  async updateOrder(updateOrderDto: UpdateOrderDto): Promise<Order> {
    const update = new Order()
    update.orderId = updateOrderDto.orderId
    update.totalPrice = updateOrderDto.totalPrice

    const userId = updateOrderDto.userId
    const user = await this.userRepository.findOneBy({ userId })

    const updateOrder = this.orderRepository.create({
      ...updateOrderDto,
      user,
    })
    return this.orderRepository.save(updateOrder)
  }

  async removeOrderById(orderId: number): Promise<void> {
    await this.orderRepository.delete(orderId)
  }
}
