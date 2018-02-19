import { css } from 'styled-components';

export const isMobile = style => `
  @media screen and (min-width: 480px) {
    ${css`
      ${style};
    `}
  }
`;

export const isTablet = style => `
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    ${css`
      ${style};
    `}
  }
`;

export const isPC = style => `
  @media screen and (max-width: 1024px) {
    ${css`
      ${style};
    `}
  }
`;
