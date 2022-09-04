import { Component } from '@angular/core';
import { AccountsService } from './services/accounts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public allAccounts!: string
  public oneAccount!: string
  public postAccount!: string
  public patchAccount!: string
  public putAccount!: string
  public _deleteAccount!: string

  constructor(
    private readonly accountService: AccountsService
  ) { }

  getAccounts(): void {
    this.accountService.getAccounts().subscribe(response => {
      this.allAccounts = this.jsonToText(response)
    })
  }

  getOneAccount(): void {
    this.accountService.getOneAccount().subscribe(response => {
      this.oneAccount = this.jsonToText(response)
    })
  }

  addAccount(): void {
    this.accountService.addAccount().subscribe(response => {
      this.postAccount = this.jsonToText(response)
    })
  }

  editPartialAccount(): void {
    this.accountService.editAmount().subscribe(response => {
      this.patchAccount = this.jsonToText(response)
    })
  }

  editAccount(): void {
    this.accountService.editAccount().subscribe(response => {
      this.putAccount = this.jsonToText(response)
    })
  }

  deleteAccount(): void {
    this.accountService.deleteAccount().subscribe(response => {
      this._deleteAccount = this.jsonToText(response)
    })
  }



  private jsonToText(object: Object): string {
    return JSON.stringify(object, null, 2)
  }
}
