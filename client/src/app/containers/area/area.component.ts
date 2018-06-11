import { Component, ViewChild, ElementRef, Renderer2 } from '@angular/core'
import { MousePosition, initialMousePosition } from '../../models/MousePosition'
import { DrawParam, initialDrawParam } from '../../models/DrawParam'
import { BoundingRect } from '../../models/BoundingRect'
import { StoreService } from '../../app.store.service'
import { WorkSpaceP2PService } from '../../containers/work-space/work-space.peer-to-peer.service'
import DrawFunction from '../../helper/drawFunction'
import ClickFunction from '../../helper/clickFunction'

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.styl']
})

export class AreaComponent {
  proccessing: boolean = false
  proccessingSt: boolean = false
  ctx: any = null
  canvasPostion: BoundingRect
  mousePosition: MousePosition = initialMousePosition
  drawParam: DrawParam = initialDrawParam
  windowWidth: string
  windowHeight: string
  connections: Array<any> = []

  @ViewChild('canv') canvas: ElementRef

  constructor(private renderer: Renderer2, private el: ElementRef, private st: StoreService,
              private p2p: WorkSpaceP2PService) {
    this.windowWidth = (window.innerWidth - 168).toString()
    this.windowHeight = window.innerHeight.toString()

    this.st.proccessing.subscribe(e => { 
      this.proccessingSt = e 
      console.log(e)
    })
    this.p2p.connections.subscribe(e => { 
      this.connections = e 
      this.getCursorData()
    })
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
    this.sendCursorData()
    this.drawing()
  }

  drawStart() { 
    this.proccessing = true 
    this.ctx.beginPath()
  }

  drawEnd() { 
    this.proccessing = false 
    this.st.changeBackground(false)
  }

  clickFunctions() {
    if (this.drawParam.paintTool == 'color_fill') {
      this.drawParam.bgColor = this.drawParam.color
      this.st.changeBackground(true)
    }

    ClickFunction(this.ctx, this.drawParam, this.windowWidth, this.windowHeight)

    this.sendCursorData()
    this.st.proccessingState(false)
  }

  private drawing() {
    if (!this.proccessing) return
    this.st.proccessingState(true)

    DrawFunction(this.ctx, this.drawParam, this.mousePosition)
  }

  private updateParms() {
    this.st.lineWeight.subscribe(e => this.drawParam.lineWeight = e)
    this.st.color.subscribe(e => this.drawParam.color = e)
    this.st.bgImage.subscribe(e => this.changeBgImage(e))
    this.st.paintTool.subscribe(e => this.paintTools(e))
  }

  private changeBgImage(i) {
    this.drawParam.bgImage = i

    const image = new Image
    image.crossOrigin = 'anonymous'
    image.src = this.drawParam.bgImage

    image.onload = () => {
      this.ctx.drawImage(image, 0, 0, this.windowWidth, this.windowHeight)
      this.st.proccessingState(false)
    }
  }

  private paintTools(t) {
    this.drawParam.paintTool = t
  
    switch(t) {
      case 'pencil':
        this.drawParam.lineCap = 'round'
        break
      case 'brush':
        this.drawParam.lineCap = 'butt'
        break
    }
  }

  private sendCursorData() {
    this.connections.forEach(conn => { 
      if (conn && conn.connected) {
        conn.send(JSON.stringify({
          id: conn._id,
          positions: this.mousePosition,
          proccessing: this.proccessing,
          drawParam: this.drawParam,
          clicked: this.proccessingSt
        }))
      }
    })
  }

  private getCursorData() {
    this.connections.forEach(conn => {
      conn.on('data', e => { 
        const data = JSON.parse(e)

        console.log(data.clicked)
        if (!data.proccessing) this.ctx.beginPath()
        if (data.proccessing) DrawFunction(this.ctx, data.drawParam, data.positions)
        if (data.clicked && data.drawParam.paintTool == 'color_fill') {
          ClickFunction(this.ctx, data.drawParam, this.windowWidth, this.windowHeight)
        }
      })
    })
  }
}
