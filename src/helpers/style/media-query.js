import { css } from 'styled-components';

const sizes = {
  giant1: 1330,
  giant: 1170,
  desktop: 1024,
  tablet1: 834,
  tablet: 768,
  phone: 480,
  phoneSmall: 374,
};

// iterate through the sizes and create a media template
export const media = Object.keys(sizes).reduce((_accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const accumulator = { ..._accumulator };
  const emSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

// iterate through the sizes and create a media template
export const mediaMin = Object.keys(sizes).reduce((_accumulator, label) => {
  // use em in breakpoints to work properly cross-browser and support users
  // changing their browsers font-size: https://zellwk.com/blog/media-query-units/
  const accumulator = { ..._accumulator };
  const emSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (min-width: ${emSize}em) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

export const isMobileWindow = () => window && window.innerWidth <= sizes.phone;

export const isTabletWindow = () =>
  window && window.innerWidth >= sizes.phone && window.innerWidth <= sizes.desktop;

export const isPcWindow = () => window && window.innerWidth >= sizes.desktop;

export const isOverTabletWindow = () => window && window.innerWidth > sizes.tablet;

export const isOverPhoneWindow = () => window && window.innerWidth > sizes.phone;
