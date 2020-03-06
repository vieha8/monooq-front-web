import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getDateRelativeLastLogin } from 'helpers/date';
import ImageAvatar from 'components/LV1/Images/ImageAvatar';
import InlineText from 'components/LV1/Texts/InlineText';
import Path from 'config/path';
import { FontSizes } from 'variables';
import { getPrefecture } from 'helpers/prefectures';
import { formatName } from 'helpers/string';
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

const contentHostName = (isNoProfile, message, name, prefCode, lastLoginAt) => {
  return (
    <Fragment>
      {`${formatName(name)}さん`}
      {!isNoProfile && !message && (
        <Fragment>
          <br />
          <InlineText.Base fontSize={FontSizes.small_12}>
            {`${getPrefecture(prefCode)}在住`}
          </InlineText.Base>
        </Fragment>
      )}
      <br />
      <InlineText.Small>
        {`最終ログイン日: ${getDateRelativeLastLogin(lastLoginAt)}`}
      </InlineText.Small>
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
}) => (
  <Fragment>
    {isTitle && <SectionTitle text="ホストについて" />}
    <Attribute
      infoHost={infoHost}
      message={message}
      headContent={headContent(id, imageUrl, name)}
      contentHostName={contentHostName(isNoProfile, message, name, prefCode, lastLoginAt)}
      contentProfile={<ProfileWrap>{profile}</ProfileWrap>}
      isNoProfile={isNoProfile}
    />
  </Fragment>
);
