import React from 'react';
import styled from 'styled-components';
import { Link } from 'next/link';
import { Colors, FontSizes } from 'variables';
import { media, mediaMin } from 'helpers/style/media-query';

const TextLink = styled.div`
  color: ${Colors.linkBlue};
  line-height: normal;
  font-size: ${props => props.fontSize || FontSizes.small_15}px;
  ${media.phone`
      font-size: ${props => props.fontsizesp || FontSizes.small_12}px;
  `};

  font-weight: ${props => (props.bold ? 'bold' : 'normal')};
  ${props =>
    props.underline &&
    `
    text-decoration: underline;
  `};
  cursor: pointer;

  ${props =>
    props.color
      ? `
        &:link {
          color: ${props.color};
        }
        &:visited {
          color: ${props.color};
        }
        &:active {
          color: ${props.color};
        }
      `
      : `
        &:link {
          color: ${props.linkBlue};
        }
        &:visited {
          color: ${props.linkBlue};
        }
        &:active {
          color: ${props.linkBlue};
        }
      `};

  ${props =>
    props.colorhover &&
    `
      &:active {
        color: ${props.colorhover};
    `};

  ${props =>
    props.disabled &&
    `
    cursor: not-allowed;
    color: ${Colors.lightGray1};
    &:link { color: ${Colors.lightGray1}; }
    &:visited { color: ${Colors.lightGray1}; }
    &:active { color: ${Colors.lightGray1}; }
  `};

  ${props =>
    props.error &&
    `
    color: ${Colors.error};
    &:link { color: ${Colors.error}; }
    &:visited { color: ${Colors.error}; }
    &:active { color: ${Colors.error}; }
  `};

  ${mediaMin.tablet`
    ${props =>
      !props.disabled &&
      `
        ${
          props.color
            ? `
            &:hover {
              color: ${props.color};
              opacity: 0.8;
            }
          `
            : `
            &:hover {
              color: ${props.linkBlue};
              opacity: 0.8;
            }
          `
        };

        ${props.colorhover &&
          `
            &:hover {
              color: ${props.colorhover};
            }
          `};

        ${
          props.color
            ? `
            &:hover {
              color: ${props.color};
              opacity: 0.8;
            }
          `
            : `
            &:hover {
              color: ${props.linkBlue};
              opacity: 0.8;
            }
          `
        };

        ${props.error &&
          `
            &:hover { color: ${Colors.error}; opacity: 0.8; }
          `};

      `};
  `};
`;

export default props =>
  props.href ? (
    props.key ? (
      <TextLink as="a" {...props} href={props.href} key={props.key}>
        {props.children}
      </TextLink>
    ) : (
      <TextLink as="a" {...props} href={props.href}>
        {props.children}
      </TextLink>
    )
  ) : (
    <TextLink as={Link} {...props} to={props.to || ''}>
      {props.children}
    </TextLink>
  );
