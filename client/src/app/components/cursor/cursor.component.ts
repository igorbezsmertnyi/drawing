import { Component, Input } from '@angular/core'
import { MousePosition } from '../../models/MousePosition'
import { StoreService } from '../../app.store.service'

@Component({
  selector: 'app-cursor',
  templateUrl: './cursor.component.html',
  styleUrls: ['./cursor.component.styl']
})

export class CursorComponent {
  mousePosition: MousePosition

  constructor(private st: StoreService) { }

  ngOnInit() {
    this.st.coordinates.subscribe(e => this.mousePosition = e)
  }
}
