// @flow

import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import InlineText from 'components/atomic/LV1/InlineText';
import AvatarImage from 'components/atomic/LV1/AvatarImage';
import { Dimens, Colors } from 'variables';

const Container = styled.li`
  border: 1px solid ${Colors.borderGray};
  &:not(:first-child) {
    border-top: none;
  }
  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.1);
  }
  a {
    display: block;
    width: 100%;
    padding: ${Dimens.medium1}px;
  }
  list-style: none;
`;

const Cell = styled.div`
  display: table-cell;
  vertical-align: middle;
  &:not(:first-child) {
    padding-left: ${Dimens.medium}px;
  }
`;

export type PropTypes = {
  link: string,
  image: string,
  name: string,
  spaceName?: string,
  receivedAt: string | Date | moment,
};

export default (props: PropTypes) => (
  <Container>
    <Link to={props.link || ''}>
      <Cell>
        <AvatarImage src={props.image} />
      </Cell>
      <Cell>
        <div>
          <InlineText.Base singleLine>{props.name}</InlineText.Base>
        </div>
        {/* <div>
          <InlineText.Small color={Colors.lightGray1} singleLine>
            <i className="far fa-map-marker-alt" /> {props.spaceName}
          </InlineText.Small>
        </div> */}
        <div>
          <InlineText.Small color={Colors.lightGray1}>
            <i className="far fa-clock" /> {moment(props.receivedAt).format('YYYY/MM/DD kk:mm:ss')}
          </InlineText.Small>
        </div>
      </Cell>
    </Link>
  </Container>
);
