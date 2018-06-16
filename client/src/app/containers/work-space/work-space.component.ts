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
  windowWidth: number
  windowHeight: number

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

    this.windowWidth = window.innerWidth - 168
    this.windowHeight = window.innerHeight
  }

  private async uploadImage() {
    const artboardsContainer = <any>document.getElementById('remotertboards')
    const artBoards = [].slice.call(artboardsContainer.querySelectorAll('canvas'))
    const artBoard = <HTMLCanvasElement>document.getElementById('artBoard')

    artBoards.push(artBoard)

    const img = await this.combineCanvases(artBoards)

    if (!artBoard) return
    const dataURL = img.replace(/^data:image\/(png|jpg);base64,/, "")

    this.workSpace.updateArtBoard(this.slugId, dataURL).subscribe(res => res)
  }

  private async combineCanvases(artboards) {
    let tmpCnavas = document.createElement('canvas')
    tmpCnavas.width = this.windowWidth
    tmpCnavas.height = this.windowHeight
    let tmpCtx = tmpCnavas.getContext('2d')

    artboards.reverse().forEach(async a => { tmpCtx.drawImage(a, 0, 0) })

    return await tmpCnavas.toDataURL()
  }

  private connectToHub() {
    this.workSpace.connect(this.slugId)
    this.workSpace.onOpen().subscribe(() => { this.p2p.sendNewCommand() })
    this.workSpace.onMessage().subscribe(res => { this.p2p.messageController(res) })
  }
}
