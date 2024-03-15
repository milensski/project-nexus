import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full', },
  { path: '', component: MainComponent },
  { path: '**', component: PageNotFoundComponentComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
