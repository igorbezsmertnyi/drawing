import { NgModule } from '@angular/core'
import { APP_BASE_HREF } from '@angular/common'
import { Routes, RouterModule } from '@angular/router'

//containers
import { WorkSpaceComponent } from './containers/work-space/work-space.component'

const routes: Routes = [
  { path: '', component: WorkSpaceComponent },
  { path: 'artboard/:id', component: WorkSpaceComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{provide: APP_BASE_HREF, useValue: '/'}]
})

export class AppRoutingModule { }
