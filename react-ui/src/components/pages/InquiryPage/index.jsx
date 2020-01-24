import React from 'react';
import ContentPageMenu from 'components/hocs/ContentPageMenu';
import Inquiry from 'components/LV3/Inquiry';
import { useSelector } from 'react-redux';

const InquiryPage = () => {
  const isLogin = useSelector(state => state.auth.isLogin);
  return <Inquiry isLogin={isLogin} />;
};

export default ContentPageMenu(InquiryPage, { headline: 'お問い合わせ' });
