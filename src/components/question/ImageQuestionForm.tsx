import styled from '@emotion/styled';

import {Input} from "../Input";
import Typo from "../Typo";
import {useEffect, useRef, useState} from "react";

const PhotoArea = styled.label`
  display: flex;
  margin: 0 auto;
  
  width: 250px;
  height: 250px;
  
  align-items: center;
  justify-content: center;
  
  border: 1px solid black;
  
  background-size: cover;
  background-position: center center;
  
  input {
    display: none;
  }
`;

type ImageQuestionFormProps = {
  question: ImageQuestion;
  onChange: (value: string) => unknown;
};

export const ImageQuestionForm = ({ question, onChange }: ImageQuestionFormProps) => {
  const [fileContent, setFileContent] = useState<string>('');

  useEffect(() => {
    onChange(fileContent);
  }, [onChange, fileContent]);

  return (
    <div>
      <PhotoArea style={{
        backgroundImage: `url(${fileContent})`
      }}>
        { !fileContent && <Typo.P>여기를 눌러 이미지를 선택하십시오</Typo.P> }
        <input type="file" onChange={(e) => {
          const fileReader = new FileReader();
          const file = e.target.files?.item(0);
          if (!file) {
            return;
          }


          fileReader.readAsDataURL(file);
          fileReader.addEventListener('load', () => {
            setFileContent(fileReader.result!.toString());
          });
        }} />
      </PhotoArea>
    </div>
  );
};
