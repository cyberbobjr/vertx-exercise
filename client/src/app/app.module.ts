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
import {MatExpansionModule} from '@angular/material/expansion';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import { ActivityComponent } from './pages/app/activity/activity.component';
import {MatBadgeModule} from '@angular/material/badge';

@NgModule({
              declarations: [
                  AppComponent,
                  ActivityComponent
              ],
              imports: [
                  BrowserModule,
                  AppRoutingModule,
                  HttpClientModule,
                  BrowserAnimationsModule,
                  MatMenuModule,
                  MatIconModule,
                  MatButtonModule,
                  MatToolbarModule,
                  MatExpansionModule,
                  MatCardModule,
                  MatInputModule,
                  FormsModule,
                  MatBadgeModule
              ],
              providers: [AppsService],
              bootstrap: [AppComponent]
          })
export class AppModule {
}
