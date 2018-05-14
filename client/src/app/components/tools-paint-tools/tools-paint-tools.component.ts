import { Component } from '@angular/core'
import { StoreService } from '../../app.store.service'

@Component({
  selector: 'app-tools-paint-tools',
  templateUrl: './tools-paint-tools.component.html',
  styleUrls: ['./tools-paint-tools.component.styl']
})

export class ToolsPaintToolsComponent {
  selectedTool: string = 'pencil'

  constructor(private st: StoreService) { }

  changeTool(toolName) {
    this.selectedTool = toolName
    this.st.changePaintTool(toolName)
  }
}
