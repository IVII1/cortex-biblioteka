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
import { provideHttpClient } from '@angular/common/http';
import { SearchAddNewComponent } from './@shared/search-add-new/search-add-new.component';
import { PageHeaderComponent } from './@shared/page-header/page-header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    AppLayoutComponent,
    AuthLayoutComponent,
    HeaderComponent,
    SidebarComponent,
    LibrariansComponent,
    StudentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SearchAddNewComponent,
    PageHeaderComponent,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [provideHttpClient(), provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
