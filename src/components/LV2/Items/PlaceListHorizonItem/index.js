import React, { Fragment } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import PageClearfix from 'components/LV1/PageClearfix';
import ImageAvatar from 'components/LV1/Images/ImageAvatar';
import ImageHero from 'components/LV1/Images/ImageHero';
import InlineText from 'components/LV1/Texts/InlineText';
import { Colors, Dimens, FontSizes } from 'variables';
import Path from 'config/path';
import { formatName } from 'helpers/string';

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

export default ({ user, isHost, href, onClick, image, address }) => (
  <Fragment>
    <PageClearfix>
      <HostContent>
        <Link href={Path.profile(user.id)}>
          <a>
            <ImageAvatar size={45} src={user.imageUrl} alt={user.name} />
          </a>
        </Link>
      </HostContent>
      <HostContent>
        <HostNameWrap>
          <InlineText.Base fontSize={`${FontSizes.small_12}`} bold>
            {!isHost ? 'ホスト' : 'ゲスト'}
          </InlineText.Base>
          <br />
          <InlineText.Base fontSize={`${FontSizes.small_15}`}>
            {`${formatName(user.name)}さん`}
          </InlineText.Base>
        </HostNameWrap>
      </HostContent>
    </PageClearfix>
    <PageClearfix>
      <Row href={href || ''} onClick={onClick}>
        <a>
          <ImageWrapper>
            <ImageHero small src={image.src} alt={image.alt} />
          </ImageWrapper>
          <ContentWrapper>
            <AddressText>{address}</AddressText>
          </ContentWrapper>
        </a>
      </Row>
    </PageClearfix>
  </Fragment>
);
