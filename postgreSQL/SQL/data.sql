INSERT INTO countries (country_code, country_name)
VALUES
('ua', 'Ukraine'),
('us', 'United States'),
('mx', 'Mexico'),
('au', 'Australia'),
('gb', 'United Kingdom'),
('de', 'Germany'),
('ll', 'Loompaland');

INSERT INTO cities VALUES ('Ukraine', '45755', 'ua');

INSERT INTO venues (name, postal_code, country_code) VALUES ('Crystal Ballroom', '45755', 'ua');
INSERT INTO venues (name, postal_code, country_code) VALUES ('Voodoo Donuts', '45755', 'ua') RETURNING venue_id;

INSERT INTO events (title, starts, ends, venue_id)
 VALUES
   ('LARP Club', '2012-02-15 17:30:00', '2012-02-15 19:30:00', 2),
   ('April Fools Day', '2012-04-01 00:00:00', '2012-04-01 23:59:00', NULL),
   ('Christmas Day', '2012-12-25 00:00:00', '2012-12-25 23:59:00', NULL);

INSERT INTO countries (country_code, country_name) VALUES ('is', 'Iceland');

INSERT INTO cities (name, postal_code, country_code)
VALUES
  ('Reykjavík', '12345', 'is'),
  ('Kópavogur', '54321', 'is');

 INSERT INTO venues (name, street_address, postal_code, country_code)
 VALUES
   ('Best practice AWS and Devops', 'Dnipro 32', '12345', 'is'),
   ('Best practice DynamoDB', 'St.Gagarina 31', '54321', 'is');

 INSERT INTO events (title, starts, ends, venue_id)
 VALUES
   ('Devops', '2017-02-15 17:30:00', '2017-02-15 20:00:00', (SELECT venue_id FROM venues WHERE name = 'Best practice DynamoDB')),
   ('Node.js meetup', '2017-02-21 17:30:00', '2017-02-21 20:00:00', );
