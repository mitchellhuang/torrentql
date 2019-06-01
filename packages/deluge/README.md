# Deluge Client Configuration Instructions and Guidelines

## Deluge Client Installation

### For Mac OSX
To download the deluge client please run the following command:

``` wget --no-check-certificate https://download.deluge-torrent.org/mac_osx/deluge-1.3.15.1-macosx-x64.dmg```


Be sure to edit docker-compose.yml file volumes to absolute file path of your systems local torrentql/packages/deluge/docker-compose.yml pathfile.

```version: '3.3'
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
      - "/Users/mitchell/Downloads:/root/Downloads"    #EDIT THIS PATHFILE TO LOCATION OF DELUGE CLIENT
```



