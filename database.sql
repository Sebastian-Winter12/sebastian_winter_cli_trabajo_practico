CREATE DATABASE sebastian_winter_cli_trabajo_practico;

USE sebastian_winter_cli_trabajo_practico;

CREATE TABLE users (
  id VARCHAR(255) PRIMARY KEY,
  username VARCHAR(255),
  email VARCHAR(255),
  password VARCHAR(255)
);