Docker image https://github.com/bitnami/bitnami-docker-couchdb

Info db  ```curl --user admin:couchdb http://localhost:5984/```

Temporary views are dropped entirely from v2

curl --user admin:couchdb http://localhost:5984/**<database_name>**/_design/**<design_doc>**/_view/**<view_name>**

<view_name> - Field "index name" in Admin panel
<design_doc> - Field "_design/newDesignDoc" in Admin panel
