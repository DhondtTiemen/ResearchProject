import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('userId/:userId')
  getUserById(@Param('userId') userId: number): Promise<User> {
    return this.userService.findUserById(userId)
  }

  @Get('notCompleted/:userId')
  getNotCompletedOrdersByUserId(
    @Param('userId') userId: number,
  ): Promise<User> {
    return this.userService.findNotCompletedOrdersByUserId(userId)
  }

  @Get('completed/:userId')
  getCompletedOrdersByUserId(@Param('userId') userId: number): Promise<User> {
    return this.userService.findCompletedOrdersByUserId(userId)
  }

  @Get()
  findUsers(): Promise<User[]> {
    return this.userService.findUsers()
  }

  @Post()
  createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.userService.createUser(createUserDto)
  }

  @Put()
  updateUser(@Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.updateUser(updateUserDto)
  }

  @Delete(':userId')
  async deleteUserById(@Param('userId') userId: number) {
    return this.userService.removeUserById(userId)
  }
}
