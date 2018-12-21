import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilderComponent } from './form-builder.component';
import { ReactiveFormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';
import { InputCreatorComponent } from '../../components/input-creator/input-creator.component';
import { GetEqualOptionsPipe } from '../../pipes/get-equal-options.pipe';

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

  it('should have initialize with formGroup', () => {
    expect(component.inputsForm).toBeTruthy();
    console.log(component.inputsForm);
    console.log(component.inputsFormArray);
    expect(component.inputsFormArray.value).toEqual([]);
  });

  it('should have initialized value', async () => {

    spyOn(storageService, 'getForm').and.returnValue(Promise.resolve());

  });

  it('should be unnamed', function () {
    spyOn(component,  'fillInputWithOldData').and.callThrough();
  });
});
