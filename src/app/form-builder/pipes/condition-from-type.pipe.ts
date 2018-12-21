import { Pipe, PipeTransform } from '@angular/core';
import { InputType } from '../models/input-type.enum';

@Pipe({
  name: 'conditionFromType'
})
export class ConditionFromTypePipe implements PipeTransform {

  transform(parentType: InputType): any {
    switch (parentType) {
      case InputType.Boolean:
      case InputType.Text:
        return [
          {
            type: 'equals',
            display: 'Equals'
          }
        ];
      case InputType.Number:
        return [
          {
            type: 'equals',
            display: 'Equals'
          }, {
            type: 'greaterThen',
            display: 'Greater then'
          },
          {
            type: 'lessThan',
            display: 'Less than'
          }
        ];
    }
  }

}
