import numpy as np

import sqlalchemy
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func
from flask_cors import CORS, cross_origin
from flask import Flask, jsonify
from dotenv import load_dotenv
import os

#Database Setup

load_dotenv()
protocol = 'postgresql'
username = os.environ.get('db_UserName')
password = os.environ.get('db_Password')
host = 'localhost'
port = 5432
database_name = 'project_3'
rds_connection_string = f'{protocol}://{username}:{password}@{host}:{port}/{database_name}'
engine = create_engine(rds_connection_string)


# reflect an existing database into a new model
Base = automap_base()
# reflect the tables
Base.prepare(engine, reflect=True)

Base.classes.keys()

# Save reference to the table
Goals = Base.classes.goals
Tournament_standings = Base.classes.tournament_standings


# 2. Create an app
app = Flask(__name__)
cors = CORS(app)

@app.route("/api/v1.0/goals")
def goals():
    session = Session(engine)
    results = session.query(Goals).all()
    session.close()
    goals = []
    for x in results:
        goals_dict = {}
        goals_dict["key_id"] = x.key_id
        goals_dict["tournament_id"] = x.tournament_id
        goals_dict["match_id"] = x.match_id
        goals_dict["tournament_name"] = x.tournament_name
        goals_dict["match_name"] = x.match_name
        goals_dict["match_date"] = x.match_date
        goals_dict["team_id"] = x.team_id
        goals_dict["team_name"] = x.team_name
        goals_dict["team_code "] = x.team_code
        goals_dict["home_team"] = x.home_team
        goals_dict["away_team"] = x.away_team
        goals_dict["player_id"] = x.player_id
        goals_dict["family_name"] = x.family_name
        goals_dict["given_name"] = x.given_name
        goals_dict["player_team_name"] = x.player_team_name
        goals_dict["minute_regulation"] = x.minute_regulation
        goals_dict["match_period"] = x.match_period


        goals.append(goals_dict)

    return jsonify(goals)

@app.route("/api/v1.0/standings")
def standings():
    session = Session(engine)
    results_standings = session.query(Tournament_standings).all()
    session.close()
    standings = []
    for x in results_standings:
        standings_dict = {}
        standings_dict["key_id"] = x.key_id
        standings_dict["tournament_id"] = x.tournament_id
        standings_dict["tournament_name"] = x.tournament_name
        standings_dict["position"] = x.position
        standings_dict["team_code"] = x.team_code
        standings_dict["team_id"] = x.team_id
        standings_dict["team_name"] = x.team_name
        
        standings.append(standings_dict)

    return jsonify(standings)

# 4. Define main behaviour
if __name__ == "__main__":
    app.run(debug=True)

