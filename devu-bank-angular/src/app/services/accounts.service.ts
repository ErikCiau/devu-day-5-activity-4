import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private readonly baseUrl = 'http://localhost:3000'
  private readonly defaultOptions = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  constructor(
    private readonly http: HttpClient
  ) { }

  public getAccounts() {
    return this.http.get(`${this.baseUrl}/cuentas`, this.defaultOptions)
  }

  public getOneAccount() {
    return this.http.get(`${this.baseUrl}/cuentas/${this.randomNumber()}`, this.defaultOptions)
  }

  public addAccount() {
    return this.http.post(`${this.baseUrl}/cuentas`, { cents: this.randomNumber(9000000) }, this.defaultOptions)
  }

  public editAccount() {
    return this.http.put(`${this.baseUrl}/cuentas/2`, {
      beneficiary: {
        firstname: 'Erik Antonio',
        lastname: 'Ciau Gómez'
      },
      balance: {
        cents: this.randomNumber(4000)
      }
    }, this.defaultOptions)
  }

  public editAmount() {
    return this.http.patch(`${this.baseUrl}/cuentas/${this.randomNumber()}`, {
      cents: 0
    }, this.defaultOptions)
  }

  public deleteAccount() {
    return this.http.delete(`${this.baseUrl}/cuentas/${this.randomNumber()}`, this.defaultOptions)
  }

  private randomNumber(limit = 2) {
    return Math.ceil(Math.random() * limit)
  }
}
