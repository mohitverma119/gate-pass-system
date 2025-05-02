# Gate Pass System - Project Structure

## Overview

The Gate Pass System is a comprehensive digital solution for educational institutions to manage student exits from campus hostels. This document outlines the current structure of the project and the planned migration from React/Express/MySQL to Next.js/MongoDB.

## Current Architecture

### Frontend (React.js)
- **Technology Stack**: React.js, Material UI, Tailwind CSS
- **Authentication**: JWT stored in localStorage
- **API Communication**: Axios
- **Routing**: React Router

### Backend (Express.js)
- **Technology Stack**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT, bcrypt for password hashing
- **API**: RESTful endpoints

### Database Schema (MySQL)
- **Users**: Student, Warden, Security Guard, Admin profiles
- **Hostels**: Hostel information and warden assignments
- **Departments**: Academic departments
- **Courses**: Academic courses linked to departments
- **Gatepasses**: Gate pass requests with statuses and details

## Planned Migration

### New Technology Stack
- **Frontend & Backend**: Next.js (App Router)
- **Database**: MongoDB
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS with shadcn/ui components
- **State Management**: React Context API or Zustand
- **Form Handling**: React Hook Form with Zod validation

### Database Schema (MongoDB)

#### Users Collection
```javascript
{
  _id: ObjectId,
  fullname: String,
  entryEmpNo: String,
  email: String,
  password: String, // Hashed
  role: String, // "student", "warden", "security_guard", "admin"
  hostelId: ObjectId, // Reference to Hostels collection (for students)
  courseId: ObjectId, // Reference to Courses collection (for students)
  deptId: ObjectId, // Reference to Departments collection
  createdAt: Date,
  updatedAt: Date
}
```

#### Hostels Collection
```javascript
{
  _id: ObjectId,
  hostelName: String,
  teacherId: ObjectId, // Reference to Users collection (warden)
  createdAt: Date,
  updatedAt: Date
}
```

#### Departments Collection
```javascript
{
  _id: ObjectId,
  deptName: String,
  deptShortName: String,
  createdAt: Date,
  updatedAt: Date
}
```

#### Courses Collection
```javascript
{
  _id: ObjectId,
  courseName: String,
  departmentId: ObjectId, // Reference to Departments collection
  createdAt: Date,
  updatedAt: Date
}
```

#### Gatepasses Collection
```javascript
{
  _id: ObjectId,
  studentId: ObjectId, // Reference to Users collection
  hostelId: ObjectId, // Reference to Hostels collection
  teacherId: ObjectId, // Reference to Users collection (warden)
  qrCode: String,
  passStatus: String, // "active", "inactive", "completed"
  deptPassStatus: String, // "pending", "approved", "rejected"
  wardenPassStatus: String, // "pending", "approved", "rejected"
  rejectedBy: String, // "hod", "warden"
  rejectReason: String,
  roomNo: String,
  blockNo: String,
  leavingPurpose: String,
  address: String,
  contactNo: String,
  leavingDatetime: Date,
  returningDate: Date,
  securityClearance: String, // "verified", "not-verified"
  securityClearanceDateTime: Date,
  createdAt: Date,
  updatedAt: Date
}
```

## Project Structure (Next.js)

```
gate-pass-system/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   ├── gatepasses/
│   │   ├── hostels/
│   │   ├── users/
│   │   └── ...
│   ├── (auth)/
│   │   ├── login/
│   │   └── register/
│   ├── dashboard/
│   │   ├── admin/
│   │   ├── student/
│   │   ├── warden/
│   │   └── security/
│   ├── layout.js
│   └── page.js
├── components/
│   ├── ui/
│   ├── forms/
│   ├── dashboard/
│   ├── gatepass/
│   └── shared/
├── lib/
│   ├── db.js
│   ├── auth.js
│   ├── utils.js
│   └── validations.js
├── models/
│   ├── User.js
│   ├── Gatepass.js
│   ├── Hostel.js
│   └── ...
├── public/
│   ├── images/
│   └── ...
├── styles/
│   └── globals.css
├── middleware.js
├── next.config.js
├── package.json
└── tailwind.config.js
```

