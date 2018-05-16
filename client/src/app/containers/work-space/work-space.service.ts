import { Subject, Observer, Observable } from 'rxjs'
import { Injectable } from '@angular/core'
import { Http, RequestOptions, Headers, Response } from '@angular/http'
import { Routes } from '../../app.routes'
import { REQUEST_HEADER } from '../../app.globals'
import 'rxjs/add/operator/map'

@Injectable()
export class WorkSpaceService {
  headers: any

  constructor(private http: Http) {
    this.headers = new Headers(REQUEST_HEADER)
    this.headers = new RequestOptions({ headers: this.headers })
  }

  getArtBoard<Subject>(id) {
    return this.http.get(Routes.getArtboardPath(id), this.headers)
      .map((res: Response) => res.json())
  }

  createArtBoard<Subject>() {
    return this.http.post(Routes.createArtboardPath(), null, this.headers)
      .map((res: Response) => res.json())
  }
}