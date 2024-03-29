import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { ExploreComponent } from './explore/explore.component';
import { CreateProjectComponent } from './project/create-project/create-project.component';


const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: LandingPageComponent },
      { path: 'home', component: MainComponent, canActivate: [AuthGuard] },
      { path: 'explore', component: ExploreComponent },
      {
        path: 'project', pathMatch: 'prefix',
        children: [
          {path: ':create', component: CreateProjectComponent}
        ] 
      }, // Nested under 'home'
    ],
    component: SideNavComponent, // SideNavComponent as parent for these child routes
  },
  {
    path: 'auth', pathMatch: 'prefix',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'register', component: RegisterComponent }
    ], component: AuthComponent
  },
  

  { path: '**', component: PageNotFoundComponentComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
