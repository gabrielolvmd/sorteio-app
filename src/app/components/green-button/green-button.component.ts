import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-green-button',
  templateUrl: './green-button.component.html',
  styleUrls: ['./green-button.component.scss'],
})
export class GreenButtonComponent implements OnInit {
  @Input()
  text: String;

  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  constructor() {
    this.text = '';
  }

  onClick() {
    this.buttonClick.emit();
  }

  ngOnInit(): void {}
}
