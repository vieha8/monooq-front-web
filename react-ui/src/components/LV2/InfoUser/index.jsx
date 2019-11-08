import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Path from 'config/path';
import ImageAvatar from 'components/LV1/Images/ImageAvatar';
import InlineText from 'components/LV1/Texts/InlineText';
import Tag from 'components/LV1/Texts/Tag';
import { Colors, Dimens, FontSizes } from 'variables';
import { media } from 'helpers/style/media-query';
import { formatName } from 'helpers/string';

const Container = styled.div`
  width: 100%;
  padding: ${Dimens.medium_20}px ${Dimens.medium}px;
  background-color: ${Colors.white};
  &::after {
    clear: both;
    content: '';
    display: block;
  }
`;

const HostImageContainer = styled.div`
  display: inline-block;
`;

const HostNameContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  max-width: calc(100% - 66px);
  margin-top: 2px;
  margin-left: ${Dimens.small2}px;
  font-size: ${FontSizes.medium}px;
  line-height: 120%;
  ${media.phone`
    max-width: 175px;
    margin-top: 2px;
    font-size: ${FontSizes.small_12}px;
  `};
`;

const LinkStyled = styled(Link)`
  line-height: ${Dimens.medium_20}px;
`;

export default ({ isHost, id, imageUrl, name }) => (
  <Container>
    <HostImageContainer>
      <Link to={Path.profile(id)}>
        <ImageAvatar size={54} src={imageUrl} alt={name} />
      </Link>
    </HostImageContainer>
    <HostNameContainer>
      {isHost && (
        <Fragment>
          <Tag tagList={['ホスト']} isNoMark />
          <br />
        </Fragment>
      )}
      <InlineText.Base bold>{`${formatName(name)}さん`}</InlineText.Base>
      <br />
      <LinkStyled to={Path.profileEdit()}>
        <InlineText.Base color={Colors.lightGray3} fontSize={12}>
          プロフィール編集
        </InlineText.Base>
      </LinkStyled>
    </HostNameContainer>
  </Container>
);
