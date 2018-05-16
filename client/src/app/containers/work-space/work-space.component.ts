import { Component } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { MousePosition } from '../../models/MousePosition'
import { WorkSpaceService } from './work-space.service'

@Component({
  selector: 'work-space',
  templateUrl: './work-space.component.html',
  styleUrls: ['./work-space.component.styl']
})

export class WorkSpaceComponent {
  constructor(private activatedRoute: ActivatedRoute, 
              private workSpace: WorkSpaceService,
              private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        this.workSpace.getArtBoard(params.id).subscribe(res => {
          console.log(res)
        })
      } else {
        this.workSpace.createArtBoard().subscribe(res => {
          this.router.navigate(['artboard', res.slug])
        })
      }
    })
  }
}
