-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 08, 2023 at 12:16 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `gate_pass_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `course_name` varchar(255) NOT NULL,
  `department_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`id`, `course_name`, `department_id`) VALUES
(1, 'B.Tech. Computer Science & Engineering', 1),
(2, 'B.Tech. Electronics and Communication & Engineering', 2);

-- --------------------------------------------------------

--
-- Table structure for table `departments`
--

CREATE TABLE `departments` (
  `id` int(11) NOT NULL,
  `dept_name` varchar(255) NOT NULL,
  `dept_short_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `departments`
--

INSERT INTO `departments` (`id`, `dept_name`, `dept_short_name`) VALUES
(1, 'School of Computer Science and Engineering', 'SOCSE'),
(2, 'School of Electronics and Communication & Engineering', 'SOECE');

-- --------------------------------------------------------

--
-- Table structure for table `gatepasses`
--

CREATE TABLE `gatepasses` (
  `id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `hostel_id` int(11) DEFAULT NULL,
  `teacher_id` int(11) NOT NULL,
  `qr_code` varchar(255) NOT NULL,
  `pass_status` enum('active','in-active','completed') DEFAULT 'active',
  `dept_pass_status` enum('pending','approved','rejected') DEFAULT 'pending',
  `warden_pass_status` enum('pending','approved','rejected') NOT NULL,
  `rejected_by` set('hod','warden') DEFAULT NULL,
  `reject_reason` text DEFAULT NULL,
  `room_no` varchar(255) DEFAULT NULL,
  `block_no` varchar(255) DEFAULT NULL,
  `leaving_purpose` text DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `contact_no` varchar(255) DEFAULT NULL,
  `leaving_date` date DEFAULT NULL,
  `leaving_time` time DEFAULT NULL,
  `returning_date` date DEFAULT NULL,
  `security_clearance` enum('verified','not-verified') NOT NULL DEFAULT 'not-verified',
  `security_clearance_datetime` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `gatepasses`
--

INSERT INTO `gatepasses` (`id`, `student_id`, `hostel_id`, `teacher_id`, `qr_code`, `pass_status`, `dept_pass_status`, `warden_pass_status`, `rejected_by`, `reject_reason`, `room_no`, `block_no`, `leaving_purpose`, `address`, `contact_no`, `leaving_date`, `leaving_time`, `returning_date`, `security_clearance`, `security_clearance_datetime`, `created_at`, `updated_at`) VALUES
(1, 9, 2, 5, 'ABC123', 'completed', 'approved', 'approved', NULL, NULL, '203', 'D', 'Going Home', 'Kathua, J&K', '9906547528', '2023-06-02', '18:52:16', '2023-06-09', 'verified', '2023-06-02 15:16:15', '2023-05-29 09:43:28', '2023-06-06 17:39:41'),
(2, 9, 3, 7, 'DEF456', 'active', 'approved', 'rejected', 'warden', 'Involved in various tech fest to be held this week.', '405', 'A', 'Health not well', 'Reasi, J&K', '9963541258', '2023-06-02', '17:52:25', '2023-06-21', 'not-verified', '0000-00-00 00:00:00', '2023-05-29 09:43:28', '2023-06-06 10:16:28'),
(4, 9, 3, 7, 'DEF456s', 'active', 'rejected', 'pending', 'hod', 'Not allowed', '405', 'A', 'Marriage', 'Reasi, J&K', '9963541258', '2023-06-16', '17:52:25', '2023-06-24', 'not-verified', '0000-00-00 00:00:00', '2023-05-29 09:43:28', '2023-06-08 05:08:38'),
(5, 9, 1, 2, 'DEF456sss', 'active', 'pending', 'pending', 'hod', '', '405', 'A', 'Health Checkup', 'Reasi, J&K', '9963541258', '2023-06-16', '17:52:25', '2023-06-24', 'not-verified', '0000-00-00 00:00:00', '2023-05-29 09:43:28', '2023-06-08 05:08:38');

-- --------------------------------------------------------

--
-- Table structure for table `hostels`
--

CREATE TABLE `hostels` (
  `id` int(11) NOT NULL,
  `hostel_name` varchar(255) NOT NULL,
  `teacher_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `hostels`
--

INSERT INTO `hostels` (`id`, `hostel_name`, `teacher_id`) VALUES
(1, 'Shivalik Hostel', 2),
(2, 'Vaishnavi Hostel', 5),
(3, 'Kailash Hostel', 7),
(4, 'Basohli Hostel', 6),
(6, 'Vindyanchal Hostel', 6),
(7, 'Trikuta Hostel', 7),
(8, 'Nilgiri Hostel', 7);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `fullname` varchar(255) NOT NULL,
  `entry_emp_no` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('student','director','warden','security_guard','admin') DEFAULT NULL,
  `hostel_id` int(11) DEFAULT NULL,
  `course_id` int(11) DEFAULT NULL,
  `dept_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fullname`, `entry_emp_no`, `email`, `password`, `role`, `hostel_id`, `course_id`, `dept_id`) VALUES
(1, 'Arun Singh', '17mca112', 'arun@example.com', '$2b$10$S3RVw7AwDpSZB68U8hAUbORI2mJ51h/shC8EC.ZXbHVUEMLBH7I6W', 'student', 3, 1, 1),
(2, 'Sonika Gupta', '365423', 'sonika@example.com', '$2b$10$S3RVw7AwDpSZB68U8hAUbORI2mJ51h/shC8EC.ZXbHVUEMLBH7I6W', 'warden', NULL, NULL, 1),
(3, 'Bob Johnson', '3256', 'bob.johnson@example.com', '$2b$10$S3RVw7AwDpSZB68U8hAUbORI2mJ51h/shC8EC.ZXbHVUEMLBH7I6W', 'security_guard', NULL, NULL, NULL),
(4, 'Admin', '365742', 'admin@example.com', '$2b$10$S3RVw7AwDpSZB68U8hAUbORI2mJ51h/shC8EC.ZXbHVUEMLBH7I6W', 'admin', NULL, NULL, NULL),
(5, 'Pooja Gupta', '365746', 'pooja@example.com', '$2b$10$S3RVw7AwDpSZB68U8hAUbORI2mJ51h/shC8EC.ZXbHVUEMLBH7I6W', 'warden', NULL, NULL, 1),
(6, 'Uday Partap', '457852', 'uday@example.com', '$2b$10$S3RVw7AwDpSZB68U8hAUbORI2mJ51h/shC8EC.ZXbHVUEMLBH7I6W', 'warden', NULL, NULL, 2),
(7, 'Manoj Gupta', '562458', 'manoj@example.com', '$2b$10$S3RVw7AwDpSZB68U8hAUbORI2mJ51h/shC8EC.ZXbHVUEMLBH7I6W', 'warden', NULL, NULL, 1),
(8, 'Aditya Singh', '19bca093', 'aditya@example.com', '$2b$10$S3RVw7AwDpSZB68U8hAUbORI2mJ51h/shC8EC.ZXbHVUEMLBH7I6W', 'student', 4, 1, 1),
(9, 'Nisha Rani', '16mna012', 'nisha@example.com', '$2b$10$S3RVw7AwDpSZB68U8hAUbORI2mJ51h/shC8EC.ZXbHVUEMLBH7I6W', 'student', 2, 2, 1),
(10, 'Jyoti Sharma', '15han034', 'jyoti@example.com', '$2b$10$S3RVw7AwDpSZB68U8hAUbORI2mJ51h/shC8EC.ZXbHVUEMLBH7I6W', 'student', 1, 1, 2);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `department_id` (`department_id`);

--
-- Indexes for table `departments`
--
ALTER TABLE `departments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `gatepasses`
--
ALTER TABLE `gatepasses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `teacher_id` (`teacher_id`),
  ADD KEY `hostel_id` (`hostel_id`);

--
-- Indexes for table `hostels`
--
ALTER TABLE `hostels`
  ADD PRIMARY KEY (`id`),
  ADD KEY `teacher_id` (`teacher_id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `hostel_id` (`hostel_id`),
  ADD KEY `course_id` (`course_id`),
  ADD KEY `dept_id` (`dept_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `departments`
--
ALTER TABLE `departments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `gatepasses`
--
ALTER TABLE `gatepasses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `hostels`
--
ALTER TABLE `hostels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `courses`
--
ALTER TABLE `courses`
  ADD CONSTRAINT `courses_ibfk_1` FOREIGN KEY (`department_id`) REFERENCES `departments` (`id`);

--
-- Constraints for table `gatepasses`
--
ALTER TABLE `gatepasses`
  ADD CONSTRAINT `gatepasses_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `gatepasses_ibfk_2` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`),
  ADD CONSTRAINT `gatepasses_ibfk_3` FOREIGN KEY (`hostel_id`) REFERENCES `hostels` (`id`);

--
-- Constraints for table `hostels`
--
ALTER TABLE `hostels`
  ADD CONSTRAINT `hostels_ibfk_1` FOREIGN KEY (`teacher_id`) REFERENCES `users` (`id`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`hostel_id`) REFERENCES `hostels` (`id`),
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`),
  ADD CONSTRAINT `users_ibfk_3` FOREIGN KEY (`dept_id`) REFERENCES `departments` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
