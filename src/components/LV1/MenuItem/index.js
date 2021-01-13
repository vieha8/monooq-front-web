import styled from 'styled-components';
import { Dimens, Colors } from 'variables';
import { media, mediaMin } from 'helpers/style/media-query';

const MenuItem = styled.li`
  position: relative;
  display: table;
  width: 100%;
  margin: auto;
  font-weight: 500;
  background-color: ${Colors.white};
  border-top: 1px solid ${Colors.borderGray2};
  &:active {
    cursor: pointer;
    background: ${Colors.lightGray5};
  }
  &:before {
    position: absolute;
    top: 50%;
    right: ${Dimens.medium_20}px;
    display: block;
    content: '';
    width: ${Dimens.small_10}px;
    height: ${Dimens.small_10}px;
    margin-top: -5px;
    border-top: 1.5px solid ${Colors.black2};
    border-right: 1.5px solid ${Colors.black2};
    transform: rotate(45deg);
  }
  &:first-child {
    border-top: none;
  }
  ${props =>
    props.logout &&
    `
      background-color: unset;
      &:last-child:before {
        content: none;
      }
    `};
  ${props =>
    props.header &&
    `
      pointer-events: none;
      background-color: unset;
      padding: ${Dimens.xxsmall_4}px 0 ${Dimens.xxsmall_4}px ${Dimens.medium_20}px;
      &:before {
        content: none;
      }
    `};

  ${mediaMin.tablet`
    ${props =>
      !props.disabled &&
      `
        &:hover {
          cursor: pointer;
          background: ${Colors.lightGray5};
        }
      `};
  `};

  ${media.tablet`
    width: 100%;
  `};
`;

export default MenuItem;
