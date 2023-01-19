import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common'

import { Order } from './entities/order.entity'
import { OrderService } from './order.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get(':orderId')
  getOrderById(@Param('orderId') orderId: number): Promise<Order> {
    return this.orderService.findOrderById(orderId)
  }

  @Get()
  getOrders(): Promise<Order[]> {
    return this.orderService.findOrders()
  }

  @Post()
  createOrder(@Body() createOrderDto: CreateOrderDto): Promise<Order> {
    return this.orderService.createOrder(createOrderDto)
  }

  @Put()
  updateOrder(@Body() updateOrderDto: UpdateOrderDto): Promise<Order> {
    return this.orderService.updateOrder(updateOrderDto)
  }

  @Delete(':orderId')
  async deleteOrderById(@Param('orderId') orderId: number) {
    return this.orderService.removeOrderById(orderId)
  }
}
