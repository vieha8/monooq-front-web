import { css } from 'styled-components';

export const isMobileWindow = () => window && window.innerWidth <= 480;

export const isMobile = style => css`
  @media screen and (max-width: 480px) {
    ${css(style)};
  }
`;

export const isTabletWindow = () => window && window.innerWidth >= 768 && window.innerWidth <= 1024;

export const isTablet = style => css`
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    ${css(style)};
  }
`;

export const isPcWindow = () => window && window.innerWidth >= 1024;

export const isPc = style => css`
  @media screen and (min-width: 1024px) {
    ${css(style)};
  }
`;
