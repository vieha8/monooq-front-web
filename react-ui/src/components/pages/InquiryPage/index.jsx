import React from 'react';
import BaseTemplate from 'components/templates/BaseTemplate';
import Inquiry from 'components/LV3/Inquiry';
import { useSelector } from 'react-redux';

const InquiryPage = () => {
  const isLogin = useSelector(state => state.auth.isLogin);
  return (
    <BaseTemplate>
      <Inquiry isLogin={isLogin} />
    </BaseTemplate>
  );
};

export default InquiryPage;
