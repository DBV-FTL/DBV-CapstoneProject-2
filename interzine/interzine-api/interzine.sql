\echo 'Delete and recreate interzine db?'
\prompt 'Return yes or control-C to cancel > ' foo

DROP DATABASE interzine;
CREATE DATABASE interzine;
\connect interzine

\i interzine-schema.sql