CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    first_name  VARCHAR(255) NOT NULL,
    last_name   VARCHAR(255) NOT NULL,
    username    VARCHAR(255) NOT NULL,
    email       VARCHAR(255) NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
    password    VARCHAR(255) NOT NULL);

CREATE TABLE service_providers (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    cuisine     VARCHAR(255) NOT NULL,
    location    VARCHAR(1024) NOT NULL,
    email       VARCHAR(255) NOT NULL UNIQUE CHECK (position('@' IN email) > 1),
    password    VARCHAR(255) NOT NULL,
    share_location BOOLEAN,
    profile_picture VARCHAR(255) NOT NULL);

CREATE TABLE menu_item (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    image_url   VARCHAR(255) NOT NULL,
    cost        VARCHAR(255) NOT NULL,
    rating      INTEGER NOT NULL,
    service_provider_id INTEGER NOT NULL);
