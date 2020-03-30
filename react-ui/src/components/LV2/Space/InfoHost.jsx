import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getDateRelativeLastLogin } from 'helpers/date';
import ImageAvatar from 'components/LV1/Images/ImageAvatar';
import InlineText from 'components/LV1/Texts/InlineText';
import Path from 'config/path';
import { Dimens, FontSizes, Colors } from 'variables';
import { getPrefecture } from 'helpers/prefectures';
import { formatName } from 'helpers/string';
import StatusText from 'components/LV1/Texts/StatusText';
import Attribute from 'components/LV2/Space/Attribute';
import { SectionTitle } from './Section';

const ProfileWrap = styled.div`
  font-size: ${FontSizes.small}px;
  line-height: 1.5;
`;

const headContent = (id, imageUrl, name) => {
  return (
    <Link to={Path.profile(id)}>
      <ImageAvatar size={45} src={imageUrl} alt={name} />
    </Link>
  );
};

const LastLoginWrap = styled.div`
  margin-top: ${Dimens.xxsmall}px;
`;

const ReplyRateWrap = styled.div`
  margin-top: ${Dimens.xxsmall}px;
  color: ${Colors.lightGray3};
  font-size: ${FontSizes.small_12}px;
`;
const ReplyRate = styled.span`
  color: ${Colors.black2};
  font-size: ${FontSizes.small_13}px;
`;

const contentHostName = (name, lastLoginAt, replyRate) => {
  return (
    <Fragment>
      {`${formatName(name)}さん`}
      <LastLoginWrap>
        <InlineText.Small>
          <StatusText setData={getDateRelativeLastLogin(lastLoginAt)} />
        </InlineText.Small>
      </LastLoginWrap>
      {replyRate && replyRate != 0 && (
        <ReplyRateWrap>
          {'返信率: '}
          <ReplyRate>{`${(replyRate * 100).toFixed()}%`}</ReplyRate>
        </ReplyRateWrap>
      )}
    </Fragment>
  );
};

export default ({
  infoHost,
  isTitle,
  message,
  id,
  imageUrl,
  name,
  prefCode,
  profile,
  isNoProfile,
  lastLoginAt,
  replyRate,
}) => (
  <Fragment>
    {isTitle && <SectionTitle text="ホストについて" />}
    <Attribute
      infoHost={infoHost}
      message={message}
      headContent={headContent(id, imageUrl, name)}
      contentHostName={contentHostName(name, lastLoginAt, replyRate)}
      contentProfile={<ProfileWrap>{profile}</ProfileWrap>}
      isNoProfile={isNoProfile}
    />
  </Fragment>
);
