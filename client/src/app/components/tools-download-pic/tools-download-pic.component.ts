import { Component } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'

@Component({
  selector: 'app-tools-download-pic',
  templateUrl: './tools-download-pic.component.html',
  styleUrls: ['./tools-download-pic.component.styl']
})

export class ToolsDownloadPicComponent {
  localBaseURL: string = '/static/tmp/'
  prodBaseURL: string = 'https://s3.eu-central-1.amazonaws.com/drawingjs/'
  imgPath: string = ''

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        const base = window.location.hostname === 'localhost' ? this.localBaseURL : this.prodBaseURL
        this.imgPath = `${base}${params.id}.png`
      }
    })
  }
}
