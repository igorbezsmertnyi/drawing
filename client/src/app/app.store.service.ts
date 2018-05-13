import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

import { MousePosition } from './models/MousePosition'

@Injectable()
export class StoreService {

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

  //for changing line color
  _lineColor = new Subject<string>()
  lineColor = this._lineColor.asObservable()

  changeLineColor(data: string) {
    this._lineColor.next(data)
  }

  //for changing background color
  _bgColor = new Subject<string>()
  bgColor = this._bgColor.asObservable()

  changeBgColor(data: string) {
    this._bgColor.next(data)
  }

  //for changing background image
  _bgImage = new Subject<string>()
  bgImage = this._bgImage.asObservable()

  changeBgImage(data: string) {
    this._bgImage.next(data)
  }
}