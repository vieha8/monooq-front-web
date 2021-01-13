import React from 'react';
import { makeBreadCrumbs } from 'helpers/breadCrumbs';
import Info from './Info';
import LeftWrap from './LeftWrap';
import Share from './Share';

export default ({ space, images, tagList, user, isOverTablet }) => (
  <Share images={images} confirm>
    <LeftWrap confirm>
      <Info
        space={space}
        name={space.title}
        sizeType={space.sizeType}
        tagList={tagList}
        user={user}
        breadcrumbsList={makeBreadCrumbs(space)}
        userMeta={space.userMeta}
        isOverTablet={isOverTablet}
      />
    </LeftWrap>
  </Share>
);
