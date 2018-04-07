// @flow

import React from 'react';
import styled from 'styled-components';
import { Dimens } from 'variables';

const Container = styled.div`
  padding: 0 ${Dimens.medium}px;
`;

const SectionHeader = styled.div`
  margin: ${Dimens.medium}px 0;
`;

const ImageWrapper = styled.div`
  margin: ${Dimens.medium3}px 0;
`;

import Card from 'components/atomic/atoms/Card';
import { H2 } from 'components/atomic/atoms/Headline';
import Header from 'components/atomic/molecules/Space/Header';
import Image from 'components/atomic/molecules/Space/Image';
import Address from 'components/atomic/molecules/Space/Address';
import Type from 'components/atomic/molecules/Space/Type';
import AboutBaggage from 'components/atomic/molecules/Space/AboutBaggage';
import Receive from 'components/atomic/molecules/Space/Receive';
import Supplement from 'components/atomic/molecules/Space/Supplement';
import HostInfo from 'components/atomic/molecules/Space/HostInfo';

type PropTypes = {
  pref: string,
  city: string,
  town: string,
  name: string,
  images: Array<{
    original: string,
    thumbnail: string,
  }>,
  description: string,
  address: string,
  type: string,
  aboutBaggage: string,
  delivery: boolean,
  meeting: boolean,
  supplement: string,
  user: {
    id: string,
    name: string,
    imageUrl: string,
    profile: string,
  },
};

export default (props: PropTypes) => (
  <Card>
    <Container>
      <Header
        pref={props.pref}
        city={props.city}
        town={props.town}
        name={props.name}
      />
      <ImageWrapper>
        <Image
          images={props.images}
          description={props.description}
        />
      </ImageWrapper>
      <SectionHeader>
        <H2>スペースについて</H2>
      </SectionHeader>
      <div>
        <Address
          content={props.address}
        />
        <Type
          content={props.type}
        />
      </div>
      <SectionHeader>
        <H2>荷物について</H2>
      </SectionHeader>
      <div>
        <AboutBaggage
          content={props.aboutBaggage}
        />
        <Receive
          delivery={props.delivery}
          meeting={props.meeting}
        />
        <Supplement
          content={props.supplement}
        />
      </div>
      <HostInfo
        {...props.user}
      />
    </Container>
  </Card>
);
