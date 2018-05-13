import { Component } from '@angular/core'
import { MousePosition } from '../../models/MousePosition'
import { StoreService } from '../../app.store.service'

@Component({
  selector: 'app-tools-coordinates',
  templateUrl: './tools-coordinates.component.html',
  styleUrls: ['./tools-coordinates.component.styl']
})

export class ToolsCoordinatesComponent {
  mousePosition: MousePosition

  constructor(private st: StoreService) { }

  ngOnInit() {
    this.st.coordinates.subscribe(e => this.mousePosition = e)
  }
}
