import React from 'react';

export default class BrowserCheck extends React.Component {
  constructor(props) {
    super(props);
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIncompatible = userAgent.indexOf('msie') !== -1 || userAgent.indexOf('trident') !== -1;

    this.state = {
      isIncompatible,
    };
  }

  incompatibleMessage = () => (
    <p>
      モノオクはInternet Explorerではご利用いただけません。
      <br />
      Google Chrome、Safari、Firefox、Microsoft Edge等のブラウザの最新版をご利用ください。
    </p>
  );

  render() {
    return this.state.isIncompatible ? this.incompatibleMessage() : this.props.children;
  }
}
