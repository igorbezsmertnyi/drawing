import { Subject, Observer, Observable } from 'rxjs'
import * as Peer from 'simple-peer'
import { Injectable } from '@angular/core'
import { WorkSpaceService } from './work-space.service'
import { Message, initialMessage } from '../../models/Message'
import WsMessage from '../../helper/wsMessage'

@Injectable()
export class WorkSpaceP2PService {
  message: Message = initialMessage
  currentId: string = this.message.id
  connectionIds = [this.currentId]
  localConnections: Array<any> = []

  constructor(private workSpace: WorkSpaceService) { }

  //for update connections array
  _connections = new Subject<boolean>()
  connections = this._connections.asObservable()

  connectionArr(data: any) {
    this._connections.next(data)
  }

  //messageController used for switching in a dependence of received commands
  public messageController(data) {
    const res = JSON.parse(data.data)

    if (this.connectionIds.includes(res.id)) return

    switch (res.command) {
      case 'NEW':
        this.newCommad()
        break
      case 'OFFER':
        this.offerCommand(res)
        break
      case 'ANSWER':
        this.answearCommand(res)
        break
    }
  }

  private onClose(pc) {
    console.log(`peer connection ${pc._id} are closed`)
    this.removePeerConnecton(pc._id)
    this.connectionArr(this.localConnections)
  }

  private onError(pc, err) {
    console.error(err)
    this.removePeerConnecton(pc._id)
    this.connectionArr(this.localConnections)
  }

  //createPeer used for creating new Peer. isLocal state used for offer command
  private createPeer(isLocal = true) {
    const pc = new Peer({ initiator: isLocal, trickle: false })

    pc.on('close', () => { this.onClose(pc) })
    pc.on('error', err => { this.onError(pc, err) })

    if (isLocal) {
      pc.on('signal', async () => {
        await this.sendOfferCommand(pc._pc, pc._id)
        await this.localConnections.push(pc)
        await this.connectionArr(this.localConnections)
      })
    } else {
      this.localConnections.push(pc)
      this.connectionArr(this.localConnections)
      return pc
    }
  }

  //connectPeer used for connection to the remote peer and send answer command via channel
  private async connectPeer(data, conn) {
    conn.signal(data.offer)
    conn.on('signal', () => { this.sendAnswerCommand(conn._pc, data.peerId) })
  }

  //sendNewCommand used for sending new user command to the channel for getting offers from the other users
  public async sendNewCommand() {
    this.message = await WsMessage('NEW', this.message)
    await this.workSpace.send(this.message)
  }

  //sendOfferCommand used for sending offer command to the channel for getting answer commands from the other users
  private async sendOfferCommand(pc, peerId) {
    this.message = await WsMessage('OFFER', this.message, pc, peerId)
    await this.workSpace.send(this.message)
  }

  //sendAnswerCommand used for sending answer command to the channel to completing the connection between two peers
  private async sendAnswerCommand(pc, peerId) {
    this.message = await WsMessage('ANSWER', this.message, pc, peerId)
    await this.workSpace.send(this.message)
  }

  //newCommand used in messageController when the 'new command' was received and run createPeer command for 
  //generating an offer
  private newCommad() {
    this.createPeer()
  }

  //offerCommand used in messageController when the 'offer command' was received and run createPeer 
  //for generating an answer and receive an answer to the remote peer
  private async offerCommand(data) {
    const conn = await this.createPeer(false)
    if (conn._pc) {
      await this.connectPeer(data, conn)
      await this.setConnectedIds(data.id)
    }
  }

  //answearCommand used in messageController when the 'answer command' was received and run connecting to the remote peer
  private async answearCommand(data) {
    const conn = await this.findPeer(data)
    if (conn) {
      await conn.signal(data.answer)
      await this.setConnectedIds(data.id)
    }
  }

  //findPeer returnig connection from localConnections array finding by connId
  private findPeer(data) {
    return this.localConnections.find(conn => conn._pc && (conn._id == data.peerId))
  }

  //setConnectedIds set userId to the list for ignoring them commands after they will connecting
  private setConnectedIds(id) {
    if (this.connectionIds.indexOf(id) == -1) {
      this.connectionIds.push(id)
    }
  }

  //removePeerConnecton used for removing cloused connection from localConnections array
  private removePeerConnecton(id) {
    const index = this.localConnections.indexOf(id)
    if (index == -1) return
    this.localConnections.splice(index, 1)
  }
}