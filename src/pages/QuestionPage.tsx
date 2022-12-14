import React, {useContext, useEffect, useMemo, useState} from 'react';
import styled from "@emotion/styled";

import {Page} from "../components/Page";
import Typo from '../components/Typo';
import {Button} from "../components/Button";
import {StringQuestionForm} from "../components/question/StringQuestionForm";
import {StringSetQuestionForm} from "../components/question/StringSetQuestionForm";
import {CheckboxSetQuestionForm} from "../components/question/CheckboxSetQuestionForm";
import {ImageQuestionForm} from "../components/question/ImageQuestionForm";

const Header = styled.header`
  display: block;
  
  h1 {
    margin-bottom: 16px;
  }
`;

const Buttons = styled.div`
  margin-top: 32px;
  text-align: right;
`;

const QuestionArea = styled.div`
  display: flex;
  flex-direction: column;
  
  justify-content: center;
  
  flex-grow: 1;
`;

type QuestionPageProps = {
  questionDef: QuestionDef;

  currentIndex: number;
  totalCount: number;

  nextQuestion: (key: string, value: any) => Promise<unknown>;
  skipQuestion: (key: string) => Promise<unknown>;
}

export const QuestionPage = ({ questionDef, currentIndex, totalCount, nextQuestion, skipQuestion }: QuestionPageProps) => {
  const { question } = questionDef;
  const [isValidated, setValidated] = useState<boolean>(false);

  const [strVal, setStrVal] = useState<string>('');
  const [arrVal, setArrVal] = useState<string[]>([]);
  const [dictVal, setDictVal] = useState<Record<string, string>>({});

  const value = useMemo(() => {
    if (question.type === 'string' || question.type === 'image') {
      return strVal;
    } else if (question.type === 'stringset') {
      return dictVal;
    }else if (question.type === 'checkboxset') {
      return arrVal;
    }
  }, [question, strVal, dictVal, arrVal]);

  useEffect(() => {
    if (question.type === 'string' || question.type === 'image') {
      setValidated(strVal.length > 0);
    } else if (question.type === 'stringset') {
      setValidated(Object.entries(dictVal).length > 0);
    } else if (question.type === 'checkboxset') {
      setValidated(arrVal.length > 0);
    }
  }, [question, strVal, dictVal, arrVal]);

  useEffect(() => {
    setStrVal('');
    setArrVal([]);
    setDictVal({});
    setValidated(false);
  }, [questionDef]);

  return (
    <Page fullscreen>
      <Header>
        <Typo.H1>{ questionDef.title }</Typo.H1>
        <Typo.H3>({totalCount}개 질문 중 {currentIndex + 1}번째) { questionDef.description }</Typo.H3>
      </Header>

      <QuestionArea>
        { question.type === 'image' &&
          <ImageQuestionForm
              question={question}

              onChange={setStrVal}
          />
        }
        { question.type === 'string' &&
            <StringQuestionForm
                question={question}

                value={strVal}
                onChange={setStrVal}
            />
        }

        { question.type === 'stringset' &&
            <StringSetQuestionForm
                question={question}

                value={dictVal}
                onChange={setDictVal}
            />
        }


        { question.type === 'checkboxset' &&
            <CheckboxSetQuestionForm
                question={question}

                value={arrVal}
                onChange={setArrVal}
            />
        }
      </QuestionArea>

      <Buttons>
        {isValidated ?
          <Button onClick={() => nextQuestion(questionDef.key, value)}>다음</Button> :
          <Button onClick={() => skipQuestion(questionDef.key)}>건너뛰기</Button>
        }
      </Buttons>
    </Page>
  );
};

