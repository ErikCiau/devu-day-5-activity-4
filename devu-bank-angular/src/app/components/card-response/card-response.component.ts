import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-response',
  templateUrl: './card-response.component.html',
  styleUrls: ['./card-response.component.scss']
})
export class CardResponseComponent implements OnInit {

  @Input()
  title!: string
  @Input()
  path!: string
  @Input()
  httpMethod!: string
  @Input()
  response: string = ''

  @Output()
  action = new EventEmitter<any>()


  constructor() { }

  ngOnInit(): void {
  }

  onRunResponse() {
    this.action.emit()
  }

  clearResponse() {
    this.response = ''
  }

}
