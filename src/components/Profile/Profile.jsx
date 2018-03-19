import React from 'react';
import styled from 'styled-components';
import Footer from 'components/Shared/Footer';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import ProfileContainer from './ProfileContainer';
import SpaceItem from './SpaceItem';
import { getPrefecture } from "../../helpers/prefectures";

const Container = styled.div`
  width: 100%;
`;

const Content = styled.div`
  padding: 0 20%;
  margin-bottom: ${Dimens.huge}px;
  ${media.phone`
    padding: 0;
  `}
`;

const HostContainer = styled.div`
  margin-top: -${Dimens.medium2}px;
`;

const ImageWrapper = styled.div`
  text-align: center;
`;
const IMAGE_SIZE = 100;
const Image = styled.img`
  width: ${IMAGE_SIZE}px;
  height: ${IMAGE_SIZE}px;
  border-radius: ${IMAGE_SIZE / 2}px;
`;

const HostName = styled.div`
  margin-top: ${Dimens.medium}px;
  color: ${Colors.black};
  font-size: ${FontSizes.medium2}px;
  text-align: center;
`;

const ResidenceText = styled.div`
  margin-top: ${Dimens.small}px;
  color: ${Colors.black};
  font-size: ${FontSizes.small}px;
  text-align: center;
`;

const Profile = styled.div`
  margin-top: ${Dimens.medium2}px;
  color: ${Colors.black};
  font-size: ${FontSizes.medium}px;
  line-height: 2;
`;

const Header = styled.div`
  font-size: ${FontSizes.large}px;
  line-height: 51px;
  letter-spacing: -0.5px;
  color: ${Colors.black};
  margin-top: ${Dimens.large}px;
`;

const SpaceListContainer = styled.ul`
  overflow-x: auto;
  padding: ${Dimens.medium3}px 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default props => (
  <Container>
    <Content>
      <ProfileContainer>
        <HostContainer>
          <ImageWrapper>
            <Image src={props.user.ImageUrl} alt={props.user.Name} />
          </ImageWrapper>
          <HostName>{props.user.Name} さん</HostName>
          <ResidenceText>{getPrefecture(props.user.PrefCode)}在住</ResidenceText>
          <Profile>{props.user.Profile}</Profile>
        </HostContainer>
        {(props.spaces.length > 0)?<Header>{props.user.Name} さんのスペース</Header>:null}
        <SpaceListContainer>
          {props.spaces.map((space, i) => {
            return (
              <SpaceItem key={i} place="麻布" name="東京タワーもバッチリ見えます" typeOK price="1000/5000/20000" />
            );
          })}
        </SpaceListContainer>
      </ProfileContainer>
    </Content>
    <Footer />
  </Container>
);
