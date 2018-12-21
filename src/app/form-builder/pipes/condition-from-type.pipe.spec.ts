import { ConditionFromTypePipe } from './condition-from-type.pipe';
import { InputType } from '../models/input-type.enum';

describe('ConditionFromTypePipe', () => {
  it('create an instance', () => {
    const pipe = new ConditionFromTypePipe();
    expect(pipe).toBeTruthy();
  });

  it('should return proper value for given text type', () => {
    const transformedValue = new ConditionFromTypePipe().transform(InputType.Text);

    const expectedVal = [
      {
        type: 'equals',
        display: 'Equals'
      }
    ];

    expect(transformedValue).toEqual(expectedVal);
  });

  it('should return proper value for given boolean type', () => {
    const transformedValue = new ConditionFromTypePipe().transform(InputType.Boolean);

    const expectedVal = [
      {
        type: 'equals',
        display: 'Equals'
      }
    ];

    expect(transformedValue).toEqual(expectedVal);
  });

  it('should return proper value for given number type', () => {
    const transformedValue = new ConditionFromTypePipe().transform(InputType.Number);

    const expectedVal = [
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

    expect(transformedValue).toEqual(expectedVal);
  });


});
