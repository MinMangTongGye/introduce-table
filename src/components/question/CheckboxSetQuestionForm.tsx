import styled from '@emotion/styled';

import {Input} from "../Input";
import Typo from "../Typo";
import {useMemo, useState} from "react";

const Form = styled.section`
  display: flex;
  flex-direction: column;
  
  gap: 32px;
`;

const Selection = styled.label<{ checked: boolean }>`
  display: flex;
  height: 56px;
  
  align-items: center;
  justify-content: center;

  box-sizing: border-box;

  border-radius: 16px;

  background: #e3e3e3;
  box-shadow: inset  4px  4px 6px rgba(255, 255, 255, 0.3),
  2px 2px 6px rgba(0, 0, 0, 0.16);

  border: solid 0.5px rgba(0, 0, 0, 0.1);


  color: #707070;
  font-size: 24px;
  font-weight: bold;

  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.16);
  
  input {
    display: none;
  }
  
  ${({checked}) => checked && `
    background: #f9c6c6;
    color: white;
  `}
  
  transition: background 0.15s, color 0.15s;
`;

type CheckboxSetQuestionFormProps = {
  question: CheckboxSetQuestion;

  value: string[];
  onChange: (value: string[]) => unknown;
};

export const CheckboxSetQuestionForm = ({ question, value, onChange }: CheckboxSetQuestionFormProps) => {
  const selectedKey = useMemo(() => new Set(value), [value]);

  return (
    <Form>
      { question.keys.map((key, index) => (
        <Selection key={index} checked={selectedKey.has(key)}>
          <input
            type={ question.multiple ? 'checkbox' : 'radio' }
            name={`question_checkbox`}
            id={`question_checkbox_${index}`}

            value={key}
            checked={selectedKey.has(key)}
            onChange={(e) => {
              if (question.multiple) {
                const set = new Set(selectedKey);
                if (selectedKey.has(key)) {
                  set.delete(key);
                } else {
                  set.add(key);
                }

                onChange(Array.from(set));
              } else {
                onChange([e.target.value]);
              }
            }}
          />
          { key }
        </Selection>
      )) }
    </Form>
  );
};
