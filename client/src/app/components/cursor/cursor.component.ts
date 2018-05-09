import { Component, Input } from '@angular/core'
import { MousePosition } from '../../models/MousePosition'

@Component({
  selector: 'app-cursor',
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.styl']
})

export class CursorComponent {
  @Input() mousePosition: MousePosition

  constructor() { }
}
