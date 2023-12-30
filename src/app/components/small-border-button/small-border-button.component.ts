import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-small-border-button',
  templateUrl: './small-border-button.component.html',
  styleUrls: ['./small-border-button.component.scss'],
})
export class SmallBorderButtonComponent implements OnInit {
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
