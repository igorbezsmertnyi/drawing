import { Subject, Observer, Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { Http, RequestOptions, Headers, Response } from '@angular/http'
import { Routes } from '../../app.routes'
import { REQUEST_HEADER } from '../../app.globals'
import { Message } from '../../models/Message'
import 'rxjs/add/operator/map'

@Injectable()
export class WorkSpaceService {
  headers: any
  private socket

  constructor(private http: Http) {
    this.headers = new Headers(REQUEST_HEADER)
    this.headers = new RequestOptions({ headers: this.headers })
  }

  public getArtBoard<Subject>(id: string) {
    return this.http.get(Routes.artboardPath(id), this.headers)
      .map((res: Response) => res.json())
  }

  public createArtBoard<Subject>() {
    return this.http.post(Routes.createArtboardPath(), null, this.headers)
      .map((res: Response) => res.json())
  }

  public updateArtBoard<Subject>(id: string, data) {
    const body = JSON.stringify({ image: data })
    return this.http.patch(Routes.artboardPath(id), body, this.headers)
      .map((res: Response) => res.json())
  }
 
  public connect<Subject>(id: string) {
    if (!this.socket) this.socket = new WebSocket(Routes.artboardHubPath(id))

    return this.socket
  }

  public send(message: Message) {
    this.socket.send(JSON.stringify(message))
  }

  public onMessage() {
    return new Observable<any>(observer => {
      this.socket.onmessage = data => observer.next(data)
    })
  }

  public onOpen() {
    return new Observable<Message>(observer => {
      this.socket.onopen = data => observer.next(data)
    })
  }

  public onClose() {
    return new Observable<Message>(observer => {
      this.socket.onclose = data => observer.next(data)
    })
  }
}