import React, { useState } from 'react';
import ReactGA from 'react-ga';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import Path from 'config/path';
import { Dimens } from 'variables';
import { iskeyDownEnter } from 'helpers/keydown';
import { media } from 'helpers/style/media-query';
import { spaceActions } from 'redux/modules/space';
import Button from 'components/LV1/Forms/Button';
import InputForm from 'components/LV2/Forms/InputForm';

const SearchWrapper = styled.div`
  width: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
  justify-content: center;
  align-items: center;
  margin: auto;
  ${media.phone`
    max-width: 327px;
  `};
`;

const Wrap = styled.div`
  width: 80%;
  max-width: 699px;
  ${props =>
    props.button &&
    `
    width: 20%;
    max-width: 109px;
    margin-left: ${Dimens.small_10}px;
  `};
  ${media.phone`
    width: 100%;
    ${props =>
      props.button &&
      `
      width: 100%;
      max-width: 78px;
    `};
  `};
`;

const TopSearchForm = () => {
  const [keyword, setKeyword] = useState('');
  const dispatch = useDispatch();
  const router = useRouter();

  const doSearch = () => {
    dispatch(spaceActions.resetSearch());
    const query = `?keyword=${keyword}`;
    const path = `${Path.search()}${query}`;

    ReactGA.event({
      category: 'Search',
      action: 'Submit Top Search Form',
      label: query,
    });

    router.push(path);
  };

  const onKeyDown = e => {
    if (iskeyDownEnter(e) && keyword !== '') {
      doSearch();
    }
  };

  return (
    <SearchWrapper>
      <Wrap>
        <InputForm
          placeholder="東京都世田谷区"
          onChange={e => setKeyword(e.target.value)}
          onKeyDown={onKeyDown}
          margintop="0"
        />
      </Wrap>
      <Wrap button>
        <Button
          primary
          fill={1}
          height={50}
          fontbold
          disabled={keyword === ''} // TODO validation
          onClick={() => doSearch()}
          onKeyDown={onKeyDown}
        >
          検索
        </Button>
      </Wrap>
    </SearchWrapper>
  );
};

export default TopSearchForm;
