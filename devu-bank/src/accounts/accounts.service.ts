import { Injectable, NotFoundException } from '@nestjs/common';
import { Iaccount, Ibalance } from './interfaces/account.interface';

@Injectable()
export class AccountsService {
  private accounts: Iaccount[] = [
    {
      id: "1",
      beneficiary: {
        firstname: "Erik Antonio",
        lastname: "Ciau Gómez"
      },
      balance: {
        cents: 10000,
        display: "$100.00"
      },
      createdAt: new Date()
    },
    {
      id: "2",
      beneficiary: {
        firstname: "Lucia Rocio",
        lastname: "Gómez Uc"
      },
      balance: {
        cents: 20000,
        display: "$200.00"
      },
      createdAt: new Date()
    }
  ]

  public findAll(): Iaccount[] {
    return this.accounts
  }

  public create(balance: Ibalance){
    const account = {
      id: this.uuid(),  
      beneficiary: {
        firstname: 'XXX XXX-XXX',
        lastname: 'XXX-XXX-XXX'
      },
      balance: {
        cents: balance.cents,
        display: `$${balance.cents / 100}`
      },
      createdAt: new Date()
    }
    this.accounts.push(account)

    return account
  }

  public findOne(id: string): Iaccount | null {
    return this.accounts.find(account => account.id == id)
  }

  public update(id: string, balance: number): Iaccount {
    const account = this.findOne(id)
    if (!account) {
      throw new NotFoundException('INVALID_ACCOUNT')
    }
    account.balance.cents = balance * 100
    account.balance.display = `$${balance / 100}`
    return account
  }

  public updateBalance(id: string, account: Iaccount) {
    const indexBalance = this.accounts.findIndex(item => item.id === id) 
    this.accounts.splice(indexBalance, 1)

    const accountCreated =  {
      ...account,
      id: account.id,
      balance: {
        cents: account.balance.cents * 100,
        display: `$${account.balance.cents * 100 / 100}`
      },
      createdAt: new Date()
    }

    this.accounts.push(accountCreated)
    return this.findOne(accountCreated.id)
  }

  public delete(id: string): Iaccount[] {
    this.accounts = this.accounts.filter(account => account.id !== id)
    return this.accounts
  }

  private uuid(): string {
    return Math.ceil(Math.random() * 100).toString()
  }
}
