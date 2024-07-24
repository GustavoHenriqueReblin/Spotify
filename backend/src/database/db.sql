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
DROP DATABASE IF EXISTS `spotify`;
CREATE DATABASE IF NOT EXISTS `spotify` /*!40100 DEFAULT CHARACTER SET armscii8 COLLATE armscii8_bin */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `spotify`;

-- Copiando estrutura para tabela spotify.album
DROP TABLE IF EXISTS `album`;
CREATE TABLE IF NOT EXISTS `album` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(150) CHARACTER SET armscii8 COLLATE armscii8_bin DEFAULT NULL,
  `createdAt` date DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Copiando dados para a tabela spotify.album: ~3 rows (aproximadamente)
INSERT INTO `album` (`id`, `name`, `createdAt`) VALUES
	(1, 'Don\'t You Worry Child', '2012-01-01'),
	(2, 'Wild Ones', '2012-01-01'),
	(3, 'Black Eyed Peas', '2012-01-01'),
	(4, 'Morar Nesse Motel', '2012-01-01'),
	(5, 'Triplex (Ao Vivo)', '2012-01-01'),
	(6, '062 (Ao Vivo)', '2012-01-01');

-- Copiando estrutura para tabela spotify.alb_art
DROP TABLE IF EXISTS `alb_art`;
CREATE TABLE IF NOT EXISTS `alb_art` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `idAlbum` int unsigned DEFAULT NULL,
  `idArtist` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_alb_art_album` (`idAlbum`),
  KEY `fk_alb_art_artist` (`idArtist`),
  CONSTRAINT `fk_alb_art_album` FOREIGN KEY (`idAlbum`) REFERENCES `album` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_alb_art_artist` FOREIGN KEY (`idArtist`) REFERENCES `artist` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Copiando dados para a tabela spotify.alb_art: ~2 rows (aproximadamente)
INSERT INTO `alb_art` (`id`, `idAlbum`, `idArtist`) VALUES
	(1, 1, 1),
	(2, 1, 2),
	(3, 4, 4),
	(4, 5, 6),
	(5, 5, 7),
	(6, 6, 5),
	(7, 6, 8);

-- Copiando estrutura para tabela spotify.alb_mus
DROP TABLE IF EXISTS `alb_mus`;
CREATE TABLE IF NOT EXISTS `alb_mus` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `idAlbum` int unsigned DEFAULT NULL,
  `idMusic` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_alb_mus_music` (`idMusic`),
  KEY `fk_alb_mus_album` (`idAlbum`),
  CONSTRAINT `fk_alb_mus_album` FOREIGN KEY (`idAlbum`) REFERENCES `album` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_alb_mus_music` FOREIGN KEY (`idMusic`) REFERENCES `music` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Copiando dados para a tabela spotify.alb_mus: ~3 rows (aproximadamente)
INSERT INTO `alb_mus` (`id`, `idAlbum`, `idMusic`) VALUES
	(1, 1, 1),
	(2, 2, 2),
	(3, 3, 3),
	(4, 4, 4),
	(5, 5, 5),
	(6, 6, 6);

-- Copiando estrutura para tabela spotify.artist
DROP TABLE IF EXISTS `artist`;
CREATE TABLE IF NOT EXISTS `artist` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `firstName` varchar(50) CHARACTER SET armscii8 COLLATE armscii8_bin DEFAULT NULL,
  `lastName` varchar(50) CHARACTER SET armscii8 COLLATE armscii8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Copiando dados para a tabela spotify.artist: ~3 rows (aproximadamente)
INSERT INTO `artist` (`id`, `firstName`, `lastName`) VALUES
	(1, 'Swedish House Mafia', NULL),
	(2, 'John Martin', NULL),
	(3, 'Flo rida', NULL),
	(4, 'Gustavo Lima', NULL),
	(5, 'Hugo & Gilherme', NULL),
	(6, 'Matheus Fernandes', NULL),
	(7, 'Matheus & Kauan', NULL),
	(8, 'Maiara & Maraisa', NULL);

