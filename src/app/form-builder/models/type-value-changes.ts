import { FormGroup } from '@angular/forms';
import { InputType } from './input-type.enum';

export interface TypeValueChanges {
  type: InputType;
  control: FormGroup;
}
