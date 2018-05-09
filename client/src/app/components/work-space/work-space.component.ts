import { Component } from '@angular/core'
import { MousePosition } from '../../models/MousePosition'

@Component({
  selector: 'work-space',
  templateUrl: './work-space.component.html',
  styleUrls: ['./work-space.component.styl']
})

export class WorkSpaceComponent {
  mousePosition: MousePosition = {
    posX: 0,
    posY: 0
  }

  constructor() { }

  mousePositionHandler(e) {
    this.mousePosition.posX = e.posX
    this.mousePosition.posY = e.posY
  }
}
