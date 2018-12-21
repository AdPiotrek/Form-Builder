import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCreatorComponent } from './input-creator.component';
import { TypeValueChanges } from '../../models/type-value-changes';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetEqualOptionsPipe } from '../../pipes/get-equal-options.pipe';
import { InputType } from '../../models/input-type.enum';
import { DeleteControlEvent } from '../../models/delete-control-event';
import { skip } from 'rxjs/operators';

describe('InputCreatorComponent', () => {
  let component: InputCreatorComponent;
  let fixture: ComponentFixture<InputCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InputCreatorComponent, GetEqualOptionsPipe],
      imports: [ReactiveFormsModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputCreatorComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should parentType emit null', () => {
    component.control = null;
    component.typeValueChange.subscribe(value => {
      expect(value).toBeNull();
    });
  });


  describe('emitTypeValueChange', () => {
    let eventToEmit: TypeValueChanges;

    beforeEach(() => {
      eventToEmit = {
        control: new FormGroup({}),
        type: InputType.Number
      };
    });

    it('emmited event has to be equal with passed object', () => {


      component.typeValueChange.subscribe((event: TypeValueChanges) => {

        expect(event).toEqual(eventToEmit);
        // We have synchronous eventEmmiter that's why we don't have to use done or something like this
      });

      component.emitTypeValueChange(eventToEmit);
    });

    it('should emit typeValueChangeEvent and control reference should be the same', () => {

      component.typeValueChange.subscribe((event: TypeValueChanges) => {
        expect(event.control).toBe(eventToEmit.control);
      });

      component.emitTypeValueChange(eventToEmit);
    });


  });

  describe('emitDeleteClickedEvent', () => {
    let controlToEmit;
    let indexToEmit;
    let buildedEvent: DeleteControlEvent;

    beforeEach(() => {
      controlToEmit = new FormGroup({});
      indexToEmit = 5;

      buildedEvent = {
        control: controlToEmit,
        index: indexToEmit
      };
    });

    it('emmited event has to be equal with passed object', () => {

      component.deleteClicked.subscribe((event: DeleteControlEvent) => {
        expect(event).toEqual(buildedEvent);
      });

      component.emitDeleteClickedEvent(controlToEmit, indexToEmit);

    });

    it('emmited event control has to have same reference with passed control', () => {

      component.deleteClicked.subscribe((event: DeleteControlEvent) => {
        expect(event.control).toBe(buildedEvent.control);
      });

      component.emitDeleteClickedEvent(controlToEmit, indexToEmit);

    });



  });

  it('addSubInputEmitedEvent control has to have same reference with passed control', () => {

    const control = new FormGroup({});

    component.addSubInputClicked.subscribe((event: FormGroup) => {
      expect(event).toBe(control);
    });

    component.emitAddSubInputEvent(control);

  });

  describe(('when is initialized'), () => {
    let control;
    let newValue;
    const initVal = 'initVal';
    beforeEach(() => {
      control = new FormGroup({
        type: new FormControl(initVal),
        parentType: new FormControl(initVal),
        conditionType: new FormControl(initVal)
      });

      newValue = {
        conditionType: 'newCondition',
        parentType: 'newParentType',
        type: 'newType'
      };

      component.control = control;
      component.ngOnInit();

    });

    it('should paretType emit initial value', () => {
      component.parentType.subscribe(valueChanges => {
        expect(valueChanges).toEqual('initVal');
      });

    });

    it('should parentType emit values on form change', () => {
      component.parentType.pipe(
        skip(1)
      ).subscribe(valueChanges => {
        expect(valueChanges).toEqual(newValue.parentType);
      });

      component.control.patchValue(newValue);
    });

    it('should emit type value change on change type field', function () {

      component.typeValueChange.subscribe((event: TypeValueChanges) => {
        expect(event.type).toEqual(newValue.type);
      });

      component.control.patchValue(newValue);
    });

    it('should open typeValueChangesSubscription', () => {
      expect(component.typeValueChangesSubscription.closed).toBe(false);
    });


    it('should unsubscribe typeValueChanges on destroy', function () {
      component.ngOnDestroy();
      expect(component.typeValueChangesSubscription.closed).toBe(true);
    });

  });
});
