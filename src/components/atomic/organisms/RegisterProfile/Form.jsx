// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Dimens, Colors } from 'variables';

const Title = styled.div`
  text-align: center;
`;

const Image = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const Name = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const Area = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const Profile = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const Button = styled.div`
  margin-top: ${Dimens.medium2}px;
`;

type PropTypes = {
  image: React.Element<*>,
  name: React.Element<*>,
  area: React.Element<*>,
  profile: React.Element<*>,
}

export default (props: PropTypes) => (
  <Fragment>
    <Title>{props.title}</Title>
    <Image>{props.image}</Image>
    <Name>{props.name}</Name>
    <Area>{props.area}</Area>
    <Profile>{props.profile}</Profile>
  </Fragment>
);
