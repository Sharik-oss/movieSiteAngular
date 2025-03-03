import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-card',
  standalone: false,

  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() image = '';
  @Input() description = '';
  @Input() cardStyle = 'card';
}
