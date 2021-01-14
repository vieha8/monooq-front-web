import React from 'react';
import { useSelector } from 'react-redux';
import BaseTemplate from 'components/templates/BaseTemplate';
import Inquiry from 'components/LV3/Inquiry';

const InquiryPage = () => {
  const isLogin = useSelector(state => state.auth.isLogin);
  return (
    <BaseTemplate>
      <Inquiry isLogin={isLogin} />
    </BaseTemplate>
  );
};

export default InquiryPage;
