import { Component } from '@angular/core';

@Component({
  selector: 'app-test-card',
  template: `<div>Card: {{name}}</div>`,
  styles: [`
  :host {
    display: block;
    padding: 32px;
    border: 1px solid black;
    border-radius: 8px;
  }
  `]
})
export class TestCardComponent {
  name: string;

  constructor() {
    this.name = 'Test Card';
  }
}
