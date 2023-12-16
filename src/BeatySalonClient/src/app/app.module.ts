import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { AdminPageComponent } from './modules/admin-page/admin-page.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { HighlightDirective } from './modules/admin-page/highlight.directive';
import { AuthInterceptor } from './auth.interceptor';
import { PhoneFormatPipe } from './phone-format.pipe';
import { AddEditComponent } from './modules/add-edit/add-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminPageComponent,
    HighlightDirective,
    PhoneFormatPipe,
    AddEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
