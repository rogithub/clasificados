# clasificados
clasificados
# run Dockerfile
- $ docker build -t clasificados .
- $ docker run -it --rm -p 5000:80 --name clasificados_instance clasificados

# run compose
- 1.  $ docker-compose build
- 2.  $ docker-compose up -d

# attach to running image
- $ docker exec -it clasificados_instance bash
