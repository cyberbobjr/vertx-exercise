import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './pages/app/app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {AppsService} from './services/apps.service';

@NgModule({
              declarations: [
                  AppComponent
              ],
              imports: [
                  BrowserModule,
                  AppRoutingModule,
                  HttpClientModule,
                  BrowserAnimationsModule,
                  MatMenuModule,
                  MatIconModule,
                  MatButtonModule,
                  MatToolbarModule
              ],
              providers: [AppsService],
              bootstrap: [AppComponent]
          })
export class AppModule {
}
