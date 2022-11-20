import styled from '@emotion/styled';

import {Input} from "../Input";
import Typo from "../Typo";

const InputArea = styled.section`
  display: flex;
  flex-direction: column;
  
  p { margin-bottom: 8px; }
  
  &:not(:last-child) {
    margin-bottom: 32px;
  }
`;

type StringSetQuestionFormProps = {
  question: StringSetQuestion;

  value: Record<string, string>;
  onChange: (value: Record<string, string>) => unknown;
};

export const StringSetQuestionForm = ({ question, value, onChange }: StringSetQuestionFormProps) => {

  return (
    <>
      { question.keys.map((key, index) => (
        <InputArea key={index}>
          <Typo.P>{ key }</Typo.P>
          <Input value={value[key]} onChange={(e) => {
            const prevValue = {...value};
            console.log(prevValue);
            prevValue[key] = e.target.value;
            onChange(prevValue);
          }} />
        </InputArea>
      )) }
    </>
  );
};
