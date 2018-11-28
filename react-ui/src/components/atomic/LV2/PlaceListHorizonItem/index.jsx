// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import AvatarImage from 'components/atomic/LV1/AvatarImage';
import { Colors, Dimens, FontSizes } from 'variables';
import InlineText from 'components/atomic/LV1/InlineText';
import HeroImage from 'components/atomic/LV1/HeroImage';
import Path from 'config/path';
import ClearfixContainer from 'components/atomic/LV1/ClearfixContainer';

const Row = styled(Link)`
  display: table;
  cursor: pointer;
`;

const ImageWrapper = styled.div`
  display: table-cell;
  vertical-align: top;
  width: 100px;
`;

const ContentWrapper = styled.div`
  display: table-cell;
  vertical-align: middle;
  padding-left: 16px;
`;

const AddressText = styled(InlineText.Small)`
  display: block;
  color: ${Colors.brandPrimary};
`;

const HostContent = styled.div`
  float: left;
  margin: ${Dimens.small2}px auto;
`;

const HostNameWrap = styled.div`
  margin-left: ${Dimens.small2}px;
`;

type PropTypes = {
  image: {
    src: string,
    alt: string,
  },
  address: string,
  href?: string,
  onClick?: Function,
};

export default (props: PropTypes) => (
  <Fragment>
    <ClearfixContainer>
      <HostContent>
        <Link to={Path.profile(props.user.ID)}>
          <AvatarImage size={45} src={props.user.ImageUrl} alt={props.user.Name} />
        </Link>
      </HostContent>
      <HostContent>
        <HostNameWrap>
          <InlineText.Base fontSize={`${FontSizes.small_12}`} bold>
            {props.isHost ? 'ホスト' : 'ゲスト'}
          </InlineText.Base>
          <br />
          {props.user.Name} さん
        </HostNameWrap>
      </HostContent>
    </ClearfixContainer>
    <ClearfixContainer>
      <Row to={props.href || ''} onClick={props.onClick}>
        <ImageWrapper>
          <HeroImage small {...props.image} />
        </ImageWrapper>
        <ContentWrapper>
          <AddressText>{props.address}</AddressText>
        </ContentWrapper>
      </Row>
    </ClearfixContainer>
  </Fragment>
);
