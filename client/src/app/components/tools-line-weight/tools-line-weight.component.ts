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

  ngOnInit() { this.arrowCntrol() }
  changeLineWeight() { this.st.changeLineWeight(this.selectedWeight) }

  private arrowCntrol() {
    window.addEventListener('keydown', e => {
      if (e.code == 'ArrowDown') {
        if (this.selectedWeight > 1) this.selectedWeight = this.selectedWeight - 1
      } else if (e.code == 'ArrowUp') {
        this.selectedWeight = this.selectedWeight + 1
      }

      this.st.changeLineWeight(this.selectedWeight)
    })
  }
}
