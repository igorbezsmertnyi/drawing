import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppComponent } from './components/app/app.component'
import { AreaComponent } from './components//area/area.component'
import { CursorComponent } from './components/cursor/cursor.component'
import { WorkSpaceComponent } from './components/work-space/work-space.component'

@NgModule({
  declarations: [
    AppComponent,
    AreaComponent,
    CursorComponent,
    WorkSpaceComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
