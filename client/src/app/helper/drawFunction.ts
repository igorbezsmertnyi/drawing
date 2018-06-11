import { MousePosition } from '../models/MousePosition'
import { DrawParam } from '../models/DrawParam'

export default (ctx, drawParam: DrawParam, mousePosition: MousePosition) => {
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
  }

  ctx.stroke()
}