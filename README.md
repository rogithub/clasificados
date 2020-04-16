# clasificados
clasificados
# run Dockerfile
* $ docker build -t clasificados .
* $ docker run -it --rm -p 5000:80 --name clasificados_instance clasificados

# run compose
* 1.  $ docker-compose build
* 2.  $ docker-compose up -d

# attach to running image
* $ docker exec -it clasificados_instance bash

# pull db from DEV env
## en dev server
* $ docker exec postgres pg_dump -U postgres clasificados > clasificados_bkup

## en prod server
* $ cat clasificados_bkup | docker exec -i postgres_clasificados psql -U postgres clasificados

