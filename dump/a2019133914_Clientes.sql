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
-- Table structure for table `Clientes`
--

DROP TABLE IF EXISTS `Clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Clientes` (
  `id_cliente` int(11) NOT NULL AUTO_INCREMENT,
  `nome_cliente` varchar(45) NOT NULL,
  `dn_cliente` date NOT NULL,
  `morada_cliente` varchar(45) NOT NULL,
  `sexo_cliente` enum('feminino','masculino','outro') NOT NULL,
  `nc_cliente` int(11) NOT NULL,
  `mail_cliente` varchar(45) NOT NULL,
  `pass_cliente` char(20) NOT NULL,
  `nt_cliente` int(11) NOT NULL,
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `id_cliente_UNIQUE` (`id_cliente`),
  UNIQUE KEY `mail_cliente_UNIQUE` (`mail_cliente`),
  UNIQUE KEY `nt_cliente_UNIQUE` (`nt_cliente`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Clientes`
--

LOCK TABLES `Clientes` WRITE;
/*!40000 ALTER TABLE `Clientes` DISABLE KEYS */;
INSERT INTO `Clientes` VALUES (1,'Margarida Batista','2000-02-02','Viseu','feminino',645320952,'mbatista@gmail.com','000000',912345678),(2,'Rui Martins','1988-05-19','Coimbra','masculino',865659659,'ruimt@gmail.com','1111111',958456369),(4,'Davi Teixeira','1997-01-03','Lisboa','outro',165859659,'davit@gmail.com','1111111',958476360),(5,'Ana Duarte','1999-07-18','Minho','feminino',345325552,'aduarte@gmail.com','000450',917745678),(7,'Salvador Ribeiro','2010-03-30','Setubal','outro',1658512359,'salvadorr@gmail.com','11178g11',957276360),(8,'Xavier Ruivo','2003-12-01','Algarve','masculino',125159659,'ruivo@gmail.com','1114571',912256369),(9,'Rita Henriques','1962-09-03','Castelo Branco','feminino',125154449,'ritah@gmail.com','987l4571',916666569),(10,'Luciana Ferreira','1978-11-25','Braga','feminino',121111449,'luluferrero@gmail.com','987l4hr1',916475691),(12,'Sebastiao Loiro','1995-05-21','Alentejo','masculino',999159659,'loiroseba@gmail.com','qwer71',912256000),(13,'Evaristo Gonçalo','2001-08-13','Algarve','masculino',999147659,'evaristog@gmail.com','qjugr56d',910156000),(14,'Yasmine Vieira','1986-04-09','Bragança','outro',1600512359,'yasminevivi@gmail.com','zih8g11',957204360),(15,'Rosalia Montijo','1998-03-15','Sintra','feminino',121110569,'rosalitamonti@gmail.com','9kih4hr1',916401691),(16,'Silvivondela Torres','2000-10-06','Guarda','masculino',999140019,'silitoto@gmail.com','qju15kk',910154500),(17,'Jacinta Baliza','2003-06-10','Lisboa','feminino',127710569,'balizeira@gmail.com','9kiççhr1',906401691),(18,'Melissa Isabel','1984-06-06','Coimbra','feminino',127710333,'melissaisa@gmail.com','9isaggr1',906661691),(19,'Noa Vaz','1999-12-26','Vila Real','outro',1600515559,'noavaz@gmail.com','zih44g11',957204555),(20,'Silvia Fernandes','1968-06-17','Viana do castelo','feminino',999141489,'silviafe@gmail.com','123kklo',910154110),(21,'Ricardo Rua','2002-02-03','Viseu','masculino',925140019,'ricardor@gmail.com','qrua125kk',910154599),(22,'Luis Miguel','2000-05-24','Coimbra','masculino',925140777,'luismig@gmail.com','4ka125kk',910154588),(23,'Ines Maria','1999-01-16','Minho','feminino',127725333,'mariaines@gmail.com','9isaggr1',906661644),(24,'Julia Gabriel','1997-09-03','Lisboa','feminino',127725377,'gabriel@gmail.com','9isagl85',906661355),(25,'Diogo Monteiro','2003-08-12','Coimbra','masculino',925141477,'diogom@gmail.com','4ka16hgk',910154758),(26,'Joao Alcatrao','1995-10-09','Algarve','masculino',925881477,'alcatrao@gmail.com','4ka1wq23',910154123),(27,'Gisela Loureiro','2009-04-13','Alentejo','feminino',12445377,'gisela@gmail.com','9gigigl85',906781355),(28,'Constanca Sousa','2001-11-28','Beja','feminino',17745377,'consti@gmail.com','9giergl85',906481355),(29,'Cliente1','1999-09-19','coimbra','feminino',123456789,'clienteteste@teste.com','123456',914488667);
/*!40000 ALTER TABLE `Clientes` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-20 12:13:46
