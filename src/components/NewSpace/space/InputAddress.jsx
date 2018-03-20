import React from 'react';
import styled from 'styled-components';
import Input from 'components/Shared/Input';
import { Colors, FontSizes, Dimens } from 'variables';
import ErrorText from 'components/Shared/ErrorText';
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
    <Input
      name="address"
      value={props.ui.space.address || ''}
      onChange={e => props.handleChangeAddress(e.target.value)}
      hasError={Array.isArray(props.error.errors.address) && props.error.errors.address.length > 0}
      placeholder="例）東京都港区六本木6丁目1−25"
    />
    {props.error.errors.address && <ErrorText errors={props.error.errors.address} />}
  </Container>
);
