## Connect to server
###Step 1: Create a network
`$ sudo docker network create -d bridge app-tier`
###Step 2: Launch the Redis server instance
`$ sudo docker run -d --name redis-server -e ALLOW_EMPTY_PASSWORD=yes --network app-tier bitnami/redis:latest`
###Step 3: Launch your Redis client instance
`$ sudo docker run -it --rm --network app-tier bitnami/redis:latest redis-cli -h redis-server`