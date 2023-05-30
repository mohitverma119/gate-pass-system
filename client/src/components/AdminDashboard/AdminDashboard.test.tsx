import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AdminDashboard from './AdminDashboard';

describe('<AdminDashboard />', () => {
  test('it should mount', () => {
    render(<AdminDashboard />);
    
    const adminDashboard = screen.getByTestId('AdminDashboard');

    expect(adminDashboard).toBeInTheDocument();
  });
});