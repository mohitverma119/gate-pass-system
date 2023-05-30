import React, { FC } from 'react';
import { TeacherApprovalListWrapper } from './TeacherApprovalList.styled';

interface TeacherApprovalListProps {}

const TeacherApprovalList: FC<TeacherApprovalListProps> = () => (
 <TeacherApprovalListWrapper data-testid="TeacherApprovalList">
    TeacherApprovalList Component
 </TeacherApprovalListWrapper>
);

export default TeacherApprovalList;
