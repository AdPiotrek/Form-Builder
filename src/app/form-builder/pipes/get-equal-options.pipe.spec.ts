import { GetEqualOptionsPipe } from './get-equal-options.pipe';
import { InputType } from '../models/input-type.enum';

describe('GetEqualOptionsPipe', () => {
  it('create an instance', () => {
    const pipe = new GetEqualOptionsPipe();
    expect(pipe).toBeTruthy();
  });

  it('should return proper value for given text type', () => {
    const transformedValue = new GetEqualOptionsPipe().transform(InputType.Text);

    const expectedVal = [
      {
        type: 'equals',
        display: 'Equals'
      }
    ];

    expect(transformedValue).toEqual(expectedVal);
  });

  it('should return proper value for given boolean type', () => {
    const transformedValue = new GetEqualOptionsPipe().transform(InputType.Boolean);

    const expectedVal = [
      {
        type: 'equals',
        display: 'Equals'
      }
    ];

    expect(transformedValue).toEqual(expectedVal);
  });

  it('should return proper value for given number type', () => {
    const transformedValue = new GetEqualOptionsPipe().transform(InputType.Number);

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
