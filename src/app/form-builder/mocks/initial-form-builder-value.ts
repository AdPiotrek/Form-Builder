export const initialFormBuilderValue = [
  {
    question: 'input1Q',
    condition: 'input1C',
    type: 'Text',
    subInputs: [
      {
        parentType: Text,
        question: 'subInput1Q',
        type: 'Text',
        conditionType: 'Text',
        conditionValue: 'Value',
        subInputs: []
      },
      {
        parentType: Text,
        question: 'subInput1Q',
        type: 'Text',
        conditionType: 'Text',
        conditionValue: 'Value',
        subInputs: []
      }
    ],
  },
  {
    question: 'input1Q',
    condition: 'input1C',
    type: 'Number',
    subInputs: [
      {
        parentType: Text,
        question: 'subInput1Q',
        type: 'Text',
        conditionType: 'Text',
        conditionValue: 'Value',
        subInputs: [
          {
            parentType: Text,
            question: 'subInput1Q',
            type: 'Text',
            conditionType: 'Text',
            conditionValue: 'Value',
            subInputs: []
          }
        ]
      }
    ],
  }
];
