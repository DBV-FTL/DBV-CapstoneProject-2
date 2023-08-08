\echo 'Delete and recreate interzine db?'
\prompt 'Return yes or control-C to cancel > ' foo

DROP DATABASE de2nsksj9jjcbk;
CREATE DATABASE de2nsksj9jjcbk;
\connect de2nsksj9jjcbk

\i interzine-schema.sql

-- \echo 'Delete and recreate interzine db?'
-- \prompt 'Return yes or control-C to cancel > ' foo

-- DROP DATABASE interzine_test;
-- CREATE DATABASE interzine_test;
-- \connect interzine_test

-- \i interzine-schema_test.sql

