import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import { Colors, FontSizes } from 'variables';
import { media, mediaMin } from 'helpers/style/media-query';

export const PrimaryButton = styled.div`
  box-sizing: border-box;
  width: ${props => (props.width ? props.width : '100%')};
  ${props => !props.fill && `max-width: 320px;`}
  text-align: center;
  font-size: ${props => props.fontSize || FontSizes.small_15}px;
  ${media.phone`
    font-size: ${props => props.fontSizeSp || FontSizes.small_15}px;
  `};
  font-weight: ${props => (props.fontbold ? 'bold' : 'normal')};
  color: ${Colors.white};
  background: ${Colors.brandPrimary};

  border-radius: ${props => (props.borderRadius ? props.borderRadius : 3)}px;
  cursor: pointer;

  ${props => (props.lineheight ? `line-height: ${props.lineheight}px;` : `line-height: normal`)};

  height: 48px;
  ${props =>
    props.height &&
    `
      height: ${props.height}px;
    `};

  padding: 13px 10px;
  ${props =>
    props.padding &&
    `
      padding: ${props.padding};
    `};

  ${props =>
    props.inlineblock &&
    `
      display: inline-block;
    `};

  ${props =>
    props.center &&
    `
    margin: 0 auto;
  `};

  ${props =>
    props.disabled
      ? `
        background: ${Colors.lightGray1};
        cursor: not-allowed;
      `
      : `
        &:active {
          background: ${Colors.brandTerciary};
        }
        &:active span {
          opacity: 0.8;
        }
      `};

  ${mediaMin.tablet`
    ${props =>
      !props.disabled &&
      `
        &:hover {
          background: ${Colors.brandTerciary};
        }
        &:hover span {
          opacity: 0.8;
        }
      `};
  `};

  ${props =>
    props.small &&
    `
      padding: 8px 4px;
      font-size: 12px;
    `};

  ${props =>
    props.medium &&
    `
      padding: 12px 8px;
      font-size: 16px;
    `};

  ${props =>
    props.fontSize &&
    `
      font-size: ${props.fontSize}px;
    `};

  ${media.tablet`
    ${props =>
      props.heightTab &&
      `
        height: ${props.heightTab}px;
      `};
    ${props =>
      props.paddingTab &&
      `
        padding: ${props.paddingTab};
      `};
  `};

  ${media.phone`
    ${props =>
      props.heightSp &&
      `
        height: ${props.heightSp}px;
      `};
    ${props =>
      props.paddingSp &&
      `
        padding: ${props.paddingSp};
      `};
      ${props =>
        props.lineheightSp &&
        `
          line-height: ${props.lineheightSp}px;
        `};
  `};
`;

export default ({ link, href, blank, ...props }) =>
  link ? (
    <Link href={href} passHref>
      <a {...props} target={blank ? '_blank' : '_self'}>
        <PrimaryButton {...props} />
      </a>
    </Link>
  ) : (
    <PrimaryButton {...props} tabIndex={0} />
  );
