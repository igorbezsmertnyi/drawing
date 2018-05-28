import { Component } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { MousePosition } from '../../models/MousePosition'
import { WorkSpaceService } from './work-space.service'
import { StoreService } from '../../app.store.service'

@Component({
  selector: 'work-space',
  templateUrl: './work-space.component.html',
  styleUrls: ['./work-space.component.styl']
})

export class WorkSpaceComponent {
  slugId: string = ''

  constructor(private activatedRoute: ActivatedRoute, private workSpace: WorkSpaceService, private st: StoreService, private router: Router) {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        this.st.proccessing.subscribe(e => { !e && this.uploadImage() })
        this.workSpace.getArtBoard(params.id).subscribe(res => { 
          if (res.image != '') this.st.changeBgImage(res.image)
          this.slugId = res.slug
        })
      } else {
        this.workSpace.createArtBoard().subscribe(res => {
          this.router.navigate(['artboard', res.slug])
          this.slugId = res.slug
        })
      }
    })
  }

  private uploadImage() {
    const artBoard = <HTMLCanvasElement>document.getElementById('artBoard')
    const dataURL = artBoard.toDataURL().replace(/^data:image\/(png|jpg);base64,/, "")

    this.workSpace.updateArtBoard(this.slugId, dataURL).subscribe(res => res)
  }
}
