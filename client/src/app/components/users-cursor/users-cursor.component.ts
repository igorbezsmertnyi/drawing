import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core'
import { WorkSpaceP2PService } from '../../containers/work-space/work-space.peer-to-peer.service'
import { RemoteCursor } from '../../models/RemoteCursor'

@Component({
  selector: 'users-cursor',
  templateUrl: './users-cursor.component.html',
  styleUrls: ['./users-cursor.component.styl']
})

export class UsersCursorComponent {
  @ViewChild('cursors') cursors: ElementRef
  cursorsId: Array<any> = []

  constructor(private p2p: WorkSpaceP2PService, private renderer: Renderer2) { }

  ngOnInit() {
    this.p2p.connections.subscribe(e => { this.getConnection(e) })
    this.p2p.disconnected.subscribe(e => { this.removeCursorIfDisconected(e) })
  }

  private getConnection(connections) {
    connections.forEach(conn => {
      conn.on('data', e => { 
        const data = JSON.parse(e)
        this.createUniqueCursor(data.id, conn._id)
        this.setUserCursorPosition(data)
      })
    })
  }

  private removeCursorIfDisconected(id) {
    const index = this.cursorsId.map(c => c.connId).indexOf(id)

    if (index == -1) return

    const c = document.getElementById(this.cursorsId[index].id)
    this.cursors.nativeElement.removeChild(c)
    this.cursorsId.splice(index, 1)
  }

  private createUniqueCursor(id: string, connId: string) {
    if (this.cursorsId.map(c => c.id).indexOf(id) == -1) {
      this.cursorsId.push({ id: id, connId: connId })

      const el = this.renderer.createElement('div')
      el.id = id
      el.className = 'user-cursors__cursor'
      this.renderer.appendChild(this.cursors.nativeElement, el)
    }
  }

  private setUserCursorPosition(cursor: RemoteCursor) {
    const c = document.getElementById(cursor.id)

    if (!c) return
    c.style.transform = `translate(${cursor.positions.posX}px, ${cursor.positions.posY}px)`
  }
}