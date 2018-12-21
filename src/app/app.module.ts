import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FormBuilderComponent } from './form-builder/containers/form-builder/form-builder.component';
import { ConditionFromTypePipe } from './form-builder/pipes/condition-from-type.pipe';
import { InputCreatorComponent } from './form-builder/components/input-creator/input-creator.component';

@NgModule({
  declarations: [
    AppComponent,
    FormBuilderComponent,
    ConditionFromTypePipe,
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
