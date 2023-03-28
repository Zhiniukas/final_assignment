CREATE TABLE `events` (
  `event_id` int NOT NULL AUTO_INCREMENT,
  `event_name` varchar(45) NOT NULL,
  `event_description` varchar(45) DEFAULT NULL,
  `event_date` varchar(45) DEFAULT NULL,
  `event_place` varchar(45) DEFAULT NULL,
  `archived` tinyint DEFAULT '0',
  PRIMARY KEY (`event_name`),
  UNIQUE KEY `event_id_UNIQUE` (`event_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `participants` (
  `participant_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `date_of_birth` date DEFAULT NULL,
  `age` varchar(45) DEFAULT NULL,
  `archived` tinyint DEFAULT '0',
  PRIMARY KEY (`email`),
  UNIQUE KEY `id_UNIQUE` (`participant_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `first_name` varchar(45) DEFAULT NULL,
  `last_name` varchar(45) DEFAULT NULL,
  `email` varchar(45) NOT NULL,
  `password` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`email`),
  UNIQUE KEY `id_UNIQUE` (`user_id`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `event_participants` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_id` int DEFAULT NULL,
  `participant_id` int DEFAULT NULL,
  `is_archived` tinyint DEFAULT '0',
  UNIQUE KEY `idevent_participants_id_UNIQUE` (`id`),
  KEY `eventId_idx` (`event_id`),
  KEY `participantKey_idx` (`participant_id`),
  CONSTRAINT `eventKey` FOREIGN KEY (`event_id`) REFERENCES `events` (`event_id`),
  CONSTRAINT `participantKey` FOREIGN KEY (`participant_id`) REFERENCES `participants` (`participant_id`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
