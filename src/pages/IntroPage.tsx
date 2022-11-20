import React from 'react';
import styled from "@emotion/styled";

import {Page} from "../components/Page";
import Typo from '../components/Typo';
import {Button} from "../components/Button";

const Header = styled.header`
  display: block;
  text-align: center;
  
  margin-bottom: 128px;
`;

const Footer = styled.div`
  text-align: center;
`;

type IntroPageProps = {
  start: () => Promise<unknown>;
}

export const IntroPage = ({ start }: IntroPageProps) => {
  return (
    <Page>
      <Header>
        <Typo.H1>남성 동성애자<br/>자기 소개서</Typo.H1>
      </Header>

      <Footer>
        <div>
          <Button onClick={start}>시작하기</Button>
        </div>
        <p>
          Twitter <a href="https://twitter.com/minmangtonggye">@minmangtonggye</a> 제작<br />
          Fork me on Github
        </p>
        <p>
          본 웹사이트는 어떠어떠한 용도로 만들어졌습니다
        </p>
      </Footer>
    </Page>
  );
};

