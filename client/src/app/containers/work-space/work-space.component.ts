import { Component } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { WorkSpaceService } from './work-space.service'
import { WorkSpaceP2PService } from './work-space.peer-to-peer.service'
import { StoreService } from '../../app.store.service'

@Component({
  selector: 'work-space',
  templateUrl: './work-space.component.html',
  styleUrls: ['./work-space.component.styl']
})

export class WorkSpaceComponent {
  slugId: string = ''

  constructor(private activatedRoute: ActivatedRoute, private workSpace: WorkSpaceService, 
              private st: StoreService, private router: Router, private p2p: WorkSpaceP2PService) {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        this.slugId = params.id
        this.st.proccessing.subscribe(e => { !e && this.uploadImage() })
        this.workSpace.getArtBoard(params.id).subscribe(res => { 
          if (res.image != '') this.st.changeBgImage(res.image)
          this.connectToHub()
        })
      } else {
        this.workSpace.createArtBoard().subscribe(res => { this.router.navigate(['artboard', res.slug]) })
      }
    })
  }

  private uploadImage() {
    const artBoard = <HTMLCanvasElement>document.getElementById('artBoard')
    if (!artBoard) return
    const dataURL = artBoard.toDataURL().replace(/^data:image\/(png|jpg);base64,/, "")

    this.workSpace.updateArtBoard(this.slugId, dataURL).subscribe(res => res)
  }

  private connectToHub() {
    this.workSpace.connect(this.slugId)
    this.workSpace.onOpen().subscribe(() => { this.p2p.sendNewCommand() })
    this.workSpace.onMessage().subscribe(res => { this.p2p.messageController(res) })
  }
}
