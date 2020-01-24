import React from 'react';
import Path from 'config/path';
import About from 'components/LV3/About';
import BaseTemplate from 'components/templates/BaseTemplate';

const AboutPage = React.memo(({ history }) => (
  <BaseTemplate>
    <About
      // TODO リンク先はcontainerで設定する必要ないのでcomponent側に移したい
      onClickHowToUse={() => history.push(Path.howtouse())}
      onClickInsurance={() => history.push(Path.insurance())}
      onClickRule={() => history.push(Path.rule())}
    />
  </BaseTemplate>
));

export default AboutPage;
