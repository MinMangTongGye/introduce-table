import styled from '@emotion/styled';

import {Input, TextArea} from "../Input";
import Typo from "../Typo";

const InputArea = styled.section`
  display: flex;
  gap: 16px;
  
  align-items: center;

  input, textarea {
    flex: 1;
  }
  
  textarea {
    min-height: 250px;
  }
`

type StringQuestionFormProps = {
  question: StringQuestion;

  value: string;
  onChange: (value: string) => unknown;
};

export const StringQuestionForm = ({ question, value, onChange }: StringQuestionFormProps) => {
  return (
    <>
      <InputArea>
        { question.prefix && <Typo.P>{ question.prefix }</Typo.P> }
        {question.multiLine ?
          <TextArea value={value} onChange={(e) => onChange(e.target.value)}/> :
          <Input value={value} onChange={(e) => onChange(e.target.value)}/>
        }
        { question.suffix && <Typo.P>{ question.suffix }</Typo.P> }
      </InputArea>
    </>
  );
};
