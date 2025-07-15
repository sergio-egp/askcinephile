# AskCinephile

## Requirements

- install mysql

`sudo apt install mysql-client-core-8.0`

## How to Run Application

### run database container

`cd askcinephile/database/ ; docker-composeup -d`

### running the imdb data ingest process

`cd askcinephile/imdb_ingest/ ; npm install ; npm run start`

### running rest_api_server

`cd askcinephile/rest_api_server/ ; npm install ; npm run start`

### running cli_client

`cd askcinephile/cli_client/ ; npm install ; npm run start`
