CREATE TABLE goals(
  key_id INTEGER,
  goal_id TEXT NOT NULL,
  tournament_id TEXT NOT NULL,
  tournament_name TEXT NOT NULL,
  match_name TEXT NOT NULL,
  match_date TEXT NOT NULL,
  team_id TEXT NOT NULL,
  team_name TEXT NOT NULL,
  team_code TEXT NOT NULL,
  home_team INTEGER,
  away_team INTEGER,
  player_id TEXT NOT NULL,
  family_name TEXT NOT NULL,
  given_name TEXT NOT NULL,
  player_team_name TEXT NOT NULL,
  minute_regulation INTEGER,
  match_period TEXT,
  match_id VARCHAR,
  PRIMARY KEY (key_id)
);

CREATE TABLE tournament_standings(
  key_id INTEGER,
  tournament_id TEXT NOT NULL,
  tournament_name TEXT NOT NULL,
  position INTEGER,
  team_id TEXT NOT NULL,
  team_name TEXT NOT NULL,
  team_code TEXT NOT NULL,
  PRIMARY KEY (key_id)
);