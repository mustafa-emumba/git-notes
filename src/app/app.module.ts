import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';

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
import { MatTooltipModule } from '@angular/material/tooltip';

// Component Imports
import { SvgIconComponent } from './shared/components/svg-icon/svg-icon.component';
import { NavBarComponent } from './shared/components/nav-bar/nav-bar.component';
import { PublicGistsComponent } from './pages/public-gists/public-gists.component';
import { GistTableComponent } from './shared/components/gist-table/gist-table.component';
import { GistGridComponent } from './shared/components/gist-grid/gist-grid.component';
import { GistCodeComponent } from './shared/components/gist-code/gist-code.component';

// Third Party Imports
import { MonacoEditorModule } from 'ngx-monaco-editor-v2';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { GistComponent } from './pages/gist/gist.component';
import { OwnerInfoComponent } from './shared/components/owner-info/owner-info.component';
import { YourGistsComponent } from './pages/your-gists/your-gists.component';
import { CreateGistComponent } from './pages/create-gist/create-gist.component';
import { StarredGistsComponent } from './pages/starred-gists/starred-gists.component';

@NgModule({
  declarations: [
    AppComponent,
    SvgIconComponent,
    NavBarComponent,
    PublicGistsComponent,
    GistTableComponent,
    GistGridComponent,
    GistCodeComponent,
    GistComponent,
    OwnerInfoComponent,
    YourGistsComponent,
    CreateGistComponent,
    StarredGistsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MonacoEditorModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule

  ],
  providers: [
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
