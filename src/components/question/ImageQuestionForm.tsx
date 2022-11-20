import styled from '@emotion/styled';

import {Input} from "../Input";
import Typo from "../Typo";
import {useEffect, useRef, useState} from "react";

const PhotoArea = styled.label`
  display: block;
  margin: 0 auto;
  
  width: 250px;
  height: 250px;
  
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
