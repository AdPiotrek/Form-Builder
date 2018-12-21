import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeleteControlEvent } from '../../models/delete-control-event';
import { TypeValueChanges } from '../../models/type-value-changes';
import { StorageService } from '../../services/storage.service';
import { map } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { InputType } from '../../models/input-type.enum';
import { InputCondition } from '../../models/input-condition';

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
      .then((data) => {
        this.fillInputWithOldData(this.inputsForm, data);
      });
  }

  ngOnDestroy() {
    this.formValueChangesSubscription.unsubscribe();
  }

  addNewInput() {
    this.inputsFormArray.push(this.getNewInput());
  }

  addNewSubInputToControl(control) {
    const controlSubInputsFormArray = control.get('subInputs') as FormArray;
    controlSubInputsFormArray.push(this.getNewSubInput(control.value.type));
  }

  deleteControl({ control, index }: DeleteControlEvent): void {
    const parentFormArray = control.parent as FormArray;
    parentFormArray.removeAt(index);
  }

  patchConditionsInChildren({ control, type }: TypeValueChanges) {
    const parentsFormArray = control.get('subInputs') as FormArray;

    parentsFormArray.controls.forEach(controlOfArray => {

      const subInputCondition = this.getConditionValues(type);

      controlOfArray.patchValue({
          parentType: type,
          conditionType: subInputCondition.type,
          conditionValue: subInputCondition.value
        }
      );
    });
  }

  private saveChanges() {
    this.formValueChangesSubscription = this.inputsForm.valueChanges.pipe(
      map(formGroupValue => formGroupValue.subInputs)
    ).subscribe(formValue => {
      this.storageService.updateForm(formValue);
    });
  }

  private getNewInput(): FormGroup {
    return this.fb.group({
      question: '',
      condition: '',
      type: InputType.Text,
      subInputs: this.fb.array([]),
    });
  }

  private getNewSubInput(type: InputType): FormGroup {

    const subInputCondition = this.getConditionValues(type);

    return this.fb.group({
      parentType: type,
      question: ['', Validators.required],
      type: InputType.Text,
      conditionType: subInputCondition.type,
      conditionValue: subInputCondition.value,
      subInputs: this.fb.array([]),
    });
  }

  private getConditionValues(parentType: InputType): InputCondition {
    let condition: InputCondition;

    switch (parentType) {
      case InputType.Text:
        condition = {
          type: 'equals',
          value: ''
        };
        break;
      case InputType.Boolean:
        condition = {
          type: 'equals',
          value: false
        };
        break;
      case InputType.Number:
        condition = {
          type: 'equals',
          value: 0
        };
    }

    return condition;
  }

  private fillInputWithOldData(formGroup: FormGroup, data) {
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
}
