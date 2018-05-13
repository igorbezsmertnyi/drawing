import { Component, OnInit } from '@angular/core'
import { StoreService } from '../../app.store.service'

@Component({
  selector: 'app-tools-background-image',
  templateUrl: './tools-background-image.component.html',
  styleUrls: ['./tools-background-image.component.styl']
})

export class ToolsBackgroundImageComponent {
  constructor(private st: StoreService) { }

  changeBgImage(e) {
    const reader = new FileReader()

    reader.onload = () => this.st.changeBgImage(reader.result)
    reader.readAsDataURL(e.target.files[0])
  }
}
