# Deluge Client Configuration Instructions and Guidelines

## Deluge Client Installation

### For Mac OSX
To download the deluge client please run the following command:

``` wget --no-check-certificate https://download.deluge-torrent.org/mac_osx/deluge-1.3.15.1-macosx-x64.dmg```


Be sure to edit docker-compose.yml file volumes to absolute file path of your systems local torrentql/packages/deluge/docker-compose.yml pathfile.

```volumes:```                                                                           ```- "/Users/mitchell/Downloads:/root/Downloads"```



