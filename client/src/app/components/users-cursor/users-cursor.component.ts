import { Component, Renderer2, ViewChild, ElementRef } from '@angular/core'
import { WorkSpaceP2PService } from '../../containers/work-space/work-space.peer-to-peer.service'

@Component({
  selector: 'users-cursor',
  templateUrl: './users-cursor.component.html',
  styleUrls: ['./users-cursor.component.styl']
})

export class UsersCursorComponent {
  @ViewChild('cursors') cursors: ElementRef
  cursorsId: Array<string> = []
  currentId: string

  constructor(private p2p: WorkSpaceP2PService, private renderer: Renderer2) {
    this.currentId = this.p2p.currentId
  }

  ngOnInit() {
    this.p2p.connections.subscribe(e => { this.getConnection(e) })
  }

  private getConnection(connections) {
    connections.forEach(conn => {
      conn.on('data', e => { 
        const data = JSON.parse(e)
        this.createUniqueCursor(data.id)
        this.setUserCursorPosition(data)
      })
    })
  }

  private createUniqueCursor(id) {
    if (this.cursorsId.indexOf(id) == -1) {
      this.cursorsId.push(id)

      const el = this.renderer.createElement('div')
      el.id = id
      el.className = 'user-cursors__cursor'
      this.renderer.appendChild(this.cursors.nativeElement, el)
    }
  }

  private setUserCursorPosition(cursor) {
    const c = document.getElementById(cursor.id)

    if (!c) return
    c.style.transform = `translate(${cursor.positions.posX}px, ${cursor.positions.posY}px)`
  }
}