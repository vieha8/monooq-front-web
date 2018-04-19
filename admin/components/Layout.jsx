import styled from 'styled-components';
import React from 'react';
import Header from './Header';
import Head from 'next/head';

const Container = styled.div`
  margin: 20,
  padding: 20,
`;

const Layout = props => (
  <Container>
    <Head>
      <meta name="robots" content="noindex" />
      <title>MonooQ Admin</title>
      <link
        rel="stylesheet"
        href="//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.12/semantic.min.css"
      />
    </Head>
    {props.children}
  </Container>
);

export default Layout;
