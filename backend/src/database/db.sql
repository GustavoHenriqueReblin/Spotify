-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           8.3.0 - MySQL Community Server - GPL
-- OS do Servidor:               Linux
-- HeidiSQL Versão:              12.3.0.6589
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Copiando estrutura do banco de dados para spotify
CREATE DATABASE IF NOT EXISTS `spotify` /*!40100 DEFAULT CHARACTER SET armscii8 COLLATE armscii8_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `spotify`;

-- Copiando estrutura para tabela spotify.album
CREATE TABLE IF NOT EXISTS `album` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) CHARACTER SET armscii8 COLLATE armscii8_bin DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Copiando dados para a tabela spotify.album: ~1 rows (aproximadamente)
INSERT INTO `album` (`id`, `name`, `createdAt`) VALUES
	(1, 'Don\'t You Worry Child', '2012-01-01');

-- Copiando estrutura para tabela spotify.alb_art
CREATE TABLE IF NOT EXISTS `alb_art` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `idAlbum` int unsigned DEFAULT NULL,
  `idArtist` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_alb_art_album` (`idAlbum`),
  KEY `fk_alb_art_artist` (`idArtist`),
  CONSTRAINT `fk_alb_art_album` FOREIGN KEY (`idAlbum`) REFERENCES `album` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_alb_art_artist` FOREIGN KEY (`idArtist`) REFERENCES `artist` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Copiando dados para a tabela spotify.alb_art: ~2 rows (aproximadamente)
INSERT INTO `alb_art` (`id`, `idAlbum`, `idArtist`) VALUES
	(1, 1, 1),
	(2, 1, 2);

-- Copiando estrutura para tabela spotify.alb_mus
CREATE TABLE IF NOT EXISTS `alb_mus` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `idAlbum` int unsigned DEFAULT NULL,
  `idMusic` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_alb_mus_music` (`idMusic`),
  KEY `fk_alb_mus_album` (`idAlbum`),
  CONSTRAINT `fk_alb_mus_album` FOREIGN KEY (`idAlbum`) REFERENCES `album` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_alb_mus_music` FOREIGN KEY (`idMusic`) REFERENCES `music` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Copiando dados para a tabela spotify.alb_mus: ~1 rows (aproximadamente)
INSERT INTO `alb_mus` (`id`, `idAlbum`, `idMusic`) VALUES
	(1, 1, 1);

-- Copiando estrutura para tabela spotify.artist
CREATE TABLE IF NOT EXISTS `artist` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) COLLATE armscii8_bin DEFAULT NULL,
  `lastName` varchar(50) COLLATE armscii8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Copiando dados para a tabela spotify.artist: ~3 rows (aproximadamente)
INSERT INTO `artist` (`id`, `firstName`, `lastName`) VALUES
	(1, 'Swedish House Mafia', NULL),
	(2, 'John Martin', NULL),
	(3, 'Flo rida', NULL);

-- Copiando estrutura para tabela spotify.art_mus
CREATE TABLE IF NOT EXISTS `art_mus` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `idArtist` int unsigned DEFAULT NULL,
  `idMusic` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_art_mus_artist` (`idArtist`),
  KEY `fk_art_mus_music` (`idMusic`),
  CONSTRAINT `fk_art_mus_artist` FOREIGN KEY (`idArtist`) REFERENCES `artist` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_art_mus_music` FOREIGN KEY (`idMusic`) REFERENCES `music` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Copiando dados para a tabela spotify.art_mus: ~2 rows (aproximadamente)
INSERT INTO `art_mus` (`id`, `idArtist`, `idMusic`) VALUES
	(1, 1, 1),
	(2, 2, 1);

-- Copiando estrutura para tabela spotify.library
CREATE TABLE IF NOT EXISTS `library` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `idUser` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_library_user` (`idUser`),
  CONSTRAINT `fk_library_user` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Copiando dados para a tabela spotify.library: ~1 rows (aproximadamente)
INSERT INTO `library` (`id`, `idUser`) VALUES
	(1, 1);

-- Copiando estrutura para tabela spotify.lib_pla
CREATE TABLE IF NOT EXISTS `lib_pla` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `idLibrary` int unsigned DEFAULT NULL,
  `idPlaylist` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_lib_pla_playlist` (`idPlaylist`),
  KEY `fk_lib_pla_library` (`idLibrary`),
  CONSTRAINT `fk_lib_pla_library` FOREIGN KEY (`idLibrary`) REFERENCES `library` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_lib_pla_playlist` FOREIGN KEY (`idPlaylist`) REFERENCES `playlist` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Copiando dados para a tabela spotify.lib_pla: ~3 rows (aproximadamente)
INSERT INTO `lib_pla` (`id`, `idLibrary`, `idPlaylist`) VALUES
	(1, 1, 2),
	(2, 1, 1),
	(3, 1, 3);

-- Copiando estrutura para tabela spotify.music
CREATE TABLE IF NOT EXISTS `music` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE armscii8_bin DEFAULT NULL,
  `duration` int DEFAULT NULL COMMENT 'in seconds',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Copiando dados para a tabela spotify.music: ~2 rows (aproximadamente)
INSERT INTO `music` (`id`, `name`, `duration`) VALUES
	(1, 'Don\'t You Worry Child', 212),
	(2, 'Good Feeling', 248);

-- Copiando estrutura para tabela spotify.mus_pla
CREATE TABLE IF NOT EXISTS `mus_pla` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `idMusic` int unsigned DEFAULT NULL,
  `idPlaylist` int unsigned DEFAULT NULL,
  `addedAt` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_mus_pla_music` (`idMusic`),
  KEY `fk_mus_pla_playlist` (`idPlaylist`),
  CONSTRAINT `fk_mus_pla_music` FOREIGN KEY (`idMusic`) REFERENCES `music` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_mus_pla_playlist` FOREIGN KEY (`idPlaylist`) REFERENCES `playlist` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Copiando dados para a tabela spotify.mus_pla: ~2 rows (aproximadamente)
INSERT INTO `mus_pla` (`id`, `idMusic`, `idPlaylist`, `addedAt`) VALUES
	(1, 1, 2, '2024-06-18 14:30:38'),
	(2, 2, 2, '2024-06-18 14:30:38');

-- Copiando estrutura para tabela spotify.playlist
CREATE TABLE IF NOT EXISTS `playlist` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `idUser` int unsigned DEFAULT NULL,
  `nome` varchar(50) COLLATE armscii8_bin DEFAULT NULL,
  `picture` varchar(50) CHARACTER SET armscii8 COLLATE armscii8_bin DEFAULT NULL,
  `type` tinyint DEFAULT NULL COMMENT '0 - private, 1 - public',
  PRIMARY KEY (`id`),
  KEY `fk_playlist_user` (`idUser`),
  CONSTRAINT `fk_playlist_user` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Copiando dados para a tabela spotify.playlist: ~3 rows (aproximadamente)
INSERT INTO `playlist` (`id`, `idUser`, `nome`, `picture`, `type`) VALUES
	(1, 1, 'Pagodeira', NULL, 1),
	(2, 2, 'SO PEDRADA NOSTALGICA', NULL, 1),
	(3, 1, 'Modao sertanejo', NULL, 1);

-- Copiando estrutura para tabela spotify.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `idLastMusic` int unsigned DEFAULT NULL,
  `accountLevel` int unsigned NOT NULL DEFAULT '0',
  `login` varchar(50) COLLATE armscii8_bin DEFAULT NULL,
  `name` varchar(100) CHARACTER SET armscii8 COLLATE armscii8_bin DEFAULT NULL,
  `password` varchar(50) COLLATE armscii8_bin DEFAULT NULL,
  `token` varchar(400) CHARACTER SET armscii8 COLLATE armscii8_bin DEFAULT NULL,
  `picture` varchar(150) COLLATE armscii8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_music` (`idLastMusic`),
  CONSTRAINT `fk_user_music` FOREIGN KEY (`idLastMusic`) REFERENCES `music` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Copiando dados para a tabela spotify.user: ~2 rows (aproximadamente)
INSERT INTO `user` (`id`, `idLastMusic`, `accountLevel`, `login`, `name`, `password`, `token`, `picture`) VALUES
	(1, NULL, 0, 'gustavohique12@gmail.com', 'GHR', '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibG9naW4iOiJndXN0YXZvaGlxdWUxMkBnbWFpbC5jb20iLCJpYXQiOjE3MTg3Mjg2MDMsImV4cCI6MTcxODgxNTAwM30.mfIDA5126P_UeLz1Rhnd2ejJTR1N-Wa8UjcGWVgCQmQ', 'https://yt3.ggpht.com/yti/ANjgQV9U_Am-ZeOXM_HSWtiNzG1Bh9YMGN9dR88D1qKy4OsZIPg=s108-c-k-c0x00ffffff-no-rj'),
	(2, NULL, 2, 'perico@gmail.com', 'PERIC0', NULL, NULL, NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
