import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FormBuilderComponent } from './form-builder/containers/form-builder/form-builder.component';
import { GetEqualOptionsPipe } from './form-builder/pipes/get-equal-options.pipe';
import { InputCreatorComponent } from './form-builder/components/input-creator/input-creator.component';

@NgModule({
  declarations: [
    AppComponent,
    FormBuilderComponent,
    GetEqualOptionsPipe,
    InputCreatorComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
