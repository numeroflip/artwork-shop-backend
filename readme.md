## Artwork shop backend

A dockerized KOA REST API for listing and buying artworks. ( Artworks from api.artic.edu )
It has JSON WEB Token authentication ( No user creation, only the seeded users can be used )


## Running the Development Environment

Use the default docker-compose.yml:

```sh
docker-compose compose build
docker-compose up
```

## Running the Production Environment

Use the production-specific docker-compose.prod.yml:

```sh
docker-compose -f docker-compose.prod.yml compose build
docker-compose -f docker-compose.prod.yml up
```

## First run

On the initial run you need to setup the database. For that, enter the server container:

```sh
docker-compose exec server sh
```

Then, setup the empty database:

```sh
npm run migrate
```

Seed the database

```sh
npm run seed
```

Exit from the container

```sh
exit
```
