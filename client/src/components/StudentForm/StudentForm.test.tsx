import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import StudentForm from './StudentForm';

describe('<StudentForm />', () => {
  test('it should mount', () => {
    render(<StudentForm />);
    
    const studentForm = screen.getByTestId('StudentForm');

    expect(studentForm).toBeInTheDocument();
  });
});