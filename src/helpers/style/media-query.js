export const isMobileWindow = () => window && window.innerWidth <= 480;

export const isMobile = style => `
  @media screen and (max-width: 480px) {
    ${style}
  }
`;

export const isTabletWindow = () => window && window.innerWidth >= 768 && window.innerWidth <= 1024;

export const isTablet = style => `
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    ${style}
  }
`;

export const isPcWindow = () => window && window.innerWidth >= 1024;

export const isPc = style => `
  @media screen and (min-width: 1024px) {
    ${style}
  }
`;
