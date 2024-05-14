## Running the Development Environment

Use the default docker-compose.yml:

```sh
docker-compose up --build --force-recreate
```

## Running the Production Environment

Use the production-specific docker-compose.prod.yml:

```sh
docker-compose -f compose.prod.yml up --build --force-recreate
```
