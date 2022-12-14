import styled from '@emotion/styled';
import bgImage from '../table_base.jpg';

type PageProps = {
  fullscreen?: boolean;
}

export const Page = styled.section<PageProps>`
  display: flex;
  flex-direction: column;
 
  box-sizing: border-box;
  
  background: white;
  
  ${({ fullscreen }) => fullscreen ? `
    padding: 32px;
    min-height: 100vh;
  ` : `
  
    padding: 96px 32px;
    background: linear-gradient(to bottom, transparent 0, white 64px, white calc(100% - 64px), transparent 100%);
  
    &:before {
      content: '';
      position: absolute;
      left: 0; top: 0;
      width: 100%;
      height: 100%;
      
      background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.4) 100%), url('${bgImage}');
      background-position: center;
      background-size: cover;
      
      filter: blur(4px);
      
      z-index: -1;
       
    }
  `};
`;
