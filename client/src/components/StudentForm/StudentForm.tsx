import React, { FC } from 'react';
import { StudentFormWrapper } from './StudentForm.styled';

interface StudentFormProps {}

const StudentForm: FC<StudentFormProps> = () => (
 <StudentFormWrapper data-testid="StudentForm">
    StudentForm Component
 </StudentFormWrapper>
);

export default StudentForm;
