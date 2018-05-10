import { Component, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core'
import { MousePosition } from '../../models/MousePosition'
import { BoundingRect } from '../../models/BoundingRect'

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.styl']
})

export class AreaComponent {
  proccessing: boolean = false
  ctx: any = null
  canvasPostion: BoundingRect
  mousePosition: MousePosition = {
    posX: 0,
    posY: 0
  }

  @ViewChild('canv') canvas: ElementRef
  @Output() onMouseMove = new EventEmitter<MousePosition>()

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {
    this.ctx = this.canvas.nativeElement.getContext('2d')

    this.renderer.setAttribute(this.canvas.nativeElement, 'width', window.innerWidth.toString())
    this.renderer.setAttribute(this.canvas.nativeElement, 'height', window.innerHeight.toString())

    this.canvasPostion = this.canvas.nativeElement.getBoundingClientRect()
  }

  coordinates(e) {
    this.mousePosition.posX = e.clientX - this.canvasPostion.left
    this.mousePosition.posY = e.clientY - this.canvasPostion.top
    this.onMouseMove.emit(this.mousePosition)

    this.drawing()
  }

  drawStart() { 
    this.proccessing = true 
    this.ctx.beginPath()
  }

  drawEnd() { this.proccessing = false }

  private drawing() {
    if (!this.proccessing) return

    this.ctx.lineTo(this.mousePosition.posX, this.mousePosition.posY)
    this.ctx.stroke()
  }
}
