import { MousePosition } from '../models/MousePosition'
import { DrawParam } from '../models/DrawParam'

export default (ctx, drawParam: DrawParam, mousePosition: MousePosition, wW: string, wH: string) => {
  ctx.lineWidth = drawParam.lineWeight
  ctx.strokeStyle = drawParam.color
  ctx.lineCap = drawParam.lineCap

  switch(drawParam.paintTool) {
    case 'pencil':
      ctx.lineTo(mousePosition.posX, mousePosition.posY)
      break
    case 'brush':
      ctx.lineTo(mousePosition.posX, mousePosition.posY)
      break
    case 'eraser':
      ctx.strokeStyle = '#ffffff'
      ctx.lineTo(mousePosition.posX, mousePosition.posY)
      break
    case 'color_fill':
      ctx.fillStyle = drawParam.color
      ctx.fillRect(0, 0, wW, wH)
      break
    case 'clear':
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, wW, wH)
      break
  }

  ctx.stroke()
}