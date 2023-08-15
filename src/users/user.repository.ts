import { HttpException, HttpStatus } from '@nestjs/common';
import { User } from './entity/user.entity';

export class UserRepositoryMemory {
  users: User[] = [];

  save(data: User) {
    this.users.push(data);
    return data;
  }
  showAll() {
    return this.users;
  }

  sendMoney(sender: User, receiver: User, value: number) {
    sender.balance = sender.balance - value;
    receiver.balance = receiver.balance + value;
  }

  getUserById(userId: string) {
    const user = this.users.find((user) => user.id === userId);
    if (!user) {
      return null;
    }
    return user;
  }

  getUserByEmailOrDocument(userReq: User) {
    const findedUserByEmail = this.users.find(
      (user) => user.email === userReq.email,
    );
    if (findedUserByEmail) {
      return findedUserByEmail;
    }
    const findedUserByDocument = this.users.find(
      (user) => user.document === userReq.document,
    );
    if (findedUserByDocument) {
      return findedUserByDocument;
    }
    return null;
  }

  turnUserIntoStore(userId: string) {
    const user = this.getUserById(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    user.isStore = true;
    return user;
  }
}
