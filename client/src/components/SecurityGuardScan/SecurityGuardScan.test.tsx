import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SecurityGuardScan from './SecurityGuardScan';

describe('<SecurityGuardScan />', () => {
  test('it should mount', () => {
    render(<SecurityGuardScan />);
    
    const securityGuardScan = screen.getByTestId('SecurityGuardScan');

    expect(securityGuardScan).toBeInTheDocument();
  });
});