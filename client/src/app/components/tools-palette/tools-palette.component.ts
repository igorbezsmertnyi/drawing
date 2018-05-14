import { Component } from '@angular/core'
import { StoreService } from '../../app.store.service'

@Component({
  selector: 'app-tools-palette',
  templateUrl: './tools-palette.component.html',
  styleUrls: ['./tools-palette.component.styl']
})

export class ToolsPaletteComponent {
  selectedColor: string = '#000000'
  colorList: Array<string> = [
    '#FFFFFF',
    '#000000',
    '#9400D3',
    '#4B0082',
    '#0000FF',
    '#00FF00',
    '#FFFF00',
    '#FF7F00',
    '#FF0000'
  ]

  constructor(private st: StoreService) { }

  changeColor(e) {
    this.selectedColor = e
    this.st.changeColor(e)
  }
}
