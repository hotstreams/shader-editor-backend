import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import {InputTextModule} from 'primeng/inputtext';
import {SliderModule} from 'primeng/slider';
import {CommonModule} from '@angular/common';
import { AlertComponent } from './alert/alert.component';
import { ErrorIntercept } from './errorintercept';
import { ListboxModule } from 'primeng/listbox';
import {DropdownModule} from 'primeng/dropdown';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FileUploadModule} from 'primeng/fileupload';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,

    FormsModule,
    ReactiveFormsModule,

    HttpClientModule,

    ButtonModule,
    TableModule,
    InputTextModule,
    SliderModule,
    ListboxModule,
    DropdownModule,
    BrowserAnimationsModule,
    FileUploadModule
  ],
  providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ErrorIntercept, multi: true }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }


