import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-border-button',
  templateUrl: './border-button.component.html',
  styleUrls: ['./border-button.component.scss'],
})
export class BorderButtonComponent implements OnInit {
  @Input()
  text: string;

  constructor() {
    this.text = '';
  }

  ngOnInit(): void {}
}
