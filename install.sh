#!/usr/bin/env sh
# ffstats
# Copyright (c) 2015 Andreas Rutz. Published under MIT license.

WWWROOT=/www/ffstats

if [ $(id -u) != "0" ]; then
    echo Script must be run as root 1>&2
    exit 1
fi

echo "Creating $WWWROOT"
mkdir -p $WWWROOT

echo "Copying dist/* files"
cp -r ./dist/* $WWWROOT

echo "Setting rights"
chmod -R 644 $WWWROOT
chmod -R 755 $WWWROOT/cgi-bin

echo "Setting root path of web server"
uci batch <<EOT
    set uhttpd.main.max_requests=5
    set uhttpd.main.home=$WWWROOT
    commit uhttpd
EOT

echo "Restarting uhttpd"
/etc/init.d/uhttpd restart

echo "Installation finished"