import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicGistsComponent } from './pages/public-gists/public-gists.component';
import { GistComponent } from './pages/gist/gist.component';
import { YourGistsComponent } from './pages/your-gists/your-gists.component';
import { CreateGistComponent } from './pages/create-gist/create-gist.component';
import { StarredGistsComponent } from './pages/starred-gists/starred-gists.component';

const routes: Routes = [
  { path: "", component: PublicGistsComponent },
  { path: "gist", component: GistComponent },
  { path: "your-gists", component: YourGistsComponent },
  { path: "create-gist", component: CreateGistComponent },
  { path: "starred-gists", component: StarredGistsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
