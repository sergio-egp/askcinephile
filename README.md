# AskCinephile

AskCinephile! your cinema expert is here!

## How to Run Application

### Run database and rest_api container

`docker-compose up -d`

### Run the imdb data ingest process

`docker compose --profile imdb_ingest up`

### Start the cli_client

`docker compose run cli_client`
