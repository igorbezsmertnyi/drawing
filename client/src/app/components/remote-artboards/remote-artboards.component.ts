import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core'
import { WorkSpaceP2PService } from '../../containers/work-space/work-space.peer-to-peer.service'
import DrawFunction from '../../helper/drawFunction'

@Component({
  selector: 'remote-artboards',
  templateUrl: './remote-artboards.component.html',
  styleUrls: ['./remote-artboards.component.styl']
})

export class RemoteArtboardsComponent {
  @ViewChild('artboards') artboards: ElementRef 
  cursorsId: Array<any> = []
  windowWidth: string
  windowHeight: string

  constructor(private renderer: Renderer2, private p2p: WorkSpaceP2PService) {
    this.windowWidth = (window.innerWidth - 168).toString()
    this.windowHeight = window.innerHeight.toString()

    this.p2p.connections.subscribe(e => { this.getConnection(e) })
  }

  private getConnection(connections) {
    connections.forEach(conn => {
      conn.on('data', e => { 
        const data = JSON.parse(e)
        const artboard  = this.findArtboard(data.id)

        if (artboard) {
          if (!data.proccessing) artboard.ctx.beginPath()
          if (data.proccessing) DrawFunction(artboard.ctx, data.drawParam, data.positions, this.windowWidth, this.windowHeight)
        }

        if (data.proccessing) this.createUniqueCursor(data.id, conn._id)
      })
    })
  }

  private createUniqueCursor(id: string, connId: string) {
    if (this.cursorsId.map(c => c.id).indexOf(id) == -1) {
      const el = this.renderer.createElement('canvas')
      this.renderer.setAttribute(el, 'id', id)
      this.renderer.setAttribute(el, 'width', this.windowWidth)
      this.renderer.setAttribute(el, 'height', this.windowHeight)
      this.renderer.appendChild(this.artboards.nativeElement, el)

      this.cursorsId.push({ id: id, connId: connId, ctx: el.getContext('2d') })
    }
  }

  private findArtboard(id) {
    return this.cursorsId.find(c => c.id === id)
  }
}