-- Copiando estrutura para tabela spotify.art_mus
DROP TABLE IF EXISTS `art_mus`;
CREATE TABLE IF NOT EXISTS `art_mus` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `idArtist` int unsigned DEFAULT NULL,
  `idMusic` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_art_mus_artist` (`idArtist`),
  KEY `fk_art_mus_music` (`idMusic`),
  CONSTRAINT `fk_art_mus_artist` FOREIGN KEY (`idArtist`) REFERENCES `artist` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_art_mus_music` FOREIGN KEY (`idMusic`) REFERENCES `music` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Copiando dados para a tabela spotify.art_mus: ~2 rows (aproximadamente)
INSERT INTO `art_mus` (`id`, `idArtist`, `idMusic`) VALUES
	(1, 1, 1),
	(2, 2, 1),
	(3, 4, 4),
	(4, 6, 5),
	(5, 7, 5),
	(6, 5, 6),
	(7, 8, 6);

-- Copiando estrutura para tabela spotify.library
DROP TABLE IF EXISTS `library`;
CREATE TABLE IF NOT EXISTS `library` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `idUser` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_library_user` (`idUser`),
  CONSTRAINT `fk_library_user` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Copiando dados para a tabela spotify.library: ~0 rows (aproximadamente)
INSERT INTO `library` (`id`, `idUser`) VALUES
	(1, 1);

-- Copiando estrutura para tabela spotify.lib_pla
DROP TABLE IF EXISTS `lib_pla`;
CREATE TABLE IF NOT EXISTS `lib_pla` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `idLibrary` int unsigned DEFAULT NULL,
  `idPlaylist` int unsigned DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_lib_pla_playlist` (`idPlaylist`),
  KEY `fk_lib_pla_library` (`idLibrary`),
  CONSTRAINT `fk_lib_pla_library` FOREIGN KEY (`idLibrary`) REFERENCES `library` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `fk_lib_pla_playlist` FOREIGN KEY (`idPlaylist`) REFERENCES `playlist` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Copiando dados para a tabela spotify.lib_pla: ~3 rows (aproximadamente)
INSERT INTO `lib_pla` (`id`, `idLibrary`, `idPlaylist`) VALUES
	(1, 1, 2),
	(2, 1, 1),
	(3, 1, 3);

-- Copiando estrutura para tabela spotify.music
DROP TABLE IF EXISTS `music`;
CREATE TABLE IF NOT EXISTS `music` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET armscii8 COLLATE armscii8_bin DEFAULT NULL,
  `duration` int DEFAULT NULL COMMENT 'in seconds',
  `src` varchar(500) CHARACTER SET armscii8 COLLATE armscii8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Copiando dados para a tabela spotify.music: ~6 rows (aproximadamente)
INSERT INTO `music` (`id`, `name`, `duration`, `src`) VALUES
	(1, 'Don`t You Worry Child', 212, 'https://firebasestorage.googleapis.com/v0/b/spotify-2e788.appspot.com/o/Don\'t%20You%20Worry%20Child%20%7Bid-1%7D.mp3?alt=media&token=9d3640ef-d585-4ea8-9520-56b84dafd499'),
	(2, 'Good Feeling', 257, 'https://firebasestorage.googleapis.com/v0/b/spotify-2e788.appspot.com/o/Flo%20Rida%20-%20Good%20Feeling.mp3?alt=media&token=b1ea8f29-396e-4bd7-acb9-5a9a5605dd94'),
	(3, 'I Gotta Feeling', 289, 'https://firebasestorage.googleapis.com/v0/b/spotify-2e788.appspot.com/o/I%20Gotta%20Feeling%20%7Bid-3%7D.mp3?alt=media&token=a8ea0e6f-24b9-49c4-a320-1e4df12b1bca'),
	(4, 'Morar Nesse Motel', 187, 'https://firebasestorage.googleapis.com/v0/b/spotify-2e788.appspot.com/o/Morar%20Nesse%20Motel%20-%20Gustavo%20Lima.mp3?alt=media&token=c9a04f4c-b82b-4ba8-b9ea-ab2530409886'),
	(5, 'Triplex', 178, 'https://firebasestorage.googleapis.com/v0/b/spotify-2e788.appspot.com/o/Triplex%20-%20Matheus%20Fernandes.mp3?alt=media&token=40c3bc5d-8776-421a-aacc-9225426f29f8'),
	(6, 'Morena De Goiania', 167, 'https://firebasestorage.googleapis.com/v0/b/spotify-2e788.appspot.com/o/Morena%20De%20Goi%C3%A2nia%20-%20Hugo%20%26%20Guilherme.mp3?alt=media&token=711508e9-2a91-4dfd-845d-2a953ac55d97');

