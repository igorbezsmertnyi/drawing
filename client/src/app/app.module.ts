import '../polyfills'
import 'hammerjs'

import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgModule } from '@angular/core'
import { HttpModule } from '@angular/http'

//modules
import { 
  FormsModule, 
  ReactiveFormsModule
} from '@angular/forms'

import {
  MatSelectModule,
  MatInputModule,
  MatTooltipModule
} from '@angular/material'

import { ColorPickerModule } from 'ngx-color-picker'
import { AppRoutingModule } from './app.routing.module'

//services
import { StoreService } from './app.store.service'
import { WorkSpaceService } from './containers/work-space/work-space.service'

//containers
import { WorkSpaceComponent } from './containers/work-space/work-space.component'

//components
import { AppComponent } from './components/app/app.component'
import { AreaComponent } from './components//area/area.component'
import { CursorComponent } from './components/cursor/cursor.component'
import { ToolBarComponent } from './components/tool-bar/tool-bar.component'
import { ToolsCoordinatesComponent } from './components/tools-coordinates/tools-coordinates.component'
import { ToolsLineWeightComponent } from './components/tools-line-weight/tools-line-weight.component'
import { ToolsBackgroundImageComponent } from './components/tools-background-image/tools-background-image.component'
import { ToolsPaintToolsComponent } from './components/tools-paint-tools/tools-paint-tools.component'
import { ToolsPaletteComponent } from './components/tools-palette/tools-palette.component'

@NgModule({
  declarations: [
    AppComponent,
    AreaComponent,
    CursorComponent,
    WorkSpaceComponent,
    ToolBarComponent,
    ToolsCoordinatesComponent,
    ToolsLineWeightComponent,
    ToolsBackgroundImageComponent,
    ToolsPaintToolsComponent,
    ToolsPaletteComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,    
    MatSelectModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    MatTooltipModule
  ],
  providers: [
    StoreService,
    WorkSpaceService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
