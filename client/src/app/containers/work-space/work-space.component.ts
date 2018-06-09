import { Component } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { MousePosition } from '../../models/MousePosition'
import { WorkSpaceService } from './work-space.service'
import { StoreService } from '../../app.store.service'
import { Message, initialMessage } from '../../models/Message'
import * as Peer from 'simple-peer'

@Component({
  selector: 'work-space',
  templateUrl: './work-space.component.html',
  styleUrls: ['./work-space.component.styl']
})

export class WorkSpaceComponent {
  slugId: string = ''
  message: Message = initialMessage
  currentId: string = this.message.id
  connectionIds = [this.currentId]
  localConnections: Array<any> = []

  constructor(private activatedRoute: ActivatedRoute, private workSpace: WorkSpaceService, private st: StoreService, private router: Router) {
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
    this.workSpace.onOpen().subscribe(() => { this.sendNewCommand() })
    this.workSpace.onClose().subscribe(() => {
      this.message.command = 'CLOSE'
      this.workSpace.send(this.message)
    })

    this.workSpace.onMessage().subscribe(res => {
      this.messageController(res.data)
    })
  }

  private onConnect(pc) {
    pc.on('connect', () => { pc.send(`peer id: ${this.currentId}`) })
  }

  private onData(e) {
    console.log(`got a message from peer1: ${e}`)
  }

  private async createPeer(isLocal = true) {
    const pc = await new Peer({ initiator: isLocal, trickle: false })

    pc.on('connect', () => { this.onConnect(pc) })
    pc.on('data', this.onData)

    if (isLocal) {
      pc.on('signal', async () => {
        await this.sendOfferCommand(pc)
        await this.localConnections.push(pc)
      })
    } else {
      this.localConnections.push(pc)
      return pc
    }
  }

  private async connectPeer(data, conn) {
    conn.signal(data.offer)
    conn.on('signal', () => { this.sendAnswerCommand(conn._pc, data.peerId) })
  }

  private async sendNewCommand() {
    this.message.command = 'NEW'
    this.message.peerId = null
    this.message.answer = null
    this.message.offer = null
    await this.workSpace.send(this.message)
  }

  private sendOfferCommand(conn) {
    this.message.command = 'OFFER'
    this.message.peerId = conn._id
    this.message.offer = conn._pc.localDescription
    this.message.answer = null
    this.workSpace.send(this.message)
  }

  private async sendAnswerCommand(pc, peerId) {
    this.message.command = 'ANSWEAR'
    this.message.peerId = peerId
    this.message.offer = pc.remoteDescription
    this.message.answer = pc.localDescription
    await this.workSpace.send(this.message)
  }

  private newCommad() {
    this.createPeer()
  }

  private async offerCommand(data) {
    const conn = await this.createPeer(false)
    if (conn._pc) {
      await this.connectPeer(data, conn)
      await this.setConnectedIds(data.id)
    }
  }

  private async answearCommand(data) {
    const conn = await this.findPeer(data)
    if (conn) {
      await conn.signal(data.answer)
      await this.setConnectedIds(data.id)
    }
  }

  private messageController(data) {
    const res = JSON.parse(data)

    if (this.connectionIds.includes(res.id)) return

    switch (res.command) {
      case 'NEW':
        this.newCommad()
        break
      case 'OFFER':
        this.offerCommand(res)
        break
      case 'ANSWEAR':
        this.answearCommand(res)
        break
    }
  }

  private findPeer(data) {
    return this.localConnections.find(conn => conn._pc && (conn._id == data.peerId))
  }

  private setConnectedIds(id) {
    if (this.connectionIds.indexOf(id) == -1) {
      this.connectionIds.push(id)
    }
  }
}
