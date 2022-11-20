import React, {useContext, useEffect, useMemo, useState} from 'react';
import styled from "@emotion/styled";

import {Page} from "../components/Page";
import Typo from '../components/Typo';
import {Button} from "../components/Button";

const Header = styled.header`
  display: block;
  
  margin-bottom: 128px;
`;

const Buttons = styled.div`
  text-align: right;
`;

type QuestionPageProps = {
  questionDef: QuestionDef;

  nextQuestion: (key: string, value: string) => Promise<unknown>;
  skipQuestion: (key: string) => Promise<unknown>;
}

export const QuestionPage = ({ questionDef, nextQuestion, skipQuestion }: QuestionPageProps) => {
  const { question } = questionDef;
  const [isValidated, setValidated] = useState<boolean>(false);

  return (
    <Page>
      <Header>
        <Typo.H1>{ questionDef.title }</Typo.H1>
        <p>{ questionDef.description }</p>
      </Header>

      <Buttons>
        {isValidated ?
          <Button onClick={() => nextQuestion(questionDef.key, "")}>다음</Button> :
          <Button onClick={() => skipQuestion(questionDef.key)}>건너뛰기</Button>
        }
      </Buttons>
    </Page>
  );
};

