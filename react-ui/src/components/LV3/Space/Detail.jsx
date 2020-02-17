import React from 'react';
import styled from 'styled-components';
import Path from 'config/path';
import { Colors, Dimens, FontSizes, ZIndexes } from 'variables';
import { media } from 'helpers/style/media-query';
import { isAvailableLocalStorage } from 'helpers/storage';
import SnsShare from 'components/LV2/SnsShare';
import Image from 'components/LV2/Space/Image';
import Question from 'components/LV2/Space/Question';
import RequestApplication from 'components/LV3/RequestApplication';
import RequestApplicationSP from 'components/LV3/RequestApplication/SP';
import Info from './Info';

const Wrap = styled.div`
  margin: auto;
  padding: 0;
  ${media.tablet`
    ${props =>
      props.confirm &&
      `
      padding: 0 0 140px;
    `};
  `};
`;

const SpaceDetailWrap = styled.div`
  display: flex;
  max-width: 1000px;
  margin: auto;
  padding: ${Dimens.medium2_36}px ${Dimens.medium}px 0;
  ${media.tablet`
    padding: ${Dimens.medium}px ${Dimens.medium}px 0;
  `};
`;

const LeftWrap = styled.div`
  width: 100%;
  max-width: 660px;
  padding-right: ${Dimens.medium4_50}px;
  ${media.tablet`
    padding-right: 0px;
  `};
`;

const RightWrap = styled.div`
  position: relative;
  width: 100%;
  max-width: 340px;
  padding-right: ${Dimens.small_10}px;
  font-size: ${FontSizes.small_12}px;
  text-align: center;
  ${media.tablet`
    display: none;
  `};
`;

const RightInner = styled.div`
  ${props =>
    props.isOverTopView &&
    `
    position: fixed;
    max-width: 330px;
    top: ${props.confirm ? `190` : `100`}px;
    z-index: ${ZIndexes.frontPartsOverFooter};
    background-color: ${Colors.white};
    border-radius: ${Dimens.xxsmall}px;
  `};
  ${props =>
    props.isBottom &&
    `
    position: absolute;
    top: unset;
    bottom: 0;
  `};
`;

const RequestCard = styled.div`
  background: ${Colors.white};
  box-shadow: 0px 0px ${Dimens.medium}px rgba(0, 0, 0, 0.05);
  border-radius: ${Dimens.xxsmall}px;
  padding: ${Dimens.medium2_32}px ${Dimens.medium_18}px;
  color: ${Colors.lightGray3};
  line-height: normal;
`;

const RequestTitle = styled.div`
  font-weight: bold;
  font-size: ${FontSizes.medium1}px;
  line-height: normal;
  color: ${Colors.black};
  margin-bottom: ${Dimens.medium_20}px;
`;

const RequestButtonWrap = styled.div`
  min-width: 300px;
  margin: ${Dimens.medium}px auto;
`;

const makeBreadCrumbs = ({
  addressPref,
  prefCode,
  addressCity,
  cityCode,
  addressTown,
  townCode,
}) => {
  const breadcrumbs = [];

  breadcrumbs.push({
    text: addressPref,
    link: Path.spacesByPrefecture(prefCode),
  });

  breadcrumbs.push({
    text: addressCity,
    link: Path.spacesByCity(prefCode, cityCode),
  });

  breadcrumbs.push({
    text: addressTown,
    link: Path.spacesByTown(prefCode, cityCode, townCode),
  });

  return breadcrumbs;
};

const getCaptionMessage = () => {
  return 'リクエストを送ることで、あなたがスペースに興味を持っていることがホストに伝わります。';
};

const getParams = () => {
  let params = null;
  if (isAvailableLocalStorage() && localStorage.getItem('request_params')) {
    params = JSON.parse(localStorage.getItem('request_params'));
  }
  return params;
};

export default ({
  loading,
  confirm,
  space,
  images,
  tagList,
  loginUser,
  user,
  recommend,
  isOverTopView,
  isBottom,
  isModalOpen,
  handleModalOpen,
  handleModalClose,
  isModalOpenSP,
  handleModalOpenSP,
  handleModalCloseSP,
}) => (
  <Wrap confirm={confirm}>
    <Image images={images} />
    <SpaceDetailWrap>
      <LeftWrap>
        <Info
          confirm={confirm}
          space={space}
          id={space.id}
          name={space.title}
          sizeType={space.sizeType}
          tagList={tagList}
          user={user}
          recommend={recommend}
          breadcrumbsList={makeBreadCrumbs(space)}
        />
      </LeftWrap>
      <RightWrap>
        <RightInner
          isOverTopView={isOverTopView && !isModalOpen}
          isBottom={isBottom && !isModalOpen}
          confirm={confirm}
        >
          <RequestCard>
            気になるスペースを見つけたら？
            <RequestTitle>ホストに相談しよう</RequestTitle>
            {isModalOpen ? getCaptionMessage() : <Question />}
            <RequestButtonWrap>
              <RequestApplication
                space={space}
                loginUser={loginUser}
                isLogin={!!user.id}
                confirm={confirm}
                params={getParams()}
                isModalOpen={isModalOpen}
                handleModalOpen={handleModalOpen}
                handleModalClose={handleModalClose}
                loading={loading}
              />
            </RequestButtonWrap>
            {!isModalOpen && getCaptionMessage()}
          </RequestCard>
          {!confirm && <SnsShare id={space.id} name={space.title} />}
        </RightInner>
      </RightWrap>
      {!confirm && (
        <RequestApplicationSP
          space={space}
          loginUser={loginUser}
          isLogin={!!user.id}
          confirm={confirm}
          params={getParams()}
          isModalOpenSP={isModalOpenSP}
          handleModalOpenSP={handleModalOpenSP}
          handleModalCloseSP={handleModalCloseSP}
          loading={loading}
        />
      )}
    </SpaceDetailWrap>
  </Wrap>
);
