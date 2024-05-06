import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-emergent-message',
  standalone: true,
  imports: [],
  templateUrl: './emergent-message.component.html',
  styleUrl: './emergent-message.component.scss'
})
export class EmergentMessageComponent {
  @Input() color!: string;
  @Input() mensaje!: string;
}
