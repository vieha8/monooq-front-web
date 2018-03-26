import React from 'react';
import styled from 'styled-components';
import { Select } from 'semantic-ui-react';
import Input from 'components/Shared/Input';
import { Dimens } from 'variables';
import ErrorText from 'components/Shared/ErrorText';
import { prefectures, selectOptionPrefectures } from 'helpers/prefectures';
import Title from '../shared/Title';

const Container = styled.div`
  margin-top: ${Dimens.medium}px;
`;

export default props => (
  <Container>
    <Title
      title="所在地はどこ？"
      subTitle="取引が成立するまで番地以降の住所は表示されません。"
    />
    <Select
      placeholder="選択してください"
      style={{ width: '50px', marginTop: '8px' }}
      options={selectOptionPrefectures()}
      value={props.ui.space.prefCode}
      onChange={(_, e) => props.handleChangePrefCode(prefectures[e.value - 1])}
    />
    <Input
      name="address"
      value={props.ui.space.address || ''}
      onChange={e => props.handleChangeText(e.target.value)}
      invalid={(props.error.errors.address || []).length}
      placeholder="例）杉並区高円寺南 2-48-12"
    />
    {props.error.errors.address && <ErrorText errors={props.error.errors.address} />}
  </Container>
);
