import { FormGroup } from '@angular/forms';
import { InputType } from './input-type.enum';

export interface QuestionValueChangeEvent {
  type: InputType;
  control: FormGroup;
}
