import { async, ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';

import { FormBuilderComponent } from './form-builder.component';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { InputCreatorComponent } from '../../components/input-creator/input-creator.component';
import { GetEqualOptionsPipe } from '../../pipes/get-equal-options.pipe';
import { InputType } from '../../models/input-type.enum';
import { initialFormBuilderValue } from '../../mocks/initial-form-builder-value';

describe('FormBuilderComponent', () => {
  let component: FormBuilderComponent;
  let fixture: ComponentFixture<FormBuilderComponent>;
  let storageService: StorageService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormBuilderComponent, InputCreatorComponent, GetEqualOptionsPipe],
      providers: [StorageService],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormBuilderComponent);
    component = fixture.componentInstance;
    storageService = TestBed.get(StorageService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add new sub input to control', function () {
    const formArray = component.inputsForm.get('subInputs') as FormArray;
    const initialLength = formArray.length;
    component.addNewInput();
    expect(formArray.length).toEqual(initialLength + 1);
  });

  it('should add sub input to control with text type', function () {
    const newFormGroup = new FormGroup({
      type: new FormControl(InputType.Text),
      subInputs: new FormArray([])
    });

    component.addNewSubInputToControl(newFormGroup);

    const subInputExpectedType = {
      parentType: InputType.Text,
      question: '',
      type: InputType.Text,
      conditionType: 'EQUALS',
      conditionValue: '',
      subInputs: [],
    };

    expect(newFormGroup.value.subInputs[0]).toEqual(subInputExpectedType);
  });

  it('should add sub input to control with boolean type', () => {
    const newFormGroup = new FormGroup({
      type: new FormControl(InputType.Boolean),
      subInputs: new FormArray([])
    });

    component.addNewSubInputToControl(newFormGroup);

    const subInputExpectedType = {
      parentType: InputType.Boolean,
      question: '',
      type: InputType.Text,
      conditionType: 'EQUALS',
      conditionValue: false,
      subInputs: []
    };

    expect(newFormGroup.value.subInputs[0]).toEqual(subInputExpectedType);
  });

  it('should add sub input to control with number type', () => {
    const newFormGroup = new FormGroup({
      type: new FormControl(InputType.Number),
      subInputs: new FormArray([])
    });

    component.addNewSubInputToControl(newFormGroup);

    const subInputExpectedType = {
      parentType: InputType.Number,
      question: '',
      type: InputType.Text,
      conditionType: 'EQUALS',
      conditionValue: 0,
      subInputs: []
    };

    expect(newFormGroup.value.subInputs[0]).toEqual(subInputExpectedType);
  });

  it('should delete control in array', () => {
    const formControlToDelete = new FormControl('');
    const formGroup = new FormGroup({
      subInputs: new FormArray([new FormGroup({}), formControlToDelete, new FormGroup({})])
    });
    const formArray = formGroup.get('subInputs') as FormArray;
    const initialLength = formArray.length;

    component.deleteControl({ control: formControlToDelete, index: 2 });
    expect(formArray.at(2)).not.toBe(formControlToDelete);
    expect(formArray.length).toBe(initialLength - 1);
  });

  it('should create new form group from given data', function () {
    const formGroup1 = new FormGroup({
      parentType: new FormControl(''),
      conditionType: new FormControl(''),
      conditionValue: new FormControl('')
    });
    const formGroup2 = new FormGroup({
      parentType: new FormControl(''),
      conditionType: new FormControl(''),
      conditionValue: new FormControl('')
    });

    const rootFormGroup = new FormGroup({
      subInputs: new FormArray([formGroup1, formGroup2])
    });

    component.patchConditionsInChildren({
      control: rootFormGroup,
      type: InputType.Text
    });
  });
  describe('when initialized', () => {
    let mockedFormBuilderData;
    beforeEach(() => {
      mockedFormBuilderData = initialFormBuilderValue;
      component.inputsForm = new FormGroup({
        subInputs: new FormArray([])
      });
    });

    it('should create form from fetchedData', async(() => {
      spyOn(storageService, 'getForm').and.returnValue(Promise.resolve(mockedFormBuilderData));
      spyOn(storageService, 'updateForm').and.stub();

      component.ngOnInit();

      fixture.whenStable().then(() => {
        expect(component.inputsFormArray.getRawValue()).toEqual(mockedFormBuilderData);
      });

    }));

    it('should call updateForm method from storageService', () => {
      spyOn(storageService, 'getForm').and.returnValue(Promise.resolve(mockedFormBuilderData));
      spyOn(storageService, 'updateForm').and.stub();

      component.ngOnInit();

      fixture.whenStable().then(() => {
        expect(storageService.updateForm).toHaveBeenCalledTimes(6);
      });
    });
  });
});
