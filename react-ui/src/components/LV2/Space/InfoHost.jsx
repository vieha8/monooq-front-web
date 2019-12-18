import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import ImageAvatar from 'components/LV1/Images/ImageAvatar';
import InlineText from 'components/LV1/Texts/InlineText';
import Path from 'config/path';
import { FontSizes } from 'variables';
import { getPrefecture } from 'helpers/prefectures';
import { formatName } from 'helpers/string';
import Attribute from 'components/LV2/Space/Attribute';

const Content = styled.div``;

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

const contentHostName = (message, name, prefCode) => {
  return (
    <Content>
      {`${formatName(name)}さん`}
      {!message && (
        <Fragment>
          <br />
          <InlineText.Base fontSize={FontSizes.small_12}>
            {`${getPrefecture(prefCode)}在住`}
          </InlineText.Base>
        </Fragment>
      )}
    </Content>
  );
};

export default ({ infoHost, message, id, imageUrl, name, prefCode, profile, isNoProfile }) => (
  <Attribute
    infoHost={infoHost}
    message={message}
    headContent={headContent(id, imageUrl, name)}
    contentHostName={
      isNoProfile ? `${formatName(name)}さん` : contentHostName(message, name, prefCode)
    }
    contentProfile={<ProfileWrap>{profile}</ProfileWrap>}
    isNoProfile={isNoProfile}
  />
);
