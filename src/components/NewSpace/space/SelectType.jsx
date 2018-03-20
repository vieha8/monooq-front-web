import React from 'react';
import styled from 'styled-components';
import { Select } from 'semantic-ui-react';
import { Colors, FontSizes, Dimens } from 'variables';
import ErrorText from 'components/Shared/ErrorText';
import Title from '../shared/Title';

const Container = styled.div`
  margin-top: ${Dimens.medium}px;
`;

const styles = {
  select: {
    width: '100%',
    marginTop: `${Dimens.medium}px`,
    color: Colors.darkGray1,
    fontSize: FontSizes.medium,
  },
};

export default props => (
  <Container>
    <Title
      title="スペースの種類は？"
    />
    <Select
      name="type"
      value={props.ui.space.type}
      onChange={(e, data) => props.handleChangeSpaceType(data.value)}
      style={styles.select}
      placeholder="選択してください"
      options={[
        {
          key: 1,
          value: 1,
          text: 'クローゼット',
        },
        {
          key: 2,
          value: 2,
          text: '押入れ',
        },
        {
          key: 3,
          value: 3,
          text: '部屋',
        },
        {
          key: 4,
          value: 4,
          text: '屋外倉庫',
        },
        {
          key: 5,
          value: 5,
          text: 'その他',
        },
      ]}
    />
    {props.error.errors.type && <ErrorText errors={props.error.errors.type} />}
  </Container>
);
