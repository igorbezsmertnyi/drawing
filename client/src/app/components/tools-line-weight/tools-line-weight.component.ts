import { Component } from '@angular/core'
import { StoreService } from '../../app.store.service'

@Component({
  selector: 'app-tools-line-weight',
  templateUrl: './tools-line-weight.component.html',
  styleUrls: ['./tools-line-weight.component.styl']
})

export class ToolsLineWeightComponent {
  selectedWeight: number = 1

  constructor(private st: StoreService) { }

  changeLineWeight() { this.st.changeLineWeight(this.selectedWeight) }
}
