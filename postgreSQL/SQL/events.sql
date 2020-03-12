 CREATE TABLE events (
   event_id SERIAL PRIMARY KEY,
   title    VARCHAR(255),
   starts   TIMESTAMP,
   ends     TIMESTAMP,
   venue_id INT,
   FOREIGN KEY (venue_id) REFERENCES venues (venue_id)
 );

CREATE INDEX events_starts ON events USING btree(starts);
ALTER TABLE events ADD colors text ARRAY;
