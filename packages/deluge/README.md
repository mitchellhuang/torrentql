# Deluge

### Deluge docker-compose.yml configuration 

You must edit the docker-compose.yml file volumes path to represent your current system user

```
version: '3.3'
services:
  deluge:
    image: "linuxserver/deluge"
    restart: "always"
    environment:
      - PGID=0
      - PUID=0
    ports:
      - "8112:8112"
      - "58846:58846"
      - "58946:58946"
      - "58946:58946/udp"
    volumes:
      - "/Users/<YOUR USER HERE>/Downloads:/root/Downloads"
```

If you do not know how to determine your system enter the following commmand

```
whoami
```

Substitute the value returned by the above command into your volumes pathfile

## Deploying deluge client

To launch the deleuge client using docker-compose.yml file run the following command

```
docker-compose up -d
```

Or to keep the process open and not run in detached mode enter the following

```
docker-compose up
```
