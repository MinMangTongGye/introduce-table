import styled from '@emotion/styled';

import {css} from "@emotion/react";

const NO_MARGIN = css`
  margin: 0; padding: 0;
`;

const H1 = styled.h1`
  ${NO_MARGIN};
  
  font-size: 36px;
  color: #383838;
`;


const H3 = styled.h1`
  ${NO_MARGIN};
  
  font-size: 16px;
  color: #606060;
`;

const P = styled.p`
  ${NO_MARGIN}; 
  
  font-size: 16px;
  line-height: 20px;
`;

export default {
  H1,
  H3,
  P
};
