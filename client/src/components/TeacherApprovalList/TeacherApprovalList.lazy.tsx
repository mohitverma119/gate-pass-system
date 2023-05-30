import React, { lazy, Suspense } from 'react';

const LazyTeacherApprovalList = lazy(() => import('./TeacherApprovalList'));

const TeacherApprovalList = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyTeacherApprovalList {...props} />
  </Suspense>
);

export default TeacherApprovalList;
