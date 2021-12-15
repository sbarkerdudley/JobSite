--Create tables and load database from csv's
-- Assumes jobsite Database Exists
  --CREATE DATABASE jobsite;  command to create database, if needed.
-- Run this SQL file against jobsite database
  -- psql -U postgres     enter psql
  -- \l                   lists databases
  -- \c jobsite               connect to qas database
  -- \i init.sql   runs this script file
-- Using absolute value of file paths for import, change if necessary

--Clear Old Data and Tables
DROP TABLE IF EXISTS Applications CASCADE;

DROP TABLE IF EXISTS Saved_Jobs CASCADE;

DROP TABLE IF EXISTS Job_Posts CASCADE;

DROP TABLE IF EXISTS Users CASCADE;

DROP TABLE IF EXISTS Employers CASCADE;

DROP TYPE experience_levels;
DROP TYPE employment_types;
DROP TYPE work_site_types;
DROP TYPE interest_levels;


CREATE TABLE Employers
(
 id                       int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY UNIQUE,
 logo_url     varchar(200) NULL,
 street_address  varchar(100) NULL,
 city            varchar(50) NULL,
 "state"           varchar(50) NULL,
 zip             varchar(10) NULL,
 phone_number    smallint NULL,
 name            varchar(100) NOT NULL UNIQUE,
 date_created    timestamptz NOT NULL
);

CREATE TABLE Users
(
 id                       int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY UNIQUE,
 hash                    varchar(60) NOT NULL,
 password_salt           varchar(10) NOT NULL,
 session_id              varchar(20) NOT NULL,
 date_created            timestamptz NOT NULL,
 first_name              varchar(50) NULL,
 last_name               varchar(50) NULL,
 street_address          varchar(100) NULL,
 city                    varchar(50) NULL,
 "state"                   varchar(50) NULL,
 zip                     varchar(10) NULL,
 phone_number            smallint NULL,
 profile_img_url         varchar(200) NULL,
 employer_enabled        boolean NOT NULL,
 employer_id             int NULL,
 resume_pdf_url          varchar(200) NULL,
 resume_created_at       timestamptz NULL,
 cover_letter_pdf_url    varchar(200) NULL,
 cover_letter_created_at timestamptz NULL,
 CONSTRAINT fk_employer_users FOREIGN KEY ( employer_id ) REFERENCES Employers ( id )
);

CREATE INDEX fk_employer_users_index ON Users
(
 employer_id
);

CREATE TYPE experience_levels AS ENUM ('Entry', 'Mid', 'Senior', 'Executive', '');
CREATE TYPE employment_types AS ENUM ('Full-Time', 'Part-Time', 'Temporary', 'Internship', '');
CREATE TYPE work_site_types AS ENUM ('Remote', 'On-site', 'Mixed', '');

CREATE TABLE Job_Posts
(
 id                                    int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY UNIQUE,
 job_api_id       varchar(200) NOT NULL UNIQUE,
 url              varchar(200) NOT NULL,
 employer_id      int NOT NULL,
 "street address" varchar(100) NULL,
 city             varchar(50) NULL,
 "state"          varchar(50) NULL,
 zip              varchar(10) NULL,
 phone_number     smallint NULL,
 description      text NOT NULL,
 title            varchar(100) NOT NULL,
 date_created     timestamptz NOT NULL,
 "open"           boolean NOT NULL,
 salary           int NULL,
 experience_level experience_levels NULL,
 employment_type  employment_types NULL,
 work_site        work_site_types NULL,
 CONSTRAINT fk_employer_job_post FOREIGN KEY ( employer_id ) REFERENCES Employers ( id )
);

CREATE INDEX job_api_id_index ON Job_Posts
(
 job_api_id
);

CREATE INDEX fk_employer_job_post_index ON Job_Posts
(
 employer_id
);

CREATE TYPE interest_levels AS ENUM ('Extremely Interested', 'Very Interested', 'Interested');

CREATE TABLE Saved_Jobs
(
 id                                    int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY UNIQUE,
 interest_level                interest_levels NOT NULL,
 job_post_id    int NOT NULL,
 user_id        int NOT NULL,
 CONSTRAINT fk_user_saved FOREIGN KEY ( user_id ) REFERENCES Users ( id ),
 CONSTRAINT fk_job_post_saved FOREIGN KEY ( job_post_id ) REFERENCES Job_Posts ( id )
);

CREATE INDEX fk_user_saved_index ON Saved_Jobs
(
 user_id
);

CREATE INDEX fk_job_post_saved_index ON Saved_Jobs
(
 job_post_id
);


CREATE TABLE Applications
(
 id                                    int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY UNIQUE,
 employer_id             int NOT NULL,
 job_post_id             int NOT NULL,
 user_id                 int NOT NULL,
 date_applied            timestamptz NOT NULL,
 resume_attach_url       varchar(200) NOT NULL,
 cover_letter_attach_url varchar(200) NOT NULL,
 CONSTRAINT fk_employer_app FOREIGN KEY ( employer_id ) REFERENCES Employers ( id ),
 CONSTRAINT fk_user_app FOREIGN KEY ( user_id ) REFERENCES Users ( id ),
 CONSTRAINT fk_job_post_app FOREIGN KEY ( job_post_id ) REFERENCES Job_Posts ( id )
);

CREATE INDEX fk_employer_app_index ON Applications
(
 employer_id
);

CREATE INDEX fk_user_app_index ON Applications
(
 user_id
);

CREATE INDEX fk_job_post_app_index ON Applications
(
 job_post_id
);

--Create new tables and load matching data

--If neededing to load data from csv

-- \COPY classes FROM '/path/users.csv' WITH (FORMAT csv, HEADER TRUE);

-- WITH specifies options, Format CSV, HEADER skips the first line on input