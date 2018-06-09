import { Component } from '@angular/core'
import { WorkSpaceP2PService } from '../../containers/work-space/work-space.peer-to-peer.service'

@Component({
  selector: 'users-cursor',
  templateUrl: './users-cursor.component.html',
  styleUrls: ['./users-cursor.component.styl']
})

export class UsersCursorComponent {
  cursors: Array<any> = []
  currentId: string

  constructor(private p2p: WorkSpaceP2PService) {
    this.currentId = this.p2p.currentId
  }

  ngOnInit() {
    this.p2p.connections.subscribe(e => { this.getConnection(e) })
  }

  private getConnection(connections) {
    connections.forEach(conn => {
      conn.on('data', e => { 
        const data = JSON.parse(e)
        this.setUniqueCursor(data.id)
        this.setUserCursorPosition(data)
      })
    })
  }

  private setUniqueCursor(id) {
    if (this.cursors.indexOf(id) == -1) {
      this.cursors.push(id)
    }
  }

  private setUserCursorPosition(cursor) {
    const c = document.getElementById(cursor.id)

    if (!c) return
    c.style.transform = `translate(${cursor.positions.posX}px, ${cursor.positions.posY}px)`
  }
}