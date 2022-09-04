import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { Iaccount, Ibalance } from './interfaces/account.interface';

@Controller('cuentas')
export class AccountsController {
  
  constructor(private readonly accountService: AccountsService){}

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(){ 
    return this.accountService.findAll()
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOneById(@Param('id') id: string){
    return this.accountService.findOne(id)
  }
  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() balance: Ibalance){
    return this.accountService.create(balance)
  }
  
  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updateBalanceAmount(@Param('id') id: string,  @Body('amount') amount: number){
    return this.accountService.update(id, amount)
  }
  
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  updateBalance(@Param('id') id: string, @Body() account: Iaccount){
    return this.accountService.updateBalance(id, account)
  }
  
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id')id: string){
    return this.accountService.delete(id)
  }
}

