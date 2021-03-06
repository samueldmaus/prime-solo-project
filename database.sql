
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
	"image" VARCHAR (250),
	"ability_one" VARCHAR (250) NOT NULL,
	"ability_two" VARCHAR (250),
	"ability_three" VARCHAR (250),
	"ability_four" VARCHAR (250),
	"ability_ult" VARCHAR (250) NOT NULL
);
 
CREATE TABLE "hero_favorites" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"hero_id" INT REFERENCES "heroes"
);

CREATE TABLE "map_favorites" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"hero_id" INT REFERENCES "maps"
);

CREATE TABLE "map_heroes" (
	"id" SERIAL PRIMARY KEY,
	"hero_id" INT REFERENCES "heroes",
	"map_id" INT REFERENCES "maps"
);

CREATE TABLE "team_compositions" (
	"id" SERIAL PRIMARY KEY,
	"user_id" INT REFERENCES "user",
	"name" VARCHAR (80),
	"tank_one" INT REFERENCES "heroes",
	"tank_two" INT REFERENCES "heroes",
	"dps_one" INT REFERENCES "heroes",
	"dps_two" INT REFERENCES "heroes",
	"support_one" INT REFERENCES "heroes",
	"support_two" INT REFERENCES "heroes"
);
	