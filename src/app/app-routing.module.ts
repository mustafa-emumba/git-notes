import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PublicGistsComponent } from './pages/public-gists/public-gists.component';
import { GistCodeComponent } from './components/gist-code/gist-code.component';
import { GistComponent } from './pages/gist/gist.component';

const routes: Routes = [
  {path: "", component: PublicGistsComponent},
  {path: "gist", component: GistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
