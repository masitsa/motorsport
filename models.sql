-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 30, 2020 at 08:12 PM
-- Server version: 10.4.10-MariaDB
-- PHP Version: 7.3.12

SET SQL_MODE
= "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT
= 0;
START TRANSACTION;
SET time_zone
= "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `carsales`
--

-- --------------------------------------------------------

--
-- Table structure for table `models`
--

CREATE TABLE `models`
(
  `id` int
(11) NOT NULL,
  `model_name` varchar
(255) DEFAULT NULL,
  `brand_id` int
(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `models`
--

INSERT INTO `models` (`
id`,
`model_name
`, `brand_id`, `createdAt`, `updatedAt`) VALUES
(1, '5 series', 2, '2020-04-20 08:42:21', '2020-04-20 08:42:21'),
(2, 'X3', 2, '2020-04-20 08:42:21', '2020-04-20 08:42:21'),
(3, 'X5', 2, '2020-04-20 08:42:21', '2020-04-20 08:42:21'),
(4, 'x6', 2, '2020-04-20 08:42:21', '2020-04-20 08:42:21'),
(5, 'Z3', 2, '2020-04-20 08:42:21', '2020-04-20 08:42:21'),
(6, 'GLC coupe', 1, '2020-04-20 08:42:21', '2020-04-20 08:42:21'),
(7, 'GLE coupe', 1, '2020-04-20 08:42:21', '2020-04-20 08:42:21'),
(8, 'Cclass', 1, '2020-04-20 08:42:21', '2020-04-20 08:42:21'),
(9, 'Eclass', 1, '2020-04-20 08:42:21', '2020-04-20 08:42:21'),
(10, 'AMG GT', 1, '2020-04-20 08:42:21', '2020-04-20 08:42:21'),
(11, 'SLS', 1, '2020-04-20 08:42:21', '2020-04-20 08:42:21'),
(12, 'Q8', 3, '2020-04-20 08:42:21', '2020-04-20 08:42:21'),
(13, 'S6', 3, '2020-04-20 08:42:21', '2020-04-20 08:42:21'),
(14, 'A3', 3, '2020-04-20 08:42:21', '2020-04-20 08:42:21'),
(15, 'A6', 3, '2020-04-20 08:42:21', '2020-04-20 08:42:21'),
(16, 'R8', 3, '2020-04-20 08:42:21', '2020-04-20 08:42:21'),
(17, 'RSQ8', 3, '2020-04-20 08:42:21', '2020-04-20 08:42:21'),
(18, 'RS4', 3, '2020-04-20 08:42:21', '2020-04-20 08:42:21'),
(19, 'Toureg', 4, '2020-04-20 08:42:21', '2020-04-20 08:42:21'),
(20, 'Passat', 4, '2020-04-20 08:42:21', '2020-04-20 08:42:21'),
(21, 'wrx sti', 6, '2020-04-20 08:42:21', '2020-04-20 08:42:21'),
(22, 'Polo', 4, '2020-04-20 08:42:21', '2020-04-20 08:42:21'),
(23, 'Jetta', 4, '2020-04-20 08:42:21', '2020-04-20 08:42:21'),
(24, 'Giulia Quadrifolio', 5, '2020-04-20 08:42:21', '2020-04-20 08:42:21'),
(25, 'Giulia Veloche', 5, '2020-04-20 08:42:21', '2020-04-20 08:42:21'),
(26, 'Stelvio Quadrifolio', 5, '2020-04-20 08:42:21', '2020-04-20 08:42:21'),
(27, 'WRX sti', 6, '2020-04-20 08:42:21', '2020-04-20 08:42:21'),
(28, 'Forester', 6, '2020-04-20 08:42:21', '2020-04-20 08:42:21'),
(29, 'Impreza', 6, '2020-04-20 08:42:21', '2020-04-20 08:42:21'),
(30, 'Outback', 6, '2020-04-20 08:42:21', '2020-04-20 08:42:21');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `models`
--
ALTER TABLE `models`
ADD PRIMARY KEY
(`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `models`
--
ALTER TABLE `models`
  MODIFY `id` int
(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
