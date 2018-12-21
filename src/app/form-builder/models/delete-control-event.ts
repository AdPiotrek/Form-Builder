import { AbstractControl } from '@angular/forms';

export interface DeleteControlEvent {
  control: AbstractControl;
  index: number;
}
