import { MousePosition } from './MousePosition'
import { DrawParam } from './DrawParam'

export interface RemoteCursor {
  id: string
  positions: MousePosition
  proccessing: boolean
  clicked: boolean
  drawParm: DrawParam
}