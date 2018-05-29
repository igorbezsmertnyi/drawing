import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core'
import { MousePosition, initialMousePosition } from '../../models/MousePosition'
import { DrawParam, initialDrawParam } from '../../models/DrawParam'
import { BoundingRect } from '../../models/BoundingRect'
import { StoreService } from '../../app.store.service'

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.styl']
})

export class AreaComponent {
  proccessing: boolean = false
  ctx: any = null
  canvasPostion: BoundingRect
  mousePosition: MousePosition = initialMousePosition
  drawParm: DrawParam = initialDrawParam
  windowWidth: string
  windowHeight: string

  @ViewChild('canv') canvas: ElementRef

  constructor(private renderer: Renderer2, private el: ElementRef, private st: StoreService) {
    this.windowWidth = (window.innerWidth - 168).toString()
    this.windowHeight = window.innerHeight.toString()
  }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')

    this.renderer.setAttribute(this.canvas.nativeElement, 'width', this.windowWidth)
    this.renderer.setAttribute(this.canvas.nativeElement, 'height', this.windowHeight)

    this.canvasPostion = this.canvas.nativeElement.getBoundingClientRect()

    this.ctx.fillStyle = '#ffffff'
    this.ctx.fillRect(0, 0, this.windowWidth, this.windowHeight)

    this.updateParms()
  }

  coordinates(e) {
    this.mousePosition.posX = e.clientX - this.canvasPostion.left
    this.mousePosition.posY = e.clientY - this.canvasPostion.top
    this.st.mouseCoordinate(this.mousePosition)

    this.drawing()
  }

  drawStart() { 
    this.proccessing = true 
    this.ctx.beginPath()
  }

  drawEnd() { 
    this.proccessing = false 
    this.st.proccessingState(false)
    this.st.changeBackground(false)
  }

  clickFunctions() {
    switch(this.drawParm.paintTool) {
      case 'color_fill':
        this.drawParm.bgColor = this.drawParm.color
        this.ctx.fillStyle = this.drawParm.color
        this.ctx.fillRect(0, 0, this.windowWidth, this.windowHeight)
        this.st.changeBackground(true)
        break
      case 'clear':
        this.ctx.fillStyle = '#ffffff'
        this.ctx.fillRect(0, 0, this.windowWidth, this.windowHeight)
        break
    }

    this.st.proccessingState(false)
  }

  private drawing() {
    if (!this.proccessing) return
    this.st.proccessingState(true)

    this.ctx.lineWidth = this.drawParm.lineWeight
    this.ctx.strokeStyle = this.drawParm.color
    this.ctx.lineCap = this.drawParm.lineCap

    switch(this.drawParm.paintTool) {
      case 'pencil':
        this.ctx.lineTo(this.mousePosition.posX, this.mousePosition.posY)
        break
      case 'brush':
        this.ctx.lineTo(this.mousePosition.posX, this.mousePosition.posY)
        break
      case 'eraser':
        this.ctx.strokeStyle = '#ffffff'
        this.ctx.lineTo(this.mousePosition.posX, this.mousePosition.posY)
        break
    }
  
    this.ctx.stroke()
  }

  private updateParms() {
    this.st.lineWeight.subscribe(e => this.drawParm.lineWeight = e)
    this.st.color.subscribe(e => this.drawParm.color = e)
    this.st.bgImage.subscribe(e => this.changeBgImage(e))
    this.st.paintTool.subscribe(e => this.paintTools(e))
  }

  private changeBgImage(i) {
    this.drawParm.bgImage = i

    const image = new Image
    image.crossOrigin = 'anonymous'
    image.src = this.drawParm.bgImage

    image.onload = () => {
      this.ctx.drawImage(image, 0, 0, this.windowWidth, this.windowHeight)
      this.st.proccessingState(false)
    }
  }

  private paintTools(t) {
    this.drawParm.paintTool = t
  
    switch(t) {
      case 'pencil':
        this.drawParm.lineCap = 'round'
        break
      case 'brush':
        this.drawParm.lineCap = 'butt'
        break
    }
  }
}
