import React from 'react';
import styled from 'styled-components';
import { Colors, FontSizes, Dimens } from 'variables';
import { Select } from 'semantic-ui-react';
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

export default (props) => (
  <Container>
    <Title
      title="受け取り方法"
    />
    <Select
      name="receiptType"
      value={props.ui.space.receiptType}
      onChange={props.handleChangeSelect}
      style={styles.select}
      placeholder="選択してください"
      options={[
        {
          key: 1,
          value: 1,
          text: '対面・配送の両方に対応する',
        },
        {
          key: 2,
          value: 2,
          text: '対面',
        },
        {
          key: 3,
          value: 3,
          text: '配送',
        },
      ]}
    />
  </Container>
);
