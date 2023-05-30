import React, { lazy, Suspense } from 'react';

const LazySecurityGuardScan = lazy(() => import('./SecurityGuardScan'));

const SecurityGuardScan = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazySecurityGuardScan {...props} />
  </Suspense>
);

export default SecurityGuardScan;
