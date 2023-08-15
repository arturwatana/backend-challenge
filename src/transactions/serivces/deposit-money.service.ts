import { UserRepositoryMemory } from 'src/users/user.repository';
import { DepositRequest } from '../transactions.controller';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class DepositMoneyService {
  constructor(private userRepository: UserRepositoryMemory) {}
  async execute(data: DepositRequest) {
    const user = this.userRepository.getUserById(data.userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    user.balance = user.balance + data.value;
    return user;
  }
}
