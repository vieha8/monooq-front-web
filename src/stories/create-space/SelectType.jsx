import React from 'react';
import styled from 'styled-components';
import { Select } from 'semantic-ui-react';
import { Title } from './index';
import { Colors, FontSizes, Dimens } from '../../variables';

const Container = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const styles = {
  select: {
    width: '100%',
    maxWidth: '600px',
    marginTop: `${Dimens.medium}px`,
    color: Colors.black,
    fontSize: FontSizes.medium,
  },
};

export default () => (
  <Container>
    <Title
      title="スペースの種類は？"
    />
    <Select
      style={styles.select}
      placeholder="選択してください"
      options={[
        {
          key: 1,
          value: 'type1',
          text: 'クローゼット',
        },
        {
          key: 2,
          value: 'type2',
          text: 'トランクルーム',
        },
      ]}
    />
  </Container>
);
