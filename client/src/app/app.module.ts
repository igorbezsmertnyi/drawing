import '../polyfills'
import 'hammerjs'

import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'

//modules
import { 
  FormsModule, 
  ReactiveFormsModule 
} from '@angular/forms'

import {
  MatSelectModule,
  MatInputModule
} from '@angular/material'

import { ColorPickerModule } from 'ngx-color-picker'

//services
import { StoreService } from './app.store.service'

//containers
import { WorkSpaceComponent } from './containers/work-space/work-space.component'

//components
import { AppComponent } from './components/app/app.component'
import { AreaComponent } from './components//area/area.component'
import { CursorComponent } from './components/cursor/cursor.component'
import { ToolBarComponent } from './components/tool-bar/tool-bar.component'
import { ToolsCoordinatesComponent } from './components/tools-coordinates/tools-coordinates.component'
import { ToolsLineWeightComponent } from './components/tools-line-weight/tools-line-weight.component'
import { ToolsLineColorComponent } from './components/tools-line-color/tools-line-color.component'
import { ToolsBackgroundColorComponent } from './components/tools-background-color/tools-background-color.component'
import { ToolsBackgroundImageComponent } from './components/tools-background-image/tools-background-image.component'

@NgModule({
  declarations: [
    AppComponent,
    AreaComponent,
    CursorComponent,
    WorkSpaceComponent,
    ToolBarComponent,
    ToolsCoordinatesComponent,
    ToolsLineWeightComponent,
    ToolsLineColorComponent,
    ToolsBackgroundColorComponent,
    ToolsBackgroundImageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule
  ],
  providers: [
    StoreService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
