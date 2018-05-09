import { Component, Output, EventEmitter } from '@angular/core'
import { MousePosition } from '../../models/MousePosition'

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.styl']
})

export class AreaComponent {
  mousePosition: MousePosition = {
    posX: 0,
    posY: 0
  }

  @Output() onMouseMove = new EventEmitter<MousePosition>()

  constructor() { }

  coordinates(e) {
    this.mousePosition.posX = e.clientX
    this.mousePosition.posY = e.clientY
    this.onMouseMove.emit(this.mousePosition)
  }
}
