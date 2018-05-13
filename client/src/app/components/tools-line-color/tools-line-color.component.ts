import { Component, OnInit } from '@angular/core'
import { StoreService } from '../../app.store.service'

@Component({
  selector: 'app-tools-line-color',
  templateUrl: './tools-line-color.component.html',
  styleUrls: ['./tools-line-color.component.styl']
})

export class ToolsLineColorComponent {
  selectedColor: string = '#000'

  constructor(private st: StoreService) { }

  changeColor(e) {
    this.selectedColor = e
    this.st.changeLineColor(e)
  }
}
