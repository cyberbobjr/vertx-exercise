import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './pages/app/app.component';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

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
                  MatButtonModule
              ],
              providers: [],
              bootstrap: [AppComponent]
          })
export class AppModule {
}