-- Copiando estrutura para tabela spotify.mus_pla
DROP TABLE IF EXISTS `mus_pla`;
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
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Copiando dados para a tabela spotify.mus_pla: ~6 rows (aproximadamente)
INSERT INTO `mus_pla` (`id`, `idMusic`, `idPlaylist`, `addedAt`) VALUES
	(1, 1, 2, '2024-06-18 14:30:38'),
	(2, 3, 2, '2024-06-18 14:30:38'),
	(3, 2, 2, '2024-06-18 14:30:38'),
	(17, 4, 3, '2024-07-23 21:30:38'),
	(18, 5, 3, '2024-07-23 21:30:38'),
	(19, 6, 3, '2024-07-23 21:30:38');

-- Copiando estrutura para tabela spotify.playlist
DROP TABLE IF EXISTS `playlist`;
CREATE TABLE IF NOT EXISTS `playlist` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `idUser` int unsigned DEFAULT NULL,
  `name` varchar(50) CHARACTER SET armscii8 COLLATE armscii8_bin DEFAULT NULL,
  `picture` varchar(500) CHARACTER SET armscii8 COLLATE armscii8_bin DEFAULT NULL,
  `type` tinyint DEFAULT NULL COMMENT '0 - private, 1 - public',
  PRIMARY KEY (`id`),
  KEY `fk_playlist_user` (`idUser`),
  CONSTRAINT `fk_playlist_user` FOREIGN KEY (`idUser`) REFERENCES `user` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Copiando dados para a tabela spotify.playlist: ~3 rows (aproximadamente)
INSERT INTO `playlist` (`id`, `idUser`, `name`, `picture`, `type`) VALUES
	(1, 1, 'Pagodeira', 'https://s2-g1.glbimg.com/ZGFoT6F0d-NJkgydMe4bkrNiDVw=/0x0:1730x1619/924x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2021/j/Q/7nepC0RsqzLnivXoCEug/marvvila-na-area-dvd-show-marcoshermes-81.jpg', 1),
	(2, 2, 'SO PEDRADA NOSTALGICA', NULL, 1),
	(3, 1, 'Modao sertanejo', NULL, 1);

-- Copiando estrutura para tabela spotify.user
DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `idLastMusic` int unsigned DEFAULT NULL,
  `accountLevel` int unsigned NOT NULL DEFAULT '0',
  `login` varchar(50) CHARACTER SET armscii8 COLLATE armscii8_bin DEFAULT NULL,
  `name` varchar(100) CHARACTER SET armscii8 COLLATE armscii8_bin DEFAULT NULL,
  `password` varchar(50) CHARACTER SET armscii8 COLLATE armscii8_bin DEFAULT NULL,
  `token` varchar(400) CHARACTER SET armscii8 COLLATE armscii8_bin DEFAULT NULL,
  `picture` varchar(150) CHARACTER SET armscii8 COLLATE armscii8_bin DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_user_music` (`idLastMusic`),
  CONSTRAINT `fk_user_music` FOREIGN KEY (`idLastMusic`) REFERENCES `music` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=armscii8 COLLATE=armscii8_bin;

-- Copiando dados para a tabela spotify.user: ~2 rows (aproximadamente)
INSERT INTO `user` (`id`, `idLastMusic`, `accountLevel`, `login`, `name`, `password`, `token`, `picture`) VALUES
	(1, NULL, 0, 'gustavohique12@gmail.com', 'GHR', '86f7e437faa5a7fce15d1ddcb9eaeaea377667b8', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwibG9naW4iOiJndXN0YXZvaGlxdWUxMkBnbWFpbC5jb20iLCJpYXQiOjE3MjE3ODA4MjksImV4cCI6MTcyMTg2NzIyOX0.s4d09DlPjJL3QDVj_t8-kK5HyfzrtYwvoY_zT5fDw5w', 'https://yt3.ggpht.com/yti/ANjgQV9U_Am-ZeOXM_HSWtiNzG1Bh9YMGN9dR88D1qKy4OsZIPg=s108-c-k-c0x00ffffff-no-rj'),
	(2, NULL, 2, 'perico@gmail.com', 'PERIC0', NULL, NULL, NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
