import styled from '@emotion/styled';

type PageProps = {
  fullscreen?: boolean;
}

export const Page = styled.section<PageProps>`
  display: flex;
  flex-direction: column;
 
  padding: 96px 32px;
  box-sizing: border-box;
  
  background: white;
  background: linear-gradient(to bottom, transparent 0, white 64px, white calc(100% - 64px), transparent 100%);
  
  ${({ fullscreen }) => fullscreen && `
    min-height: 100vh;
  `};
`;
