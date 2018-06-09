import { Message } from '../models/Message'

//Message constructor for WebSocket communication between browsers
export default (msgType = 'NEW', message: Message, pc = null, peerId = null) => {
  switch(msgType) {
    case 'NEW':
      message.command = 'NEW'
      message.peerId = null
      message.answer = null
      message.offer = null
      break
    case 'OFFER':
      message.command = 'OFFER'
      message.peerId = peerId
      message.offer = pc.localDescription
      message.answer = null
      break
    case 'ANSWER':
      message.command = 'ANSWER'
      message.peerId = peerId
      message.offer = pc.remoteDescription
      message.answer = pc.localDescription
  }

  return message
}