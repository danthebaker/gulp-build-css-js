#!/usr/bin/env bash

set -e
# this is the script vagrant will use to provision the box

# remove chef and puppet
apt-get -y autoremove chef puppet

# install Docker
curl https://get.docker.com/ | sh
usermod -aG docker vagrant

curl -L https://github.com/docker/compose/releases/download/1.7.1/docker-compose-`uname -s`-`uname -m` > /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose