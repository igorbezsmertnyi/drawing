import { idGenerator } from '../../libs/idGenerator'

export interface Message {
  id: string
  peerId: string
  command: string
  offer: any
  answer: any
}

export const initialMessage = {
  id: idGenerator(),
  peerId: null,
  command: 'NEW',
  offer: null,
  answer: null
}