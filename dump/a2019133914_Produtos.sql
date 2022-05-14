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
-- Table structure for table `Produtos`
--

DROP TABLE IF EXISTS `Produtos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Produtos` (
  `id_prod` int(11) NOT NULL AUTO_INCREMENT,
  `nome_prod` varchar(45) NOT NULL,
  `edicao_prod` varchar(45) NOT NULL,
  `stock_prod` int(11) NOT NULL,
  `ref_prod` int(11) NOT NULL,
  `preco_compra` decimal(4,2) NOT NULL,
  `preco_venda` decimal(4,2) NOT NULL,
  PRIMARY KEY (`id_prod`),
  UNIQUE KEY `id_prod_UNIQUE` (`id_prod`),
  UNIQUE KEY `ref_prod_UNIQUE` (`ref_prod`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Produtos`
--

LOCK TABLES `Produtos` WRITE;
/*!40000 ALTER TABLE `Produtos` DISABLE KEYS */;
INSERT INTO `Produtos` VALUES (1,'Cavalo','Animais',12,467841565,4.99,10.99),(2,'Girafa','Animais',18,841548400,4.99,10.99),(3,'Urso','Animais',5,84147705,3.99,9.99),(4,'Elefante','Animais',8,922548400,4.99,10.99),(5,'Tigre','Animais',10,845834840,3.99,9.99),(6,'Macaco','Animais',11,84185484,2.99,8.99),(7,'Zebra','Animais',8,21548400,4.99,10.99),(8,'Cao','Animais',7,84858400,3.99,9.99),(9,'Gato','Animais',11,61548400,3.99,9.99),(10,'Porco','Animais',15,30548400,4.99,10.99),(11,'Sapo','Animais',21,3448400,4.99,10.99),(12,'Koala','Animais',36,3041023,3.99,9.99),(13,'Pássaro','Animais',16,13185484,2.99,8.99),(14,'Panda','Animais',19,615445800,3.99,9.99),(15,'Peixe','Animais',12,98548400,3.99,9.99),(16,'Egipto','Monumentos',10,9245125,5.99,11.99),(17,'Egipto 2','Monumentos',18,92450125,5.99,11.99),(18,'Torre de pisa','Monumentos',5,8545125,4.99,10.99),(19,'Grecia','Monumentos',11,92458025,5.99,11.99),(20,'Carrossel','Monumentos',18,10445125,3.99,9.99),(21,'Dubai','Monumentos',15,92404125,5.99,11.99),(22,'Casa Branca','Monumentos',8,9905125,4.99,10.99),(23,'Coluna','Monumentos',15,9245135,3.99,9.99),(24,'Big Ben','Monumentos',3,9298525,5.99,11.99),(25,'Tajmahal','Monumentos',17,9200125,4.99,10.99),(26,'Russia','Monumentos',5,2545125,3.99,9.99),(27,'Stonehenge','Monumentos',14,624125,5.99,11.99),(28,'Liberty','Monumentos',20,99475125,4.99,10.99),(29,'Torreeifel','Monumentos',7,9206625,5.99,11.99),(30,'Dia dos mortos','Festividades',23,3477582,3.99,9.99),(31,'St Patricks day','Festividades',12,3007582,4.99,11.99),(32,'Natal','Festividades',5,3470688,3.99,9.99),(33,'Dia de ação de graças','Festividades',7,3471288,3.99,9.99),(34,'Casamento','Festividades',13,30571288,4.99,10.99),(35,'Carnaval','Festividades',9,302258,4.99,10.99),(36,'Circo','Festividades',18,3488288,3.99,9.99),(37,'Halloween','Festividades',24,451288,3.99,9.99),(38,'4th of July','Festividades',7,3021288,4.99,10.99),(39,'Natal 2','Festividades',16,3401287,3.99,9.99),(40,'Natal 3','Festividades',11,34001287,3.99,9.99),(41,'Halloween 2','Festividades',19,4901288,3.99,9.99),(42,'Halloween 3','Festividades',2,45175,3.99,9.99),(43,'Terra','Universo',8,1288,4.99,10.99),(44,'Lua','Universo',14,1718,4.99,10.99),(45,'Eclipse','Universo',9,411288,3.99,9.99),(46,'Marte','Universo',16,9911288,3.99,9.99),(47,'Sistema Solar','Universo',18,6311288,3.99,9.99),(48,'Cristal','Universo',20,9681288,4.99,10.99),(49,'Astronauta','Universo',14,9331288,4.99,10.99),(50,'Torre de Londres','Monumentos',6,93771288,4.99,10.99),(51,'Galaxia','Universo',17,98441288,5.99,11.99),(52,'Jupiter','Universo',10,98001288,3.99,9.99),(53,'Galaxia 2','Universo',7,9141288,5.99,15.99),(54,'Mar','Universo',14,98681288,5.99,17.99),(55,'Pedras','Universo',12,9895288,4.99,11.99),(56,'Luz da noite','Universo',9,10441288,5.99,13.99),(57,'Neve','Universo',20,58441288,5.99,12.99),(58,'Sistema Solar','Universo',28,52441288,5.99,12.99),(59,'Spiderman','Séries e filmes',34,57114128,6.99,17.99),(60,'Friends','Séries e filmes',17,114128,6.99,17.99),(61,'Haary Potter','Séries e filmes',22,57133128,4.99,14.99),(62,'Frozen','Séries e filmes',27,12114128,6.99,17.99),(63,'Grinch','Séries e filmes',10,57190128,3.99,9.99),(64,'Ironman','Séries e filmes',29,9114128,5.99,15.99),(65,'Jaws','Séries e filmes',19,57114166,6.99,17.99),(66,'Dia de São Valentim','Festividades',28,289023,3.99,13.99),(67,'The nightmare before christmas','Séries e filmes',15,57614128,4.99,15.99),(68,'Narnia','Séries e filmes',21,34114128,6.99,17.99),(69,'Up','Séries e filmes',26,5711023,5.99,15.99),(70,'Titanic','Séries e filmes',27,5001023,5.99,15.99),(71,'Monsters','Séries e filmes',19,4511023,5.99,15.99),(72,'Aladdin','Séries e filmes',23,9711083,4.99,12.99),(73,'Peter Pan','Séries e filmes',18,5914023,5.99,15.99),(74,'Star Wars','Séries e filmes',22,3711023,3.99,13.99),(75,'Páscoa','Festividades',9,3714573,3.99,13.99);
/*!40000 ALTER TABLE `Produtos` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-01-20 12:13:47
