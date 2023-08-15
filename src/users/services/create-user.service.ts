import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IUser, User } from '../entity/user.entity';
import { UserRepositoryMemory } from '../user.repository';

@Injectable()
export class CreateUserService {
  constructor(private userRepository: UserRepositoryMemory) {}
  async execute(data: IUser) {
    const user = User.create(data);
    const userAlreadyExists =
      this.userRepository.getUserByEmailOrDocument(user);
    if (userAlreadyExists) {
      throw new HttpException('User already exists', HttpStatus.BAD_REQUEST);
    }
    this.userRepository.save(user);
    return user;
  }
}
