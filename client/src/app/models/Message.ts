import { idGenerator } from '../../libs/idGenerator'
import { SpdOffer, SpdAnswer } from './Spd'

export interface Message {
  id: string
  peerId: string
  command: string
  offer: SpdOffer
  answer: SpdAnswer
}

export const initialMessage = {
  id: idGenerator(),
  peerId: null,
  command: 'NEW',
  offer: null,
  answer: null
}