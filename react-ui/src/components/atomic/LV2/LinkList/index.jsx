// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';

const Anchor = styled.a`
  text-decoration: none;
  :hover {
    text-decoration: underline;
  }
`;

const List = styled.div`
  line-height: ${Dimens.medium1}px;
`;

type PropTypes = {
  list: Array<{
    text: string,
    path: string,
  }>,
};

export default ({ list }: PropTypes) => (
  <Fragment>
    {list.map((item, i) => (
      <List key={i.toString()}>
        <Anchor href={item.path} target={item.blank || '_self'}>
          {item.text}
        </Anchor>
      </List>
    ))}
  </Fragment>
);
