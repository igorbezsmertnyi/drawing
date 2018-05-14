import { Component, Input } from '@angular/core'
import { MousePosition } from '../../models/MousePosition'
import { DrawParam, initialDrawParam } from '../../models/DrawParam'
import { StoreService } from '../../app.store.service'

@Component({
  selector: 'app-cursor',
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.styl']
})

export class CursorComponent {
  mousePosition: MousePosition
  drawParm: DrawParam = initialDrawParam
  hex: string = '#000000'
  invertedColor: string = '#000000'

  constructor(private st: StoreService) { }

  ngOnInit() {
    this.st.coordinates.subscribe(e => this.mousePosition = e)
    this.st.lineWeight.subscribe(e => this.drawParm.lineWeight = e)
    this.st.paintTool.subscribe(e => this.drawParm.paintTool = e)
    this.st.color.subscribe(e => this.hex = e)
    this.st.proccessing.subscribe(e => e && this.invertColor())
  }

  private invertColor() {
    if (this.hex.indexOf('#') === 0) this.hex = this.hex.slice(1)
    if (this.hex.length === 3) {
      this.hex = this.hex[0] + this.hex[0] + this.hex[1] + this.hex[1] + this.hex[2] + this.hex[2]
    } 
   
    const r = (255 - parseInt(this.hex.slice(0, 2), 16)),
          g = (255 - parseInt(this.hex.slice(2, 4), 16)),
          b = (255 - parseInt(this.hex.slice(4, 6), 16))

    const sum = r + g + b

    if (sum > 382.5) {
      this.invertedColor = '#ffffff'
    } else {
      this.invertedColor = '#000000'
    }
  }
}
