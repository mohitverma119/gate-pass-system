import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TeacherApprovalList from './TeacherApprovalList';

describe('<TeacherApprovalList />', () => {
  test('it should mount', () => {
    render(<TeacherApprovalList />);
    
    const teacherApprovalList = screen.getByTestId('TeacherApprovalList');

    expect(teacherApprovalList).toBeInTheDocument();
  });
});