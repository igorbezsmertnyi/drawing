import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

import { MousePosition } from './models/MousePosition'

@Injectable()
export class StoreService {
  //proccessing
  _proccessing = new Subject<boolean>()
  proccessing = this._proccessing.asObservable()

  proccessingState(data: boolean) {
    this._proccessing.next(data)
  }

  //change background color
  _backgroundColor = new Subject<boolean>()
  backgroundColor = this._backgroundColor.asObservable()

  changeBackground(data: boolean) {
    this._backgroundColor.next(data)
  }

  //for sharing mouse position between components
  _coordinates = new Subject<MousePosition>()
  coordinates = this._coordinates.asObservable()

  mouseCoordinate(data: MousePosition) {
    this._coordinates.next(data)
  }

  //for changing line weight
  _lineWeight = new Subject<number>()
  lineWeight = this._lineWeight.asObservable()

  changeLineWeight(data: number) {
    this._lineWeight.next(data)
  }

  //for changing selected color
  _color = new Subject<string>()
  color = this._color.asObservable()

  changeColor(data: string) {
    this._color.next(data)
  }

  //for changing background image
  _bgImage = new Subject<string>()
  bgImage = this._bgImage.asObservable()

  changeBgImage(data: string) {
    this._bgImage.next(data)
  }

  //for changing paint tool
  _paintTool = new Subject<string>()
  paintTool = this._paintTool.asObservable()

  changePaintTool(data: string) {
    this._paintTool.next(data)
  }
}