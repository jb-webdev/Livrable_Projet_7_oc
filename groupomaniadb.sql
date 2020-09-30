-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : mar. 29 sep. 2020 à 15:29
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomaniadb`
--

-- --------------------------------------------------------

--
-- Structure de la table `messages`
--

DROP TABLE IF EXISTS `messages`;
CREATE TABLE IF NOT EXISTS `messages` (
  `idMESSAGE` int(11) NOT NULL AUTO_INCREMENT,
  `idAuthor` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `title` varchar(255) NOT NULL,
  `content` varchar(255) NOT NULL,
  `attachement` varchar(255) DEFAULT NULL,
  `likes` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`idMESSAGE`),
  UNIQUE KEY `idMESSAGES` (`idMESSAGE`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `messages`
--

INSERT INTO `messages` (`idMESSAGE`, `idAuthor`, `username`, `title`, `content`, `attachement`, `likes`) VALUES
(28, 273, 'Giovanni', 'premier message de giovanni', 'bonjour tous le monde je suis l\'administrateur du site !', '', 0),
(29, 274, 'Sandra', 'premier message de Sandra !', 'Salut tous le monde c\'est mon premier message envoyé depuis l\'application de React !!!!!', '', 0),
(34, 277, 'Sam', 'modification par sam', 'jkjdeinqcfjien', '', 0);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `IdUSERS` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `bio` varchar(255) DEFAULT NULL,
  `isAdmin` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`IdUSERS`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=284 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`IdUSERS`, `email`, `username`, `password`, `bio`, `isAdmin`) VALUES
(272, 'samuel@groupe.com', 'Samuel', '$2b$10$OQKPRItFGfjQDC.Cl3gFTOqhej2HFdN2dQmWddqrtz5ZyifQRQAHy', 'service commerciale de Marseille', 0),
(273, 'giovanni@groupe.com', 'Giovanni', '$2b$10$kj6emylKhfywNw.zu//zPeFQLCXH2Zv6DDGiX0WedTcjv/VKsrmBK', 'Administrateur du site', 1),
(274, 'sandra@groupe.com', 'Sandra', '$2b$10$J4/4OpO7NTO1jP0j6ARubOc4cmGuBj3bccPWE6FLj8KlSDfTPsQbK', 'Service commerciale de Lyon', 0),
(277, 'sam@groupe.com', 'Sam', '$2b$10$kQRPDhUGOKJVfEc7ib5Q2OB/77845D/.f2Y2IVHC71fFJl4ig0KkS', 'utilisatrice', 0),
(278, 'loulou@loulou.com', 'loulou', '$2b$10$.4HnkAZZFQHkzbWq6Ge5LOjoj5YN/1n3CfqEv8QncA/hMmDgPyyrm', 'Service commercilae Toulouse', 0),
(281, 'essai@connexion.com', 'essai connexion', '$2b$10$GTpuQQsOaXCEaFn38XpqzOHV7zxEEVF/LPPlOD3FteNuOXDX4Ek0S', '', 0),
(282, 'lulu@lulu.com', 'lulu', '$2b$10$zw.fj/.eCEcFgtL9lziB5O9gOz1ZqrPQ5D5knCoBfEkLuGPWoUEUS', 'njdfiq', 0),
(283, 'toto@toto.com', 'toto', '$2b$10$y8pnX17rKRBhFEafhoq55u2I4pY4ZoelklkyfCDZpUutb6nrFNebq', '', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
