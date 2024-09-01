import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './@shared/header/header.component';
import { AppLayoutComponent } from './@shared/layouts/app-layout/app-layout.component';
import { AuthLayoutComponent } from './@shared/layouts/auth-layout/auth-layout.component';
import { SidebarComponent } from './@shared/sidebar/sidebar.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LibrariansComponent } from './@modules/librarians/components/librarians/librarians.component';
import { StudentsComponent } from './@modules/students/components/students/students.component';
import { AdminComponent } from './@modules/admin/components/admin/admin.component';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    AuthLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    LibrariansComponent,
    StudentsComponent,
    AdminComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent],
})
export class AppModule {}
