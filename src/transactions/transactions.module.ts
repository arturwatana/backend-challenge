import { Module } from '@nestjs/common';
import { TransactionsController } from './transactions.controller';
import { SendMoneyService } from './serivces/send-money.service';
import { DepositMoneyService } from './serivces/deposit-money.service';
import { UserModule } from 'src/users/user.module';

@Module({
  imports: [UserModule],
  controllers: [TransactionsController],
  providers: [SendMoneyService, DepositMoneyService],
})
export class TransactionsModule {}
