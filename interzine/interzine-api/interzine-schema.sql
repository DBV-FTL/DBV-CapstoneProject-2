CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    first_name  VARCHAR(255) NOT NULL,
    last_name   VARCHAR(255) NOT NULL,
    username    VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
    password    VARCHAR(255) NOT NULL,
    zip_code    INTEGER      CHECK (zip_code between 99 and 99999));

CREATE TABLE service_providers (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    cuisine     VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
    password    VARCHAR(255) NOT NULL,
    share_location BOOLEAN,
    profile_picture VARCHAR(255) NOT NULL,
    zip_code     INTEGER    NOT NULL CHECK (zip_code between 99 and 99999));

CREATE TABLE menu_items (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    image_url   VARCHAR(255) NOT NULL,
    cost        DECIMAL(10,2) NOT NULL,
    rating      DECIMAL(3,2) NOT NULL,
    service_provider_id INTEGER NOT NULL);
