// @flow

import React from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import InlineText from 'components/atomic/atoms/InlineText';
import AvatarImage from 'components/atomic/atoms/AvatarImage';
import { Dimens, Colors } from 'variables';

const Container = styled.li`
  border: 1px solid ${Colors.borderGray};
  &:not(:first-child) {
    border-top: none;
  }
  padding: ${Dimens.medium1}px;
  &:hover {
    cursor: pointer;
    background: rgba(0, 0, 0, 0.1);
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

type PropTypes = {
  link: string,
  image: string,
  name: string,
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
        <div>
          <InlineText.Small color={Colors.lightGray1}>
            <i className="far fa-clock" /> {moment(props.receivedAt).format('YYYY/MM/DD hh:mm:ss')}
          </InlineText.Small>
        </div>
      </Cell>
    </Link>
  </Container>
);
