import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import styled from "@emotion/styled";

import {Page} from "../components/Page";
import Typo from '../components/Typo';
import {Button} from "../components/Button";
import {StringQuestionForm} from "../components/question/StringQuestionForm";
import {StringSetQuestionForm} from "../components/question/StringSetQuestionForm";
import {CheckboxSetQuestionForm} from "../components/question/CheckboxSetQuestionForm";
import {ImageQuestionForm} from "../components/question/ImageQuestionForm";
import {AppContext} from "../contexts/AppContext";
import {ResultTable} from "../components/ResultTable";

import html2canvas from "html2canvas";

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

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  
  justify-content: center;
  
  flex-grow: 1;
  
  div {
    text-align: center;
  }
  
  img {
    max-width: 100%;
    margin-bottom: 24px;
  }
  
  p {
    margin-bottom: 24px;
  }
`;

export const ResultPage = () => {
  const { responses } = useContext(AppContext);
  const [isTableRendered, setTableRendered] = useState<boolean>(false);
  const [dataUrl, setDataUrl] = useState<string>('');

  const shareToApp = useCallback(async () => {
    const blob = await (await fetch(dataUrl)).blob();
    const filesArray: File[] = [
      new File([blob], 'result.png', { type: blob.type, lastModified: new Date().getTime() })
    ];
    const shareData = {
      text: '#민망통계 #게이자소서 간단하게 당신을 소개해보세요! https://minmangtonggye.github.io/introduce-table @minmangtonggye',
      files: filesArray,
    };

    await navigator.share(shareData as any);
  }, [dataUrl]);

  useEffect(() => {
    (async () => {
      const canvas = await html2canvas(document.querySelector('#__result_table__')!);
      const dataUrl = canvas.toDataURL();

      setDataUrl(dataUrl);
      setTableRendered(true);
    })();
  }, []);

  return (
    <Page fullscreen>
      <Header>
        <Typo.H1>작성 완료!</Typo.H1>
      </Header>

      { !isTableRendered && <ResultTable responses={responses} /> }
      <ContentWrapper>
        <img src={dataUrl} />

        <div>
          <Typo.P>아래 버튼을 눌러 Twitter에 공유하거나, 이미지를 길게 눌러서 저장할 수 있어요!</Typo.P>
        </div>
        <Button onClick={() => shareToApp()}>다른 앱으로 공유하기</Button>
      </ContentWrapper>
    </Page>
  );
};

