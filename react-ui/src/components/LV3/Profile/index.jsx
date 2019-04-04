// @flow

import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Colors, FontSizes, Dimens } from 'variables';
import { getPrefecture } from 'helpers/prefectures';
import Card from 'components/LV1/Card';
import InlineText from 'components/LV1/InlineText';
import AvatarImage from 'components/LV1/AvatarImage';
import SpaceList, { type PropTypes as SpaceListProps } from './SpaceList';

const Container = styled.div`
  width: 100%;
`;

const User = styled.div`
  text-align: center;
`;

const IMAGE_SIZE = 100;

const HostName = styled.div`
  margin-top: ${Dimens.medium}px;
  color: ${Colors.black};
`;

const ResidenceText = styled.div`
  margin-top: ${Dimens.small}px;
  color: ${Colors.black};
`;

const LastLoginText = styled.div`
  margin-top: ${Dimens.small}px;
  color: ${Colors.black};
`;

const Profile = styled.div`
  margin-top: ${Dimens.medium2}px;
  color: ${Colors.black};
  white-space: pre-wrap;
`;

const SpaceListContainer = styled.div`
  text-align: left;
`;

const CardStyle = `
  display: block;
  background: ${Colors.white};
  margin: ${Dimens.huge}px;
`;

const CardStylePhone = `
  width: 100%;
  margin: 0;
`;

type PropTypes = {
  image: string,
  name: string,
  prefCode: string,
  profile: string,
  lastLogin: Date,
  spaces: SpaceListProps,
};

export default (props: PropTypes) => (
  <Container>
    <Card customStyle={CardStyle} customStylePhone={CardStylePhone}>
      <User>
        <AvatarImage src={props.image} alt={props.name} size={IMAGE_SIZE} />
        <HostName>
          <InlineText.Base fontSize={FontSizes.medium2}>{`${props.name}さん`}</InlineText.Base>
        </HostName>
        <ResidenceText>
          <InlineText.Small>
            {getPrefecture(props.prefCode)}
            在住
          </InlineText.Small>
        </ResidenceText>
        <LastLoginText>
          <InlineText.Small>
            最終ログイン日:
            {props.lastLogin}
          </InlineText.Small>
        </LastLoginText>
        <Profile>
          <InlineText.Base>{props.profile}</InlineText.Base>
        </Profile>
      </User>
      {props.spaces.length > 0 && (
        <Fragment>
          <SpaceListContainer>
            <HostName>
              <InlineText.Base fontSize={FontSizes.large}>
                {props.name} さんのスペース
              </InlineText.Base>
            </HostName>
          </SpaceListContainer>
          <SpaceList spaces={props.spaces} />
        </Fragment>
      )}
    </Card>
  </Container>
);
