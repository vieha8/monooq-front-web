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

const Wrap = styled.div`
  width: 100%;
  padding: ${Dimens.medium_20}px ${Dimens.medium}px;
  background-color: ${Colors.white};
  &::after {
    clear: both;
    content: '';
    display: block;
  }
`;

const HostImageWrap = styled.div`
  display: inline-block;
`;

const HostNameWrap = styled.div`
  display: inline-block;
  vertical-align: middle;
  max-width: calc(100% - 66px);
  margin-top: 2px;
  margin-left: ${Dimens.small2}px;
  font-size: ${FontSizes.medium}px;
  line-height: 120%;
  ${media.phone`
    margin-top: 2px;
    font-size: ${FontSizes.small2_14}px;
  `};
`;

const LinkStyled = styled(Link)`
  line-height: ${Dimens.medium_20}px;
`;

export default ({ isHost, id, imageUrl, name, close }) => (
  <Wrap>
    <HostImageWrap>
      <Link to={Path.profile(id)} onClick={close}>
        <ImageAvatar size={54} src={imageUrl} alt={name} />
      </Link>
    </HostImageWrap>
    <HostNameWrap>
      {isHost && (
        <Fragment>
          <Tag tagList={['ホスト']} isNoMark />
          <br />
        </Fragment>
      )}
      <InlineText.Base bold>{`${formatName(name)}さん`}</InlineText.Base>
      <br />
      <LinkStyled to={Path.profileEdit()} onClick={close}>
        <InlineText.Base color={Colors.lightGray3} fontSize={12}>
          プロフィール編集
        </InlineText.Base>
      </LinkStyled>
    </HostNameWrap>
  </Wrap>
);
