CREATE TABLE games (
    id SERIAL PRIMARY KEY,
    players TEXT,
    finished BOOLEAN DEFAULT false,
    creadted_at TIMESTAMP default CURRENT_TIMESTAMP,
    updated_at TIMESTAMP default CURRENT_TIMESTAMP
);


INSERT INTO games (players) VALUES ('Miguel vs Pablo');
INSERT INTO games (players, finished) VALUES ('Kim vs Jade', true);

CREATE TABLE messages (
   id SERIAL PRIMARY KEY,
   message TEXT,
   nickname TEXT,
   creadted_at TIMESTAMP default CURRENT_TIMESTAMP
);

INSERT INTO messages (message, nickname) VALUES ('Bonjour à tous', 'ROOT');
