import { Injectable } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private message: NzMessageService) { }

  displayInfoMessage(msg: string): void {
    this.message.create('info', msg);
  }

  displaySuccessMessage(msg: string): void {
    this.message.create('success', msg);
  }

  displayWarningMessage(msg: string): void {
    this.message.create('warning', msg);
  }

  displayErrorMessage(msg: string): void {
    this.message.create('error', msg);
  }
}
