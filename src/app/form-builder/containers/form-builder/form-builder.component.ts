import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeleteControlEvent } from '../../models/delete-control-event';
import { QuestionValueChangeEvent } from '../../models/question-value-change-event';
import { StorageService } from '../../services/storage.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { InputType } from '../../models/input-type.enum';

@Component({
  selector: 'app-form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit, OnDestroy {
  formValueChangesSubscription: Subscription;
  inputsForm: FormGroup = this.fb.group({
    subInputs: this.fb.array([])
  });

  get inputsFormArray(): FormArray {
    return this.inputsForm.get('subInputs') as FormArray;
  }

  constructor(private fb: FormBuilder,
              private storageService: StorageService) {
  }

  ngOnInit() {
    this.saveChanges();
    this.storageService.getForm()
      .then((data) => this.fillInputWithOldData(this.inputsForm, data));
  }

  fillInputWithOldData(formGroup: FormGroup, data) {
    console.log(data)
    // In case of first visit
    if (data == null) {
      return;
    }

    const subInputsArray = formGroup.get('subInputs') as FormArray;

    data.forEach((input) => {
      const nestedFormGroup = this.fb.group({
        ...input,
        subInputs: this.fb.array([])
      });

      subInputsArray.push(nestedFormGroup);

      this.fillInputWithOldData(nestedFormGroup, input.subInputs);
    });
  }

  addNewInput() {
    this.inputsFormArray.push(this.getNewInput());
  }

  getNewInput(): FormGroup {
    return this.fb.group({
      'question': ['', Validators.required],
      'condition': '',
      'type': InputType.Text,
      'subInputs': this.fb.array([]),
    });
  }

  getNewSubInput(parentType: InputType): FormGroup {

    let subInputConditons: { conditionType: string, conditionValue: string | number | boolean };

    switch (parentType) {
      case InputType.Text:
        subInputConditons = {
          conditionType: 'EQUALS',
          conditionValue: '',
        };
        break;
      case InputType.Boolean:
        subInputConditons = {
          conditionType: 'EQUALS',
          conditionValue: false,
        };
        break;
      case InputType.Number:
        subInputConditons = {
          conditionType: 'EQUALS',
          conditionValue: 0,
        };
    }


    return this.fb.group({
      parentType,
      question: ['', Validators.required],
      type: InputType.Text,
      ...subInputConditons,
      'subInputs': this.fb.array([]),
    });
  }

  addNewSubInputToControl(control) {
    const controlSubInputsFormArray = control.get('subInputs') as FormArray;
    controlSubInputsFormArray.push(this.getNewSubInput(control.value.type));
  }

  deleteControl({ control, index }: DeleteControlEvent): void {
    const parentFormArray = control.parent as FormArray;
    parentFormArray.removeAt(index);
  }

  patchConditionsInChildren({ control, type }: QuestionValueChangeEvent) {
    const parentsFormArray = control.get('subInputs') as FormArray;

    parentsFormArray.controls.forEach(controlOfArray => {

      let subInputConditions: { conditionType: string, conditionValue: string | number | boolean };

      switch (type) {
        case InputType.Text:
          subInputConditions = {
            conditionType: 'EQUALS',
            conditionValue: '',
          };
          break;
        case InputType.Boolean:
          subInputConditions = {
            conditionType: 'EQUALS',
            conditionValue: false,
          };
          break;
        case InputType.Number:
          subInputConditions = {
            conditionType: 'EQUALS',
            conditionValue: 0,
          };
      }

      controlOfArray.patchValue({ parentType: type, ...subInputConditions });
    });
  }

  saveChanges() {
    this.formValueChangesSubscription = this.inputsForm.valueChanges.pipe(
      map(formGroupValue => formGroupValue.subInputs)
    ).subscribe(formValue => {
      this.storageService.updateForm(formValue);
    });
  }

  ngOnDestroy() {
    this.formValueChangesSubscription.unsubscribe();
  }

}
