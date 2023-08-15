import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { CreateUserService } from './services/create-user.service';
import { UserRepositoryMemory } from './user.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [CreateUserService, UserRepositoryMemory],
  exports: [UserRepositoryMemory],
})
export class UserModule {}