## Features

### Current Features
- Multi-role user authentication (Student, Warden, Security Guard, Admin)
- Gate pass application submission by students
- Gate pass approval/rejection by wardens
- QR code generation for approved passes
- Gate pass verification by security guards
- Dashboard views for different user roles

### Pending Features for Next.js Implementation

#### Authentication & User Management
- [ ] Implement NextAuth.js with JWT and session management
- [ ] Role-based middleware for protected routes
- [ ] User profile management
- [ ] Password reset functionality
- [ ] Email verification

#### Student Features
- [ ] Improved gate pass application form with better validation
- [ ] Real-time status tracking of gate pass applications
- [ ] Notifications for status changes
- [ ] History of past gate passes with filtering options
- [ ] Digital ID card integration

#### Warden Features
- [ ] Dashboard with statistics and pending approvals
- [ ] Batch approval/rejection functionality
- [ ] Student search and filtering
- [ ] Hostel occupancy management
- [ ] Communication system with students

#### Security Guard Features
- [ ] Enhanced QR code scanner with validation
- [ ] Entry/exit logging system
- [ ] Search functionality for student records
- [ ] Emergency notifications
- [ ] Visitor management

#### Admin Features
- [ ] Comprehensive dashboard with system statistics
- [ ] User management (create, update, delete)
- [ ] Hostel and department management
- [ ] System logs and audit trails
- [ ] Backup and restore functionality

#### General Improvements
- [ ] Responsive design for all device sizes
- [ ] Dark/light mode toggle
- [ ] Offline capabilities with service workers
- [ ] Performance optimizations
- [ ] Accessibility improvements
- [ ] Multi-language support

## API Endpoints (Next.js API Routes)

### Authentication
- `/api/auth/[...nextauth]` - NextAuth.js authentication
- `/api/auth/register` - User registration

### Users
- `/api/users` - Get all users (admin only)
- `/api/users/:id` - Get, update, delete user

### Gatepasses
- `/api/gatepasses` - Create, get all gatepasses
- `/api/gatepasses/:id` - Get, update, delete gatepass
- `/api/gatepasses/student/:studentId` - Get gatepasses by student
- `/api/gatepasses/warden/:wardenId` - Get gatepasses by warden
- `/api/gatepasses/verify/:qrCode` - Verify gatepass by QR code

### Hostels
- `/api/hostels` - Create, get all hostels
- `/api/hostels/:id` - Get, update, delete hostel

### Departments & Courses
- `/api/departments` - Create, get all departments
- `/api/departments/:id` - Get, update, delete department
- `/api/courses` - Create, get all courses
- `/api/courses/:id` - Get, update, delete course

## Development Roadmap

### Phase 1: Setup & Authentication
- [ ] Project setup with Next.js
- [ ] MongoDB connection and schema design
- [ ] Authentication system implementation
- [ ] Basic UI components

### Phase 2: Core Functionality
- [ ] Student dashboard and gate pass application
- [ ] Warden dashboard and approval system
- [ ] QR code generation and verification
- [ ] Security guard interface

### Phase 3: Enhanced Features
- [ ] Admin dashboard and management tools
- [ ] Notifications and alerts
- [ ] Reporting and analytics
- [ ] Mobile responsiveness

### Phase 4: Optimization & Deployment
- [ ] Performance optimization
- [ ] Security hardening
- [ ] Testing and bug fixes
- [ ] Deployment to production

## Conclusion

The migration to Next.js and MongoDB will provide a more modern, scalable, and maintainable architecture for the Gate Pass System. The new stack will enable faster development cycles, improved performance, and enhanced user experience while maintaining all the core functionality of the original system.
