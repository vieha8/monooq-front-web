import React from 'react';
import Router from 'next/router';
import { Button } from 'semantic-ui-react';

const Header = () => (
  <Button.Group>
    <Button onClick={() => Router.push('/')}>Home</Button>
    <Button onClick={() => Router.push('/about')}>About</Button>
  </Button.Group>
);

export default Header;
