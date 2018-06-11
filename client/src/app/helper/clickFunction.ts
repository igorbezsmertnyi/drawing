export default (ctx, drawParam, wW, wH) => {
  switch(drawParam.paintTool) {
    case 'color_fill':
      ctx.fillStyle = drawParam.color
      ctx.fillRect(0, 0, wW, wH)
      break
    case 'clear':
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, wW, wH)
      break
  }
}