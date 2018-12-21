import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';
import { DeleteControlEvent } from '../../models/delete-control-event';
import { Observable, of, Subscription } from 'rxjs';
import { TypeValueChanges } from '../../models/type-value-changes';
import { startWith } from 'rxjs/operators';
import { InputType } from '../../models/input-type.enum';

@Component({
  selector: 'app-input-creator',
  templateUrl: './input-creator.component.html',
  styleUrls: ['./input-creator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputCreatorComponent implements OnInit, OnDestroy {
  @Input() control: FormGroup;
  @Input() index: number;
  @Input() nestedLevel: number;
  @Output() deleteClicked = new EventEmitter<DeleteControlEvent>();
  @Output() addSubInputClicked = new EventEmitter<FormGroup>();
  @Output() typeValueChange = new EventEmitter<TypeValueChanges>();
  parentType: Observable<InputType>;
  typeValueChangesSubscription: Subscription;
  inputTypes = InputType;

  get subInputsControls(): AbstractControl[] {
    const subInputFormArray = this.control.get('subInputs') as FormArray;
    return subInputFormArray.controls;
  }

  constructor() {
  }

  ngOnInit(): void {
    this.listenToTypeChange();
    this.initParentTypeObservable();
  }

  emitTypeValueChange({ control, type }) {
    return this.typeValueChange.emit({ control, type });
  }

  emitDeleteClickedEvent(control, index): void {
    this.deleteClicked.emit({ control, index });
  }

  emitAddSubInputEvent(control: FormGroup): void {
    this.addSubInputClicked.emit(control);
  }

  ngOnDestroy(): void {
    this.typeValueChangesSubscription.unsubscribe();
  }

  private initParentTypeObservable(): void {
    const parentTypeControl = this.control.get('parentType');

    if (parentTypeControl == null) {
      this.parentType = of(null);
      return;
    }

    this.parentType = parentTypeControl.valueChanges
      .pipe(
        startWith(parentTypeControl.value)
      );
  }

  private listenToTypeChange(): void {
    this.typeValueChangesSubscription = this.control.get('type')
      .valueChanges
      .subscribe((type: InputType) => {
        this.emitTypeValueChange({ control: this.control, type });
      });
  }
}
