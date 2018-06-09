import { idGenerator } from '../../libs/idGenerator'

export interface Message {
  id: string
  peerId: string
  command: string
  peers: Array<any>
  offer: any
  answer: any
}

export const initialMessage = {
  id: idGenerator(),
  peerId: null,
  command: 'NEW',
  peers: [],
  offer: null,
  answer: null
}