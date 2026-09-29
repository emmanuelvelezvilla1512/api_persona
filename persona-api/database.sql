CREATE DATABASE IF NOT EXISTS persona_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE persona_db;

CREATE TABLE IF NOT EXISTS personas (
id INT AUTO_INCREMENT PRIMARY KEY,
firstname VARCHAR(100) NOT NULL,
lastname VARCHAR(100) NOT NULL,
age INT NOT NULL,
datebirth DATE NOT NULL
);

INSERT INTO personas(firstname,lastname,age,datebirth)
VALUES
('Juan', 'Perez', 28, '1997-05-20'),
('Maria', 'Gomez',34, '1991-11-03');