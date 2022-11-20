declare type ImageQuestion = {
  type: 'image';
};

declare type StringQuestion = {
  type: 'string';

  prefix?: string;
  suffix?: string;
  multiLine?: boolean;
}

declare type StringSetQuestion = {
  type: 'stringset';
  keys: string[];
}

declare type CheckboxSetQuestion = {
  type: 'checkboxset';

  keys: string[];
  multiple?: boolean;
}

declare type StringRangeQuestion = {
  type: 'stringrange';

  prefix?: string;
  suffix?: string;
}

declare type Question = ImageQuestion | StringQuestion | StringSetQuestion | CheckboxSetQuestion | StringRangeQuestion;

declare type QuestionDef = {
  key: string;
  title: string;
  description: string;
  question: Question;

  is_sensitive?: boolean;
}

declare type QuestionListJSON = {
  questions: QuestionDef[];
}
