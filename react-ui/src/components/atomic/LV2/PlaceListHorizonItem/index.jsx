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
        {/* TODO:リンクとアバター画像実装 */}
        {/* <Link to={Path.profile(props.id)}> */}
        <Link to={Path.top()}>
          <AvatarImage
            size={45}
            src="https://firebasestorage.googleapis.com/v0/b/monooq-prod.appspot.com/o/img%2Fusers%2Fdefault.png?alt=media&token=e36437c2-778c-44cf-a701-2d4c8c3e0363"
            alt={props.opponentName}
          />
        </Link>
      </HostContent>
      <HostContent>
        <HostNameWrap>
          <InlineText.Base fontSize={`${FontSizes.small_12}`} bold>
            ホスト
          </InlineText.Base>
          <br />
          {props.opponentName} さん
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
