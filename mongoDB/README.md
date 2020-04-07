1. Verify you can access mongo shell by running the following command:
```docker exec -it mongodb_mongo_1 mongo --username root --password example```

Create docker network
```docker network create -d bridge mongo-cluster```

`Starting in MongoDB 3.6, MongoDB binaries, mongod and mongos, bind to localhost by default.`
sudo docker run --name mongo0 -d --network=mongo-cluster mongo --replSet "book" --port 27011
sudo docker run --name mongo1 -d --network=mongo-cluster mongo --replSet "book" --port 27012
sudo docker run --name mongo2 -d --network=mongo-cluster mongo --replSet "book" --port 27013

sudo docker exec -it mongo0 mongo --port 27011
sudo docker exec -it mongo1 mongo --port 27012
sudo docker exec -it mongo2 mongo --port 27013

rs.initiate(
  {
    _id : "book",
     members: [
      { _id :1, host: "localhost:27011" },
      { _id :2, host: "localhost:27012" },
      { _id :3, host: "localhost:27013" },
     ]
  }
);
 db.echo.insert({ say : 'HELLO!' })