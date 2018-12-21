import { Pipe, PipeTransform } from '@angular/core';
import { InputType } from '../models/input-type.enum';

@Pipe({
  name: 'getEqualOptions'
})
export class GetEqualOptionsPipe implements PipeTransform {

  transform(parentType: InputType): any {
    switch (parentType) {
      case InputType.Text:
        return ['EQUALS'];
      case InputType.Boolean:
        return ['EQUALS'];
      case InputType.Number:
        return ['GREATER THEN', 'EQUALS', 'LESS THEN'];

    }
  }

}
