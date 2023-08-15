import { Body, Controller, Get, Post } from '@nestjs/common';
import { IUser } from './entity/user.entity';
import { UserRepositoryMemory } from './user.repository';
import { CreateUserService } from './services/create-user.service';

type turnUserIntoStoreRequest = {
  userId: string;
};

@Controller('/users')
export class UserController {
  constructor(
    private createUserService: CreateUserService,
    private userRepositiory: UserRepositoryMemory,
  ) {}

  @Post()
  saveUser(@Body() data: IUser) {
    return this.createUserService.execute(data);
  }

  @Post('/store')
  turnUserIntoStore(@Body() data: turnUserIntoStoreRequest) {
    return this.userRepositiory.turnUserIntoStore(data.userId);
  }

  @Get()
  getAllUsers() {
    return this.userRepositiory.showAll();
  }
}
