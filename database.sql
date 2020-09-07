
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);
-- create table for the heroes
CREATE TABLE "heroes" (
	"id" SERIAL PRIMARY KEY,
	"name" VARCHAR (80) NOT NULL,
	"role" VARCHAR (80) NOT NULL,
	"image" VARCHAR (250) NOT NULL,
	"ability_one" VARCHAR (250) NOT NULL,
	"ability_two" VARCHAR (250),
	"ability_three" VARCHAR (250),
	"ability_four" VARCHAR (250),
	"ability_ult" VARCHAR (250) NOT NULL
);
 