# clasificados
clasificados
# Docker
$ docker build -t clasificados .
$ docker run -it --rm -p 5000:80 --name clasificados_instance clasificados
$ docker exec -it clasificados_instance bash

# docker-compose.yml
$ docker-compose up -d


# complete process
1.  $ docker build -t clasificados .
2.  $ docker-compose up -d
