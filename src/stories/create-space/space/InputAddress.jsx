import React from 'react';
import styled from 'styled-components';
import { Input } from 'semantic-ui-react';
import Title from '../shared/Title';
import { Colors, FontSizes, Dimens } from '../../../variables';

const Container = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const styles = {
  input: {
    width: '100%',
    marginTop: `${Dimens.medium}px`,
    color: Colors.black,
    fontSize: FontSizes.medium,
  },
};

export default () => (
  <Container>
    <Title
      title="所在地はどこ？"
      subTitle="取引が成立するまで番地以降の住所は表示されません。"
    />
    <Input
      style={styles.input}
      placeholder="例）東京都港区六本木6丁目1−25"
    />
  </Container>
);
