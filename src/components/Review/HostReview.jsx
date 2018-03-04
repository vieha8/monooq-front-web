import React, { Fragment } from 'react';
import styled from 'styled-components';
import Button from 'components/Shared/Button';
import Footer from 'components/Shared/Footer';
import { Colors, FontSizes, Dimens } from 'variables';
import { media } from 'helpers/style/media-query';
import ReviewContainer from './ReviewContainer';
import HostReviewMenu from './HostReviewMenu';
import Evaluation from './Evaluation';
import FromGuestReviewRow from './FromGuestReviewRow';
import SpaceItem from './SpaceItem';

const Container = styled.div`
  width: 100%;
`;

const Content = styled.div`
  padding: 0 20%;
  margin-bottom: ${Dimens.huge}px;
`;

const MenuContainer = styled.div`
  width: 100%;
  text-align: right;
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

const EvaluationContainer = styled.div`
`;

const Evaluations = styled.div`
  display: table;
  margin-top: ${Dimens.medium}px;
  ${media.phone`
    width: 100%;
  `}
`;

const EvaluationWrapper = styled.div`
  display: table-cell;
  &:not(:first-child) {
    padding-left: ${Dimens.medium}px;
  }
  ${media.phone`
    display: block;
    &:not(:first-child) {
      padding-left: 0;
      margin-top: ${Dimens.medium}px;
    }
  `}
`;

const Header = styled.div`
  font-size: ${FontSizes.large}px;
  line-height: 51px;
  letter-spacing: -0.5px;
  color: ${Colors.black};
  margin-top: ${Dimens.large}px;
`;

const NotExistsText = styled.div`
  margin-top: ${Dimens.medium2}px;
  font-size: ${FontSizes.medium}px;
  color: ${Colors.black};
`;

const ButtonContainer = styled.div`
  border-top: 1px solid ${Colors.borderGray};
  padding: ${Dimens.medium2}px 30% 0;
  ${media.phone`
    padding: ${Dimens.medium2}px 20% 0;  
  `}
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
      <ReviewContainer>
        <MenuContainer>
          <HostReviewMenu
            anchorDom={props.menu.anchorDom}
            onClickMenu={props.menu.onClickMenu}
            onCloseMenu={props.menu.onCloseMenu}
          />
        </MenuContainer>
        <HostContainer>
          <ImageWrapper>
            <Image src="http://placehold.jp/500x500.png" alt={props.hostName} />
          </ImageWrapper>
          <HostName>{props.host.name} さん</HostName>
          <ResidenceText>{props.host.residence} 在住</ResidenceText>
          <Profile>{props.host.profile}</Profile>
        </HostContainer>
        <EvaluationContainer>
          <Header>レビュー</Header>
          <Evaluations>
            <EvaluationWrapper>
              <Evaluation
                evaluate={0}
                selected={props.evaluate === 0}
                count={props.goodCount}
              />
            </EvaluationWrapper>
            <EvaluationWrapper>
              <Evaluation
                evaluate={1}
                selected={props.evaluate === 1}
                count={props.sosoCount}
              />
            </EvaluationWrapper>
            <EvaluationWrapper>
              <Evaluation
                evaluate={2}
                selected={props.evaluate === 2}
                count={props.badCount}
              />
            </EvaluationWrapper>
          </Evaluations>
        </EvaluationContainer>
        {props.reviews.length > 0 ? (
          <Fragment>
            {props.reviews.map((review, i) => (
              <FromGuestReviewRow
                key={`from_guest_review_row_${i}`}
                userName={review.userName}
                postedAt={review.postedAt}
                reviewComment={review.comment}
              />
            ))}
            <ButtonContainer>
              <Button
                fluid
                bgColor={Colors.white}
                fontColor={Colors.darkGray1}
                borderColor={Colors.darkGray1}
                onClick={props.onClickCancel}
              >
                レビューをもっと見る
              </Button>
            </ButtonContainer>
          </Fragment>
        ) : (
          <NotExistsText>レビューはまだありません。</NotExistsText>
        )}
        <Header>{props.host.name} さんのスペース</Header>
        <SpaceListContainer>
          <SpaceItem />
          <SpaceItem />
          <SpaceItem />
          <SpaceItem />
          <SpaceItem />
        </SpaceListContainer>
      </ReviewContainer>
    </Content>
    <Footer />
  </Container>
);
