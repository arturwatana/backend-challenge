import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepositoryMemory } from 'src/users/user.repository';

@Injectable()
export class SendMoneyService {
  constructor(private userRepository: UserRepositoryMemory) {}
  async execute(senderId: string, receiverId: string, value: number) {
    const sender = await this.userRepository.getUserById(senderId);

    if (!sender) {
      throw new HttpException('Sender not found', HttpStatus.BAD_REQUEST);
    }

    if (sender.balance < value) {
      throw new HttpException(
        'Ops, your balance its not suficient to do this transaction',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (sender.isStore) {
      throw new HttpException(
        'Ops, a store cannot send money to another user',
        HttpStatus.BAD_REQUEST,
      );
    }

    const receiver = this.userRepository.getUserById(receiverId);
    if (!receiver) {
      throw new HttpException('Receiver not found', HttpStatus.BAD_REQUEST);
    }

    this.userRepository.sendMoney(sender, receiver, value);
  }
}
