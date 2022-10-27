# FIFA World Cup Analysis

## Project Title - FIFA World Cup 2022

In this project we look into the history of FIFA World cup to gather and store the data to study which teams won the most FIFA World Cup title and the goals scored.

## Sources of Data


The data is sourced from ("Joshua C. Fjelstul, Ph.D."), a notice that the database is copyrighted ("© 2022 Joshua C. Fjelstul, Ph.D."), a link to the CC-BY-SA 4.0 license (https://creativecommons.org/licenses/by-sa/4.0/legalcode), and a link to this repository (https://www.github.com/jfjelstul/worldcup)
|No|Source|Link|File|
|-|-|-|-|
|1|Git Hub|https://github.com/jfjelstul/worldcup/tree/master/data-csv|goals.csv|
|2|Git Hub|https://github.com/jfjelstul/worldcup/tree/master/data-csv|tournament_standings.csv|
|3|The Sporting News|https://www.sportingnews.com/uk/soccer/news/fifa-world-cup-which-teams-have-qualified/86nbyru9dkh41ii7s800gjwav|



### Modifications
The csv file goals.csv was modified to the requirements of the project and the following columns were dropped:
'match_id','stage_name','group_name','shirt_number','player_team_id','player_team_code','minute_label','minute_stoppage','own_goal','penalty'

The csv file tournament_standings.csv was NOT modified as it met the requirements of the project.

## Output Data out of this analysis

1. Previous world cup winners and the number of goals scored

2. FIFA World Cup 2022 Teams

## Contents of the Folders
1.  bootswatch_cerulean: Javascript libraries minified files
2.  css: Style sheets
3.  Data: raw csvs and data cleaning pandas notebook
4.  fifa_Analysis_api: flask api
5.  Images: Images related to readme files
6.  Maps: Map visualisation and its logic
7.  static: js files
8.  templates: templates
9.  table_creation_scripts: scripts to create tables
10. Project_3_Presentation: Presentation file
11. Project_3_Report: Project Report

## Execution of the code:
1.  Create .env files with the content:
    db_UserName= <username>
    db_Password= <userpassword>
2.  Create tables using 'table_creation_scripts'
3.  Execute the 'data_cleaning' jupyter notebook from 'Data' folder
4.  Install flask-cors using 'pip install -U flask-cors'
4.  Execute the 'app.py' from 'fifa_Analysis_api' folder
5.  Execute 'index.html' from 'templates' folder to run the website.


## Team Members  	

Carlos Soda,
Bharat Guturi,
Balvinder Rajbans

## Dataset Tables - Raw & Modified

#### goals.csv - Raw

![chart](https://github.com/brajbans/Project_3/blob/main/Images/goals%20csv%20.png)

#### new_goals.csv - Modified

![chart](https://github.com/brajbans/Project_3/blob/main/Images/new%20goals%20csv%20.png)

#### tournament_standings - Raw

![chart](https://github.com/brajbans/Project_3/blob/main/Images/tournament_standings%20csv.png)

## Applications used:

Python - Libraries: Pandas, SQLAlchemy

Jupyter Notebook

Database - PGAdmin (PostgresSQL)

Java - Libraries: d3, plotly, leaflet, chart

Installation of Flask Cors is required - Use pip install -U flask-cors 

## Process:

### Extract :

Open python file and Import csv files into Pandas 

### Transform:

Transform tables to formal specification

##### Data Modelling - Tables :

Create the tables using www.quickdatabase.com 

### Load:

Connect to postgres SQL database -> load data.

Formal specification to be created that defines the tables format can be imported into postgres SQL database.

#### new goals table
![chart](https://github.com/brajbans/Project_3/blob/main/Images/new%20goals%20table.png)

![chart](https://github.com/brajbans/Project_3/blob/main/Images/tournament_standings%20table.png)

## Visualisations:
![chart](https://github.com/brajbans/Project_3/blob/main/Images/World%20Cup%20Count.png)

![chart](https://github.com/brajbans/Project_3/blob/main/Images/Goals%20Scored.png)

![chart](https://github.com/brajbans/Project_3/blob/main/Images/Average%20goals%20per%20match.png)

![chart](https://github.com/brajbans/Project_3/blob/main/Images/Goals%20per%20year%20for%20each%20country.png)

![chart](https://github.com/brajbans/Project_3/blob/main/Images/map.png)
    
#### Responsive visualisations
![chart](https://github.com/brajbans/Project_3/blob/main/Images/resposive%201.png)
    
![chart](https://github.com/brajbans/Project_3/blob/main/Images/resposive%202.png)
    
![chart](https://github.com/brajbans/Project_3/blob/main/Images/responsive%203.png)


## Project Report:
To access the detailed process of Extract, Transform,Load and visualisations follow the steps shown in the Project Report.

