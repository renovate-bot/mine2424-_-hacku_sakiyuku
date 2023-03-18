#!/bin/sh

cd "$(dirname "$0")/../frontend" || exit
firebase emulators:start
