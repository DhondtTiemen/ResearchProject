import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findUserById(userId: number): Promise<User> {
    return this.userRepository.findOne({
      where: { userId: userId },
      relations: ['orders'],
    })
  }

  findUsers(): Promise<User[]> {
    return this.userRepository.find({ relations: ['orders'] })
  }

  createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = new User()
    newUser.uid = createUserDto.uid

    return this.userRepository.save(newUser)
  }

  updateUser(updateUserDto: UpdateUserDto): Promise<User> {
    const update = new User()
    update.userId = updateUserDto.userId
    update.uid = updateUserDto.uid
    update.ordersCount = updateUserDto.ordersCount

    return this.userRepository.save(update)
  }

  async removeUserById(userId: number): Promise<void> {
    await this.userRepository.delete(userId)
  }
}
