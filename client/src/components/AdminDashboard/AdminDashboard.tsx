import React, { FC } from 'react';
import { AdminDashboardWrapper } from './AdminDashboard.styled';

interface AdminDashboardProps {}

const AdminDashboard: FC<AdminDashboardProps> = () => (
 <AdminDashboardWrapper data-testid="AdminDashboard">
    AdminDashboard Component
 </AdminDashboardWrapper>
);

export default AdminDashboard;
