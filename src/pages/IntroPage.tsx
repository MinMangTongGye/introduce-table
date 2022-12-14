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

const FooterNote = styled(Typo.P)`
  font-size: 12px;
  font-style: italic;
`

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
        </p>
        <FooterNote>
          본 웹사이트는 재미를 목적으로 만들어졌음을 밝힙니다.
        </FooterNote>
        <FooterNote>
          모든 입력 칸은 선택 사항이며,<br />대답하고 싶지 않은 경우 건너뛸 수 있습니다.
        </FooterNote>
      </Footer>
    </Page>
  );
};

