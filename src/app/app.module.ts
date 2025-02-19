import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FlexLayoutModule } from '@angular/flex-layout';

// Angular Material Imports
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';


// Component Imports
import { SvgIconComponent } from './components/svg-icon/svg-icon.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { PublicGistsComponent } from './pages/public-gists/public-gists.component';
import { GistTableComponent } from './components/gist-table/gist-table.component';
import { GistGridComponent } from './components/gist-grid/gist-grid.component';
import { GistCodeComponent } from './components/gist-code/gist-code.component';

@NgModule({
  declarations: [
    AppComponent,
    SvgIconComponent,
    NavBarComponent,
    PublicGistsComponent,
    GistTableComponent,
    GistGridComponent,
    GistCodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonToggleModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
