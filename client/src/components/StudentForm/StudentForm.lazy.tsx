import React, { lazy, Suspense } from 'react';

const LazyStudentForm = lazy(() => import('./StudentForm'));

const StudentForm = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyStudentForm {...props} />
  </Suspense>
);

export default StudentForm;
