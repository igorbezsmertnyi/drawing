import { Component } from '@angular/core'
import { StoreService } from '../../app.store.service'

@Component({
  selector: 'app-tools-background-color',
  templateUrl: './tools-background-color.component.html',
  styleUrls: ['./tools-background-color.component.styl']
})

export class ToolsBackgroundColorComponent {
  selectedColor: string = '#fff'

  constructor(private st: StoreService) { }

  changeColor(e) {
    this.selectedColor = e
    this.st.changeBgColor(e)
  }
}
