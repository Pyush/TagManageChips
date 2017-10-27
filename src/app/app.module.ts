import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TagsManagerDirective } from './tags/tags-manager.directive';
import {NgxTypeaheadModule} from "ngx-typeahead";
import {TagsManagerInputComponent} from "./tags-manager-input/tags-manager-input.component";
import {SharedService} from "./shared-service.service";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {TypeaheadModule} from "./widget/typeahead/typeahead.module";

@NgModule({
  declarations: [
    AppComponent,
    TagsManagerDirective,
    TagsManagerInputComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TypeaheadModule,
    NgxTypeaheadModule
  ],
  providers: [SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
