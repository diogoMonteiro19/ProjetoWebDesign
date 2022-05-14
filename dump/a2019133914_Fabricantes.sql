-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: saturno.esec.pt    Database: a2019133914
-- ------------------------------------------------------
-- Server version	5.7.34

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Fabricantes`
--

DROP TABLE IF EXISTS `Fabricantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Fabricantes` (
  `id_fab` int(11) NOT NULL AUTO_INCREMENT,
  `nome_fab` varchar(45) NOT NULL,
  `morada_fab` varchar(45) NOT NULL,
  `mail_fab` varchar(45) NOT NULL,
  `nt_fab` int(11) NOT NULL,
  PRIMARY KEY (`id_fab`),
  UNIQUE KEY `mail_fab_UNIQUE` (`mail_fab`),
  UNIQUE KEY `nt_fab_UNIQUE` (`nt_fab`),
  UNIQUE KEY `id_fab_UNIQUE` (`id_fab`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Fabricantes`
--

LOCK TABLES `Fabricantes` WRITE;
/*!40000 ALTER TABLE `Fabricantes` DISABLE KEYS */;
INSERT INTO `Fabricantes` VALUES (1,'Jupin Group CO','Lisboa','jupingorup@gmail.com',231258951),(2,'Giant SnowGlobe','Madrid','giantsnowglobe@gmail.com',326258922),(3,'Jiaxing Usun Imp & Exp CO','França','jiaxing@gmail.com',321212551),(4,'Guangzhou namchi culture','Alemanha','guangzhou@gmail.com',389258541),(5,'queen of snow globe','Lisboa','queenofsnowglobes@gmail.com',231258581);
/*!40000 ALTER TABLE `Fabricantes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-20 12:13:52
