import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputCreatorComponent } from './input-creator.component';
import { QuestionValueChangeEvent } from '../../models/question-value-change-event';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { GetEqualOptionsPipe } from '../../pipes/get-equal-options.pipe';
import { InputType } from '../../models/input-type.enum';
import { DeleteControlEvent } from '../../models/delete-control-event';
import { emit } from 'cluster';
import { Subscription } from 'rxjs';

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

  describe('emitTypeValueChange', () => {
    let eventToEmit: QuestionValueChangeEvent;

    beforeEach(() => {
      eventToEmit = {
        control: new FormGroup({}),
        type: InputType.Number
      };
    });

    it('emmited event has to be equal with passed object', () => {


      component.typeValueChange.subscribe((event: QuestionValueChangeEvent) => {
        expect(event.control).toBe(eventToEmit.control);

        expect(event).toEqual(eventToEmit);
        // We have synchronous eventEmmiter that's why we don't have to use done or something like this
      });

      component.emitTypeValueChange(eventToEmit);
    });

    it('should emit typeValueChangeEvent and control reference should be the same', () => {

      component.typeValueChange.subscribe((event: QuestionValueChangeEvent) => {
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

  describe(('inputCreator component state after initialization'), () => {
    let control;
    let newValue;
    beforeEach(() => {
      control = new FormGroup({
        conditionType: new FormControl(),
        parentType: new FormControl(),
        type: new FormControl()
      });

      newValue = {
        conditionType: 'newCondition',
        parentType: 'newParentType',
        type: 'newType'
      };

      component.control = control;
      component.ngOnInit();

    });

    it('conditionType field should emit values on form change', function () {
      component.control = control;
      component.ngOnInit();
      component.conditionType.subscribe(valueChanges => {
        expect(valueChanges).toEqual(newValue.conditionType);
      });

      component.control.patchValue(newValue);

    });


    it('parentType field should emit values on form change', function () {

      component.parentType.subscribe(valueChanges => {
        expect(valueChanges).toEqual(newValue.parentType);
      });

      component.control.patchValue(newValue);
    });

    it('should emit type value change on change type field', function () {

      component.typeValueChange.subscribe((event: QuestionValueChangeEvent) => {
        expect(event.type).toEqual(newValue.type);
      });

      component.control.patchValue(newValue);
    });

    it('typeValueChangesSubscription should be opened', () => {
      expect(component.typeValueChangesSubscription.closed).toBe(false);
    });


  });



});
