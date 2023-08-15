import { HttpException, HttpStatus } from '@nestjs/common';
import { randomUUID } from 'crypto';

export type IUser = {
  name: string;
  email: string;
  document: string;
  isStore: boolean;
};

export class User {
  id: string;
  name: string;
  email: string;
  document: string;
  balance: number;
  isStore: boolean;

  private constructor({ name, isStore, document, email }: IUser) {
    if (!name || !document || !email) {
      throw new HttpException(
        'Ops, some fields are missing!',
        HttpStatus.BAD_REQUEST,
      );
    }
    this.id = randomUUID();
    this.name = name;
    this.email = email;
    this.document = document;
    this.balance = 0;
    this.isStore = isStore || false;
  }

  static create(data: IUser) {
    const user = new User(data);
    return user;
  }
}
