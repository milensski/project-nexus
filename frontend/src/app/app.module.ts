import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list'
import {MatToolbarModule } from '@angular/material/toolbar'
import { MainComponent } from './main/main.component';
import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTree, MatTreeModule} from '@angular/material/tree';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './register/register/register.component';
import { PrivacyDialogComponent } from './privacy-dialog/privacy-dialog.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { AuthComponent } from './auth/auth.component';
import { LoginModule } from './login/login.module';
import { FormGroup } from '@angular/forms';
import { AuthService } from './auth/auth.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AuthWrapperComponent } from './auth-wrapper/auth-wrapper.component';
import { FooterComponent } from './footer/footer.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    PageNotFoundComponentComponent,
    SideNavComponent,
    LandingPageComponent,
    NavBarComponent,
    RegisterComponent,
    AuthComponent,
    AuthWrapperComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatTreeModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    PrivacyDialogComponent,
    LoginModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
