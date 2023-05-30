import React, { FC } from 'react';
import { SecurityGuardScanWrapper } from './SecurityGuardScan.styled';

interface SecurityGuardScanProps {}

const SecurityGuardScan: FC<SecurityGuardScanProps> = () => (
 <SecurityGuardScanWrapper data-testid="SecurityGuardScan">
    SecurityGuardScan Component
 </SecurityGuardScanWrapper>
);

export default SecurityGuardScan;
