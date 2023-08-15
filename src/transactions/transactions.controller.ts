import { Body, Controller, Post } from '@nestjs/common';
import { SendMoneyService } from './serivces/send-money.service';
import { DepositMoneyService } from './serivces/deposit-money.service';

type SendMoneyRequest = {
  senderId: string;
  receiverId: string;
  value: number;
};

export type DepositRequest = {
  userId: string;
  value: number;
};

@Controller('/transactions')
export class TransactionsController {
  constructor(
    private sendMoneyService: SendMoneyService,
    private depositMoneyService: DepositMoneyService,
  ) {}
  @Post()
  sendMoney(@Body() { receiverId, senderId, value }: SendMoneyRequest) {
    return this.sendMoneyService.execute(senderId, receiverId, value);
  }
  @Post('/deposit')
  depositMoney(@Body() data: DepositRequest) {
    return this.depositMoneyService.execute(data);
  }
}
